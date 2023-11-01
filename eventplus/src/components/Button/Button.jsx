import React from "react";

const Button = (props) => {
  return (
    <div>
      <button type={props.type}>{props.innerText}</button>
    </div>
  );
};

export default Button;
