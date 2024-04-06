export default function Fieldset({ label, size, ...props }) {
  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      {props.type === "text" && (
        <input className="input" {...props} onChange={props.onChange}></input>
      )}
      {props.type === "select" && (
        <select className="input" {...props} onChange={props.onChange}>
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </fieldset>
  );
}
