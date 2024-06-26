// images & icons
import TrashIcon from "@/app/images/trash_icon.svg";

// components
import Fieldset from "../fieldset";

// react\
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AutoCompleteSelectSkills({
  label,
  size,
  type,
  skills,
  selected,
  onSelect,
  classForTagsContainer,
  classForDropdown,
}) {
  const [values, setValues] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);

  const onClick = (skill) => {
    setValues([...values, skill]);
  };

  const onChange = (e) => {
    if (e.target.value === "") {
      setFilteredSkills([]);
    } else {
      const filter = skills.filter((skill) =>
        skill.name.includes(e.target.value)
      );

      let fs = [];
      filter.map((item) => {
        let exist = false;
        values.map((value) => {
          if (value.name === item.name) {
            exist = true;
          }
        });
        if (!exist) {
          fs.push(item);
        }
      });

      setFilteredSkills(fs);
    }
  };

  const remove = (item) => {
    const selectedSkills = [...values];
    let index = selectedSkills.indexOf(item);
    selectedSkills.splice(index, 1);
    setValues(selectedSkills);
    setFilteredSkills([...filteredSkills, item]);

    if (selectedSkills.length < 1) {
      setFilteredSkills([]);
    }
  };

  useEffect(() => {
    let fs = [];
    filteredSkills.map((item) => {
      let exist = false;
      values.map((value) => {
        if (value.name === item.name) {
          exist = true;
        }
      });
      if (!exist) {
        fs.push(item);
      }
    });

    setFilteredSkills(fs);
    onSelect(values);
  }, [values]);

  useEffect(() => {
    if (selected && JSON.stringify(values) !== JSON.stringify(selected)) {
      selected.map((sld) => {
        if (sld.name !== "") {
          setValues(selected);
        }
      });
    }
  }, [selected]);

  return (
    <div className={"auto_complete_select " + size}>
      {values.length > 0 && (
        <div className={`tags-container ${classForTagsContainer}`}>
          {values.map((skill) => (
            <div key={skill.id} className={"tag"}>
              <a>{skill.name}</a>
              <button onClick={() => remove(skill)}>
                <Image src={TrashIcon} alt="trash_icon"></Image>
              </button>
            </div>
          ))}
        </div>
      )}

      {filteredSkills.length > 0 && (
        <div className={`dropdown ${classForDropdown}`}>
          <h4>Рекомендуемые навыки</h4>
          {filteredSkills.map((skill) => (
            <a key={skill.id} onClick={() => onClick(skill)}>
              {skill.name}
            </a>
          ))}
        </div>
      )}

      <Fieldset label={label} size={size} type={type} onChange={onChange} />
    </div>
  );
}
