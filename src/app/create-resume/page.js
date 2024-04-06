"use client";
import dynamic from "next/dynamic";

import Fieldset from "@/app/components/fieldset";
import AutoCompleteSelectCity from "@/app/components/autoCompleteSelectCity";
import PhoneNumberFieldset from "@/app/components/phoneNumberFieldset";
import AutoCompleteSelectCountries from "@/app/components/autoCompleteSelectCountries";
import DateSelect from "@/app/components/dateSelect";
import Radio from "@/app/components/radio";
import InputWithSelect from "@/app/components/inputWithSelect";
import ModalAddWorkExp from "@/app/components/modalAddWorkExp";
import WorkingHistoryCard from "@/app/components/workingHistoryCard";
import AutoCompleteSelectSkills from "@/app/components/autoCompleteSelectSkills";
import SelectEmploymentTypes from "@/app/components/selectEmploymentTypes";

import edu_classes from "@/app/style/components/education.module.css";

// styled-components
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
    color: #aaa8a8;
    font-size: 14px;
    line-height: 18px;
    max-width: calc(100% - 240px - 80px);
  }
`;

const EducationDiv = styled.div`
  position: relative;
  margin-bottom: 10px;
  border: 1px solid #e1e1e1;
  padding: 10px 20px;
  border-radius: 4px;
`;

const AddNewOneBtn = styled.button`
  width: max-content;
  color: blue;
  font-size: 14px;
  border: none;
  outline: none;
  padding: 10px 0;
  opacity: 0.8;
  transition: 0.3s;
  background: transparent;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const StyledLangDiv = styled.div`
  display: flex;
  width: calc(100% - 240px);
  margin-bottom: 15px;

  select:nth-child(2) {
    border-radius: 4px 0 0 4px;
    width: 40%;
  }

  select:last-child {
    border-radius: 0 4px 4px 0;
    width: 40%;
  }

  label {
    min-width: 240px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
`;

// css
import mi_classes from "@/app/style/components/mainInformation.module.css";
import { useEffect, useState } from "react";
import { END_POINT } from "@/config/end-point";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { createMyResume } from "../store/slices/resumeSlice";
import { useRouter } from "next/navigation";

const Header = dynamic(() => import("../components/header/index"), {
  ssr: false,
});

// arrays

const languages = [
  "Казахский",
  "Английский",
  "Французский",
  "Немецкий",
  "Испанский",
  "Итальянский",
  "Китайский",
  "Японский",
  "Корейский",
  "Армянский",
  "Русский",
  "Таджикский",
  "Украинский",
  "Белорусский",
  "Польский",
  "Финский",
  "Шведский",
  "Норвежский",
  "Датский",
  "Голландский",
];

const languageLevels = [
  "A1 - Начальный",
  "A2 - Элементарный",
  "B1 - Средний",
  "B2 - Выше среднего",
  "C1 - Продвинутый",
  "C2 - В совершенстве",
];

const educationLevels = [
  "Среднее",
  "Высшее",
  "Неоконченное высшее",
  "Магистратура",
];

export default function CreateResume() {
  const dispatch = useDispatch();
  const router = useRouter();

  // contact details
  const [cities, setCities] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city_id, setCityId] = useState("");

  useEffect(() => {
    axios.get(`${END_POINT}/api/region/cities`).then((res) => {
      setCities(res.data);
    });
    axios.get(`${END_POINT}/api/region/countries`).then((res) => {
      setCountries(res.data);
    });
    axios.get(`${END_POINT}/api/skills`).then((res) => {
      setAllSkills(res.data);
    });
    axios.get(`${END_POINT}/api/employment-types`).then((res) => {
      setAllEmploymentTypes(res.data);
    });
  }, []);

  const onSelectCity = (data) => {
    if (data === null) {
      setCityId("");
    } else {
      setCityId(data.id);
    }
  };

  function formatPhoneNumber(value) {
    const phoneNumber = value.replace(/[^\d]/g, "");

    if (phoneNumber.length <= 1) {
      return "+" + phoneNumber;
    } else if (phoneNumber.length <= 4) {
      return (
        "+" + phoneNumber.substring(0, 1) + " (" + phoneNumber.substring(1)
      );
    } else if (phoneNumber.length <= 7) {
      return (
        "+" +
        phoneNumber.substring(0, 1) +
        " (" +
        phoneNumber.substring(1, 4) +
        ") " +
        phoneNumber.substring(4)
      );
    } else if (phoneNumber.length <= 11) {
      return (
        "+" +
        phoneNumber.substring(0, 1) +
        " (" +
        phoneNumber.substring(1, 4) +
        ") " +
        phoneNumber.substring(4, 7) +
        "-" +
        phoneNumber.substring(7, 9) +
        "-" +
        phoneNumber.substring(9)
      );
    }
  }

  // main information
  const [countries, setCountries] = useState([]);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [citizen_ship, setCitizenShip] = useState(5);

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

  // speciality
  const [salary, setSalary] = useState(null);
  const [salary_type, setSalaryType] = useState("KZT");
  const [position, setPosition] = useState("");

  // work expirience
  const [modal, setModal] = useState(false);
  const [working_histories, setWorking_histories] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");

  const addWorkingHistory = (item) => {
    setWorking_histories([...working_histories, item]);
  };

  const removeWorkingHistory = (item) => {
    let whs = [...working_histories];
    let index = whs.indexOf(item);
    whs.splice(index, 1);
    setWorking_histories(whs);
  };

  const onSelectSkills = (data) => {
    const arr = data.map((item) => item.name);
    setSkills(arr.join(","));
  };

  // education
  const [education, setEducations] = useState([]);

  const onChangeData = (e) => {
    const [index, name] = e.target.name.split("-");
    let eds = [...education];
    eds[index * 1][name] = e.target.value;
    setEducations(eds);
  };

  const removeEdu = (edu) => {
    const eds = [...education];
    const index = eds.indexOf(edu);
    eds.splice(index, 1);
    setEducations(eds);
  };

  const edusMap = education.map((item, index) => (
    <EducationDiv key={index} className="education fieldset-md">
      <Fieldset
        type="select"
        placeholder=""
        size="fieldset-md"
        label="Уровень"
        options={educationLevels}
        onChange={onChangeData}
        value={item.level}
        name={index + "-level"}
        index={index}
      />
      <Fieldset
        type="text"
        placeholder="Название или аббревиатура"
        size="fieldset-md"
        label="Учебное заведение"
        onChange={onChangeData}
        value={item.university_name}
        name={index + "-university_name"}
      />
      <Fieldset
        type="text"
        size="fieldset-md"
        label="Факультет"
        onChange={onChangeData}
        value={item.faculty}
        name={index + "-faculty"}
      />
      <Fieldset
        type="text"
        size="fieldset-md"
        label="Специализация"
        onChange={onChangeData}
        value={item.major}
        name={index + "-major"}
      />

      <StyledDiv className="fieldset-md">
        <Fieldset
          type="text"
          size="fieldset-vsm"
          label="Год окончания"
          maxLength="4"
          onChange={onChangeData}
          value={item.end_date}
          name={index + "-end_date"}
        />
        <p>
          Если учитесь в настоящее время, укажите год предпологаемого окончания
        </p>
      </StyledDiv>

      <button className={edu_classes.remove_btn} onClick={() => removeEdu()}>
        X
      </button>
    </EducationDiv>
  ));

  const newEducation = () => {
    setEducations([
      ...education,
      {
        level: "Высшее",
        university_name: "",
        faculty: "",
        major: "",
        end_date: "",
      },
    ]);
  };

  // language skills
  const [foreign_languages, setForeignLanguages] = useState([
    {
      name: "Казахский",
      level: "A1",
    },
  ]);

  const [main_language, setMainLanguage] = useState("Казахский");

  const onSelectLanguage = (e) => {
    const [index, key] = e.target.name.split("-");
    let langsCopy = [...foreign_languages];
    langsCopy[index * 1][key] = e.target.value;
    setForeignLanguages(langsCopy);
  };

  const newLang = () => {
    setForeignLanguages([
      ...foreign_languages,
      {
        name: "",
        level: "A1",
      },
    ]);
  };

  const langsMap = foreign_languages.map((item, index) => (
    <StyledLangDiv key={index} className="lang fieldset-lg">
      <label>Язык</label>
      <select
        className="input"
        onChange={onSelectLanguage}
        value={item.name}
        name={index + "-name"}
      >
        {languages.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="input"
        onChange={onSelectLanguage}
        value={item.level}
        name={index + "-level"}
      >
        {languageLevels.map((option) => (
          <option key={option} value={option.split(" - ")[0]}>
            {option}
          </option>
        ))}
      </select>
    </StyledLangDiv>
  ));

  // employment types
  const [allEmployment_types, setAllEmploymentTypes] = useState([]);
  const [employment_types, setEmploymentTypes] = useState([]);

  const handleSave = () => {
    dispatch(
      createMyResume(
        {
          first_name,
          last_name,
          phone,
          city_id,
          birthday,
          gender,
          citizen_ship,
          position,
          salary,
          salary_type,
          working_histories,
          skills,
          about,
          education,
          employment_types,
          foreign_languages,
          main_language,
        },
        router
      )
    );
  };

  return (
    <main style={{ marginBottom: "300px" }}>
      <Header />
      <div className="container ptb-30">
        <h1 className="mb40">Ваше резюме</h1>

        {/* contact details */}
        <div className="create_resume_block">
          <h3>Контактные данные</h3>
          <div>
            <Fieldset
              type="text"
              placeholder=""
              size="fieldset-md"
              label="Имя"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Fieldset
              type="text"
              size="fieldset-md"
              label="Фамилия"
              onChange={(e) => setLastName(e.target.value)}
            />
            <PhoneNumberFieldset
              type="text"
              size="fieldset-md"
              placeholder="+9 (999) 999-99-99"
              label="Мобильный телефон"
              name="phone"
              value={phone}
              maxLength="18"
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            />
            <AutoCompleteSelectCity
              cities={cities}
              type="text"
              placeholder="Начните вводить здесь"
              size="fieldset-md"
              label="Город проживания"
              onSelect={onSelectCity}
            />
          </div>
        </div>
        {/* Main infromation */}
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
              onChange={(e) => setGender(e.target.value)}
              classForLabel={mi_classes.label}
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
        {/* Speciality */}
        <div className="create_resume_block">
          <h3>Специальность</h3>
          <div>
            <Fieldset
              type="text"
              label="Желаемая должность"
              size="fieldset-lg"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <InputWithSelect
              size="fieldset-sm"
              label="Зарплата"
              setSalary={setSalary}
              setSalaryType={setSalaryType}
            />
          </div>
        </div>
        {/* Work experience */}
        <div className="create_resume_block">
          <h3>Опыт работы</h3>
          <fieldset className={"fieldset fieldset-md "}>
            <label style={{ alignItems: "start" }}>Места работы</label>
            <div className="exp" style={{ width: "100%" }}>
              {working_histories.map((item, index) => (
                <WorkingHistoryCard
                  key={index}
                  workingHistory={item}
                  remove={removeWorkingHistory}
                />
              ))}

              <button
                className="button button-primary-bordered"
                onClick={() => setModal(true)}
              >
                Добавить место работы
              </button>
            </div>
          </fieldset>

          {modal && (
            <ModalAddWorkExp
              closeModal={() => setModal(false)}
              addNewWorkingHistory={addWorkingHistory}
            />
          )}

          <fieldset className={"fieldset fieldset-lg "}>
            <label style={{ alignItems: "start" }}>О себе</label>
            <textarea
              rows="8"
              cols="30"
              style={{
                width: "100%",
                outline: "none",
                padding: "10px",
                lineHeight: "18px",
                borderColor: "#e1e1e1",
                fontSize: "14px",
              }}
              placeholder="Расскажите о своих качествах, знаниях, увлечениях, которые, как вам кажется, будут полезны работодателю"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </fieldset>

          <AutoCompleteSelectSkills
            type="text"
            label="Ключевые навыки"
            size="fieldset-lg"
            onSelect={onSelectSkills}
            skills={allSkills}
            placeholder="Навык, например, JavaScript"
          />
        </div>
        {/* Education */}
        <div className="create_resume_block">
          <h3>Образование</h3>

          {edusMap}

          <button className={edu_classes.add_new_edu} onClick={newEducation}>
            {education.length > 0
              ? "Добавить еще одно образование"
              : "Добавить образование"}
          </button>
        </div>
        {/* language skills */}
        <div className="create_resume_block">
          <h3>Владение языками</h3>

          <StyledLangDiv className="lang fieldset-lg">
            <label>Родной язык</label>
            <select
              className="input"
              onChange={(e) => setMainLanguage(e.target.value)}
              value={main_language}
            >
              {languages.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select style={{ visibility: "hidden" }}></select>
          </StyledLangDiv>

          {langsMap}

          <AddNewOneBtn onClick={() => newLang()}>
            Добавить еще один язык
          </AddNewOneBtn>
        </div>
        {/* employment types */}
        <div className="create_resume_block">
          <h3>Другая важная информация</h3>
          <div>
            <SelectEmploymentTypes
              label="Занятость"
              size="fieldset-md"
              onChange={(emps) => setEmploymentTypes(emps)}
              allEmploymentTypes={allEmployment_types}
              employmentTypes={[]}
            />
          </div>
        </div>

        {/* save button */}
        <div className="fieldset-lg" style={{ textAlign: "end" }}>
          <button className="button button-primary" onClick={handleSave}>
            Сохранить и опубликовать
          </button>
        </div>
      </div>
    </main>
  );
}
