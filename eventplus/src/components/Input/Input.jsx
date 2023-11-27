const Input = (props) => {
  return (
    <div>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        onChange={(props) => {props.fnAltera(props.target.value)}}
      />
      <span>{props.valor}</span>    
    </div>
  );
};

export default Input;
