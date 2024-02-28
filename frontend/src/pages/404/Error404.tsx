import React from "react";
import { DisplayFlex } from "../../styles";

const Error404 = () => {
  return (
    <DisplayFlex
      height="100%"
      direction="column"
      justifyContent="center"
      style={{ alignItems: "center" }}
    >
      <h1>Erro 404</h1>
      <p>Página não encontrada</p>
    </DisplayFlex>
  );
};

export default Error404;
