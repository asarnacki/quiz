import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { createTheme } from "@mui/system";
// import { ThemeProvider } from "@emotion/react";
// import { CssBaseline } from "@mui/material";
import { ContextProvider } from "./hooks/useStateContext";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      {/* <ThemeProvider theme={darkTheme}> */}
      {/* <CssBaseline /> */}
      <App />
      {/* </ThemeProvider> */}
    </ContextProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
reportWebVitals();
