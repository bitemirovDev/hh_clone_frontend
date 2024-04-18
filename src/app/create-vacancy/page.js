"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SelectSpecializationModal from "../components/selectSpecializationModal";
import AutoCompleteSelectCity from "../components/autoCompleteSelectCity";
import AutoCompleteSelectSkills from "../components/autoCompleteSelectSkills";
import {
  getSpecializations,
  getCities,
  getExperiences,
  getSkills,
  getEmploymentTypes,
  createVacancy,
} from "@/app/store/slices/vacancySlice";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

// style
import classes from "@/app/style/pages/create-vacancy.module.css";

export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specialization_id, setSpecializationId] = useState(null);
  const [specialization_name, setSpecializationName] = useState("");
  const [city_id, setCityId] = useState("");
  const [salary_from, setSalaryFrom] = useState("");
  const [salary_to, setSalaryTo] = useState("");
  const [salary_type, setSalaryType] = useState("KZT");
  const [address, setAddress] = useState("");
  const [experience_id, setExperienceId] = useState();
  const [description, setDescription] = useState(`
    <h4>Обязанности</h4>
      <p></p>
      <p></p>

    <h4>Условия</h4>
      <p></p>
      <p></p>

    <h4>Требования</h4>
      <p></p>
      <p></p>
`);
  const [employmentType_id, setEmploymentTypeId] = useState();
  const [skills, setSkills] = useState("");
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnSpecializationChange = (id, name) => {
    setSpecializationId(id);
    setSpecializationName(name);
  };

  const cities = useSelector((state) => state.vacancy.cities);
  const experiences = useSelector((state) => state.vacancy.experiences);
  const allSkills = useSelector((state) => state.vacancy.skills);
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

  const onSelectSkills = (data) => {
    const arr = data.map((item) => item.name);
    setSkills(arr.join(","));
  };

  const handleCheckboxChange = (value) => {
    setEmploymentTypeId(value);
  };

  const handleSave = () => {
    dispatch(
      createVacancy(
        {
          name,
          specialization_id: `${specialization_id}`,
          city_id: `${city_id}`,
          employmentType_id: `${employmentType_id}`,
          description,
          salary_from,
          salary_to,
          salary_type,
          address,
          experience_id,
          skills,
          about_company: "",
        },
        router
      )
    );
  };

  return (
    <main>
      <Header />
      <div className={`${classes.create_vacancy} container`}>
        <h1>Создание вакансии</h1>

        {/* <h2>Основная информация</h2> */}
        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>Название вакансии</label>
          <input
            className="input"
            type="text"
            placeholder="Введите название"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label className={classes.fieldset_label}>
            Где искать сотрудника?
          </label>
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
              value={salary_from}
              onChange={(e) => setSalaryFrom(e.target.value)}
            ></input>
            <input
              className="input"
              placeholder="До"
              type="text"
              value={salary_to}
              onChange={(e) => setSalaryTo(e.target.value)}
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
          <label className={classes.fieldset_label}>
            Где будет работать сотрудник?
          </label>
          <input
            className="input"
            type="text"
            placeholder="Введите название"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
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

        <fieldset className={`${classes.fieldset} ${classes.editor}`}>
          <label className={classes.fieldset_label}>
            Расскажите про вакансию
          </label>
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                "bold",
                "italic",
                "bulletedList",
                "numberedList",
                "link",
              ],
            }}
            data={description}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </fieldset>

        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>Ключевые навыки</label>
          <AutoCompleteSelectSkills
            type="text"
            classForTagsContainer={classes.cvtc}
            classForDropdown={classes.cvd}
            size="fieldset-lg"
            onSelect={onSelectSkills}
            skills={allSkills}
            selected={[]}
            placeholder="Навык, например, JavaScript"
          />
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

        <button className="button button-primary" onClick={handleSave}>
          Продолжить
        </button>
      </div>
    </main>
  );
}
