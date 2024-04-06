import { useState } from "react";

function PhoneNumberInput({ label, size, ...props }) {
  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <input className="input" {...props} onChange={props.onChange} />
    </fieldset>
  );
}

export default PhoneNumberInput;
