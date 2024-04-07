// images & icons
import TrashIcon from "@/app/images/trash_icon.svg";

// components
import Fieldset from "../fieldset";

// react\
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AutoCompleteSelectCity({
  label,
  size,
  cities,
  onSelect,
  selected,
  ...props
}) {
  const [value, setValue] = useState({ name: "" });
  const [filteredCitites, setfilteredCitites] = useState([]);

  const onClick = (city) => {
    onSelect(city);
    setValue(city);
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

  useEffect(() => {
    cities.map((city) => {
      if (city.id === selected) {
        setValue(city);
      }
    });
  }, [selected, cities]);

  const reset = () => {
    onSelect(null);
    setValue({ name: "" });
  };

  return (
    <div className={"auto_complete_select " + size}>
      <Fieldset
        label={label}
        size={size}
        {...props}
        onChange={onChange}
        value={value.name}
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
