// images & icons
import TrashIcon from "@/app/images/trash_icon.svg";

// components
import Fieldset from "../fieldset";

// react\
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AutoCompleteSelectCountries({
  label,
  size,
  countries,
  selected,
  onSelect,
  ...props
}) {
  const [value, setValue] = useState({ name: "" });
  const [filteredCountries, setfilteredCountries] = useState([]);

  const onClick = (country) => {
    onSelect(country);
    setValue(country);
    setfilteredCountries([]);
  };

  const onChange = (e) => {
    if (e.target.value === "") {
      setfilteredCountries([]);
    } else {
      setfilteredCountries([
        ...countries.filter((country) => country.name.includes(e.target.value)),
      ]);
    }
  };

  const reset = () => {
    onSelect(null);
    setValue({ name: "" });
  };

  const onInputBlur = (e) => {
    e.target.value = "";
  };

  useEffect(() => {
    countries.map((country) => {
      if (country.id === selected) {
        setValue(country);
      }
    });
  }, [selected, countries]);

  return (
    <div
      className={"auto_complete_select " + size}
      style={
        value && value.name.length > 0
          ? { marginBottom: "50px" }
          : { marginBottom: "0" }
      }
    >
      <Fieldset
        label={label}
        size={size}
        {...props}
        onChange={onChange}
        onBlur={onInputBlur}
      />

      {value && value.name.length > 0 && (
        <div className="tag">
          <a>{value.name}</a>
          <button onClick={reset}>
            <Image src={TrashIcon} alt="trash_icon"></Image>
          </button>
        </div>
      )}

      {filteredCountries.length > 0 && (
        <div className="dropdown">
          {filteredCountries.map((country) => (
            <a key={country.id} onClick={() => onClick(country)}>
              {country.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
