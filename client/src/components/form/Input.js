const Input = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label fw-bold">
        {props.title}
      </label>
      <input
        type={props.type}
        className="form-control"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
