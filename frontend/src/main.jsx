import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./utils/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>
);
