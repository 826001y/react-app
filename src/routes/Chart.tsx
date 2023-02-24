import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const theme = useRecoilValue(themeAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <>
      <div>
        {isLoading ? (
          "로딩 중..."
        ) : (
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => price.close) as number[],
              },
            ]}
            options={{
              theme: {
                mode: theme ? "dark" : "light",
              },
              chart: {
                height: 500,
                width: 500,
                background: "transparent",
                toolbar: {
                  show: false,
                },
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                categories: data?.map((price) => +price.time_close * 1000),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#9c88ff"], stops: [0, 100] },
              },
              colors: ["#9c88ff"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(3)}`,
                },
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
            }}
          />
        )}
      </div>
    </>
  );
}
export default Chart;
