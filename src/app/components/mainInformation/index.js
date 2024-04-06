import AutoCompleteSelectCountries from "../autoCompleteSelectCountries";
import DateSelect from "../dateSelect";
import Radio from "../radio";
import classes from "@/app/style/components/mainInformation.module.css";

import { useEffect, useState } from "react";
import { END_POINT } from "@/config/end-point";
import axios from "axios";

export default function MainInfromation({ setNewResume }) {
  const [countries, setCountries] = useState([]);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [citizen_ship, setCitizenShip] = useState(5);

  useEffect(() => {
    axios.get(`${END_POINT}/api/region/countries`).then((res) => {
      setCountries(res.data);
    });
  }, []);

  const onSelectCitizenShip = (data) => {
    if (data === null) {
      setCitizenShip("");
    } else {
      setCitizenShip(data.id);
    }
  };

  const onChangeBirthday = (date) => {
    const dateObj = new Date(date);
    const isoStr = dateObj.toISOString();
    setBirthday(isoStr);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="create_resume_block">
      <h3>Основная информация</h3>
      <div>
        <DateSelect
          size="fieldset-sm"
          label="Дата рождения"
          onChange={onChangeBirthday}
        />
        <Radio
          type="radio"
          size="fieldset-sm"
          label="Пол"
          value1="Мужской"
          value2="Женский"
          name="gender"
          onChange={onChangeGender}
          classForLabel={classes.label}
        />
        <AutoCompleteSelectCountries
          type="text"
          countries={countries}
          onSelect={onSelectCitizenShip}
          size="fieldset-md"
          placeholder="Начните вводить здесь"
          label="Гражданство"
        />
        {/* <Radio
          type="radio"
          size="fieldset-sm"
          label="Опыт работы"
          value1="Есть опыт работы"
          value2="Нет опыта работы"
          name="experience"
          onChange={onChangeExperience}
          classForLabel={classes.label}
        /> */}
      </div>
    </div>
  );
}
