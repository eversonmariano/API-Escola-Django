import React from "react";
import { DisplayFlex } from "./styles";
import TopBar from "./components/TopBar";
import { RouterApp } from "./router";

function App() {
  return (
    <DisplayFlex direction="column" height="100vh" width="100%">
      <TopBar />
      <RouterApp />
    </DisplayFlex>
  );
}

export default App;
