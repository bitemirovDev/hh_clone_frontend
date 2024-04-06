import classes from "@/app/style/components/inputWithSelect.module.css";

export default function InputWithSelect({
  label,
  size,
  setSalary,
  setSalaryType,
  ...props
}) {
  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <div className={classes.container}>
        <input
          className="input"
          {...props}
          onChange={(e) => setSalary(e.target.value)}
        ></input>
        <select
          className="input"
          {...props}
          onChange={(e) => setSalaryType(e.target.value)}
        >
          <option value={"KZT"}>KZT</option>
          <option value={"RUB"}>RUB</option>
          <option value={"USD"}>USD</option>
          <option value={"EUR"}>EUR</option>
        </select>
      </div>
    </fieldset>
  );
}
