import classes from "@/app/style/components/dateSelect.module.css";
import { useState, useEffect } from "react";
import { months } from "@/app/constants/constants";

export default function DateSelect({ label, size, onChange, value }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState("");

  useEffect(() => {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    onChange(date);
  }, [day, month, year]);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setDay(date.getDate());
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [value]);

  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <div className={classes.inputs_container}>
        <input
          className={classes.input}
          placeholder="День"
          onChange={(e) => setDay(e.target.value)}
          value={day}
          maxLength={2}
        ></input>
        <select
          className={classes.input}
          onChange={(e) => setMonth(e.target.value)}
          value={month}
        >
          {months.map((month) => (
            <option key={month} value={months.indexOf(month)}>
              {month}
            </option>
          ))}
        </select>
        <input
          className={classes.input}
          placeholder="Год"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          maxLength={4}
        ></input>
      </div>
    </fieldset>
  );
}
