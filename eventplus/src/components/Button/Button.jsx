import React from "react";

const Button = ({
  id,
  name,
  type,
  additionalClass = "",
  textButton,
  manipulationFunction,
}) => {
  return (
    <div>
      <button 
      id={id}
      name={name}
      type={type}
      className={additionalClass}
      onClick={manipulationFunction}
      >{textButton}</button>
    </div>
  );
};

export default Button;
