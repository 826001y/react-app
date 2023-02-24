import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface IProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px 0px;
  color: ${(props) => props.theme.accentColor};
  font-size: 15px;
`;

const PriceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  span:first-child {
    font-size: 12px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.textColor};
  }
`;

function Price({ coinId }: IProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <PriceContainer>
      <PriceDetails>
        <span>1시간 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_1h}%</span>
      </PriceDetails>
      <br />
      <PriceDetails>
        <span>24시간 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_24h}%</span>
      </PriceDetails>
      <br />
      <PriceDetails>
        <span>30일 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_30d}%</span>
      </PriceDetails>
      <br />
      <PriceDetails>
        <span>1년 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_1y}%</span>
      </PriceDetails>
    </PriceContainer>
  );
}

export default Price;
