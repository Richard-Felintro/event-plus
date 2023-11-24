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
  id,
  name,
  value,
  required,
  placeholder,
  dataSource = [],
  additionalClass,
  manipulationFunction,
}) => {
  return (
    <select
      className={`input-component ${additionalClass}`}
      name={name}
      id={id}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={manipulationFunction}
    >
      <option value="">{placeholder}</option>
      {dataSource.map((e) => {
        return <option key={e.idTipoEvento} value={e.idTipoEvento}>{e.titulo}</option>;
      })}
    </select>
  );
};
