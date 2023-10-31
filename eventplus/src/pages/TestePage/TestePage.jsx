import React from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const TestePage = () => {
  return (
    <>
      <h1>Página de Testes</h1>
      <h2>Calculadora</h2>
      <form>
        <Input />
        <Input />

        <Button />
      </form>
    </>
  );
};

export default TestePage;
