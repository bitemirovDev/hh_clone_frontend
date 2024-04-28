"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SelectSpecializationModal from "@/app/components/selectSpecializationModal";
import AutoCompleteSelectCity from "@/app/components/autoCompleteSelectCity";
import {
  getSpecializations,
  getCities,
  getExperiences,
  getSkills,
  getEmploymentTypes,
} from "@/app/store/slices/vacancySlice";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

// style
import classes from "@/app/style/pages/create-vacancy.module.css";

export default function CreateVacancy() {
  const [query, setQuery] = useState("");
  const [specialization_id, setSpecializationId] = useState(null);
  const [specialization_name, setSpecializationName] = useState("");
  const [city_id, setCityId] = useState("");
  const [salary, setSalary] = useState("");
  const [salary_type, setSalaryType] = useState("KZT");
  const [experience_id, setExperienceId] = useState();
  const [employmentType_id, setEmploymentTypeId] = useState();

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnSpecializationChange = (id, name) => {
    setSpecializationId(id);
    setSpecializationName(name);
  };

  const cities = useSelector((state) => state.vacancy.cities);
  const experiences = useSelector((state) => state.vacancy.experiences);
  const employmentTypes = useSelector((state) => state.vacancy.employmentTypes);

  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getCities());
    dispatch(getExperiences());
    dispatch(getSkills());
    dispatch(getEmploymentTypes());
  }, []);

  const onSelectCity = (data) => {
    if (data === null) {
      setCityId("");
    } else {
      setCityId(data.id);
    }
  };

  const handleChangeExperience = (e) => {
    setExperienceId(e.target.value);
  };

  const handleCheckboxChange = (value) => {
    setEmploymentTypeId(value);
  };

  const handleSearch = () => {
    let queryString = "?";

    if (queryString) queryString += `q=${query}&`;
    if (specialization_id)
      queryString += `specialization_id=${specialization_id}&`;
    if (city_id) queryString += `city_id=${city_id}&`;
    if (employmentType_id)
      queryString += `employmentType_id=${employmentType_id}&`;
    if (salary) queryString += `salary=${salary}&`;
    if (salary_type) queryString += `salary_type=${salary_type}&`;
    if (experience_id) queryString += `experience_id=${experience_id}&`;
    router.push(`/search/vacancy${queryString}`);
  };

  return (
    <main>
      <Header />
      <div className={`${classes.create_vacancy} container`}>
        <h1>Поиск вакансии</h1>
        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>Ключевые слова</label>
          <input
            className="input"
            type="text"
            placeholder="Введите слова"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </fieldset>

        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>Специализация</label>

          {specialization_id !== null && (
            <p style={{ marginBottom: "10px" }}>{specialization_name}</p>
          )}

          <p className={classes.modal_btn} onClick={() => setModal(true)}>
            Указать специализацию
          </p>
        </fieldset>

        {modal && (
          <SelectSpecializationModal
            onChange={handleOnSpecializationChange}
            closeModal={() => setModal(false)}
            value={specialization_id}
            setName={setSpecializationName}
          />
        )}

        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>Регион</label>
          <AutoCompleteSelectCity
            cities={cities}
            type="text"
            placeholder="Начните вводить здесь"
            size="fieldset-md"
            onSelect={onSelectCity}
          ></AutoCompleteSelectCity>
        </fieldset>

        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>
            Предпологаемый доход в месяц
          </label>
          <div className={classes.input_group}>
            <input
              className="input"
              placeholder="От"
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            ></input>
            <select
              className="input"
              name="salary_type"
              value={salary_type}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value={"KZT"}>KZT</option>
              <option value={"RUB"}>RUB</option>
              <option value={"USD"}>USD</option>
              <option value={"EUR"}>EUR</option>
            </select>
          </div>
        </fieldset>

        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>Опыт работы</label>
          <div className={classes.radio_group}>
            {experiences.map((exp) => (
              <div key={exp.id}>
                <input
                  name="experience"
                  type="radio"
                  id={`experience-${exp.id}`}
                  value={exp.id}
                  onChange={handleChangeExperience}
                ></input>
                <label htmlFor={`experience-${exp.id}`}>{exp.duration}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset
          className={`${classes.fieldset} ${classes.checkbox_container}`}
        >
          <label className={classes.fieldset_label}>Тип занятости</label>
          {employmentTypes.map((type) => (
            <div key={type.id} className={classes.checkbox}>
              <input
                type="checkbox"
                value={type.id}
                id={type.id + "-emp-type"}
                checked={employmentType_id === type.id}
                onChange={() => handleCheckboxChange(type.id)}
              ></input>
              <label htmlFor={type.id + "-emp-type"}>{type.name}</label>
            </div>
          ))}
        </fieldset>

        <button className="button button-primary" onClick={handleSearch}>
          Поиск
        </button>
      </div>
    </main>
  );
}
