// images & icons
import TrashIcon from "@/app/images/trash_icon.svg";

// components
import Fieldset from "../fieldset";

// react\
import Image from "next/image";
import { useState } from "react";

export default function AutoCompleteSelectCity({
  label,
  size,
  cities,
  onSelect,
  ...props
}) {
  const [value, setValue] = useState("");
  const [filteredCitites, setfilteredCitites] = useState([]);

  const onClick = (city) => {
    onSelect(city);
    setValue(city.name);
    setfilteredCitites([]);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      setfilteredCitites([]);
    } else {
      setfilteredCitites([
        ...cities.filter((city) => city.name.includes(e.target.value)),
      ]);
    }
  };

  const reset = () => {
    onSelect(null);
    setValue("");
  };

  return (
    <div className={"auto_complete_select " + size}>
      <Fieldset
        label={label}
        size={size}
        {...props}
        onChange={onChange}
        value={value}
      />

      {value.length > 0 && (
        <button className="reset_btn" onClick={reset}>
          <Image src={TrashIcon} alt="trash-icon" />
        </button>
      )}

      {filteredCitites.length > 0 && (
        <div className="dropdown">
          {filteredCitites.map((city) => (
            <a key={city.id} onClick={() => onClick(city)}>
              {city.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
