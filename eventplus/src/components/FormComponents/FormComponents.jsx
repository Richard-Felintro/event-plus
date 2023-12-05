import React from "react";
import "./FormComponents.css";

export const Input = ({
  type,
  id,
  value,
  required,
  AdditionalClass = "",
  name,
  placeholder,
  manipulationFunction,
}) => {
  //teste
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      required={required}
      className={`input-component ${AdditionalClass}`}
      placeholder={placeholder}
      onChange={manipulationFunction}
      autoComplete="off"
    />
  );
};

export const Button = ({
  textButton,
  id,
  name,
  type,
  additionalClass = "",
  manipulationFunction,
}) => {
  return (
    <button
      type={type}
      name={name}
      id={id}
      className={`button-component ${additionalClass}`}
      onClick={manipulationFunction}
    >
      {textButton}
    </button>
  );
};

export const Select = ({
  dados = [],
  id,
  name,
  required,
  additionalClass = "",
  manipulationFunction,
  value,
  key,
}) => {
  console.log(dados[key]);
  console.log(dados[value]);

  return (
    <select
      id={id}
      name={name}
      required={required}
      className={`input-component ${additionalClass}`}
      onChange={manipulationFunction}
    >
      <option value="">Selecione</option>
      {dados.map((dado) => {
        return (
          <option key={dado[key]} value={dado[key]}>
            {dado[value]}
          </option>
        );
      })}
    </select>
  );
};
