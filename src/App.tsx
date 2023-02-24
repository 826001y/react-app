import Router from "./Router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { themeAtom } from "./atoms";
import styled from "styled-components";
import { ReactComponent as DarkImg } from "./img/darkImg.svg";
import { ReactComponent as LightImg } from "./img/lightImg.svg";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const ThemeBtn = styled.button`
  position: fixed;
  bottom: 0px;
  right: 20px;
  width: 50px;
  height: 50px;
  margin: 20px 5px;
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 0.2rem 0.5rem;
  background-color: ${(props) => props.theme.cardBgColor};
  cursor: pointer;
  img {
    width: 75%;
  }
  border: none;
`;

function App() {
  const theme = useRecoilValue(themeAtom);
  const setTheme = useSetRecoilState(themeAtom);
  const toggleTheme = () => setTheme((prev) => !prev);
  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <ThemeBtn onClick={toggleTheme}>
          {theme ? <LightImg /> : <DarkImg />}
        </ThemeBtn>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
