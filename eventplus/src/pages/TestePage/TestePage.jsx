import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const TestePage = () => {
  const [total, setTotal] = useState();
  const [n1, setN1] = useState();
  const [n2, setN2] = useState();

  function handleCalcular(e) {
    setTotal(parseFloat(n1) + parseFloat(n2));
  }
  
  return (
    <>
      <h1>Página de Testes</h1>
      <h2>Calculadora</h2>
      <form onSubmit={handleCalcular}>
        <Input
          type="number"
          id="numero1"
          name="numero1"
          placeholder="Primeiro número"
          valor={n1}
          fnAltera={setN1}
        />
        <Input
          type="number"
          id="numero2"
          name="numero2"
          placeholder="Segundo número"
          valor={n2}
          fnAltera={setN2}
        />

        <Button type="button" innerText="Somar" />
        <span>
          Resultado: <strong>{total}</strong>
        </span>
      </form>
    </>
  );
};

export default TestePage;
