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
import radio_classes from "@/app/style/components/radio.module.css";
import salary_classes from "@/app/style/components/inputWithSelect.module.css";
import {
  languages,
  languageLevels,
  educationLevels,
} from "@/app/constants/constants";

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
import { editMyResume, getResumeById } from "@/app/store/slices/resumeSlice";
import { useRouter, useParams } from "next/navigation";

const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

export default function EditResume() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);

  useEffect(() => {
    dispatch(getResumeById(id));
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

  useEffect(() => {
    if (resume.id) {
      setFirstName(resume.first_name);
      setLastName(resume.last_name);
      setPhone(resume.phone);
      setCityId(resume.city_id);
      setBirthday(resume.birthday);
      setGender(resume.gender);
      setCitizenShip(resume.citizen_ship);
      setPosition(resume.position);
      setSalary(resume.salary);
      setSalaryType(resume.salary_type);
      setWorking_histories(resume.workingHistories);
      setAbout(resume.about);
      setSkills(resume.skills);
      setEducations(resume.education);
      setMainLanguage(resume.main_language);
      setForeignLanguages(resume.foreignLanguages);
      setEmploymentTypes(resume.employmentTypes.map((emps) => emps.id));
    }
  }, [resume]);

  const [cities, setCities] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city_id, setCityId] = useState("");
  const [countries, setCountries] = useState([]);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [citizen_ship, setCitizenShip] = useState(null);
  const [salary, setSalary] = useState(null);
  const [salary_type, setSalaryType] = useState("KZT");
  const [position, setPosition] = useState("");
  const [modal, setModal] = useState(false);
  const [working_histories, setWorking_histories] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEducations] = useState([]);
  const [main_language, setMainLanguage] = useState("");
  const [allEmployment_types, setAllEmploymentTypes] = useState([]);
  const [employment_types, setEmploymentTypes] = useState([]);
  const [foreign_languages, setForeignLanguages] = useState([]);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const onSelectCity = (data) => {
    if (data === null) {
      setCityId("");
    } else {
      setCityId(data.id);
    }
  };

  const onSelectCitizenShip = (data) => {
    if (data === null) {
      setCitizenShip(null);
    } else {
      setCitizenShip(data.id);
    }
  };

  const onChangeBirthday = (date) => {
    const dateObj = new Date(date);
    const isoStr = dateObj.toISOString();
    setBirthday(isoStr);
  };

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

  const handleSave = () => {
    dispatch(
      editMyResume(
        {
          id: resume.id,
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

  console.log(resume);

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
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Fieldset
              type="text"
              size="fieldset-md"
              label="Фамилия"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <PhoneNumberFieldset
              type="text"
              size="fieldset-md"
              placeholder="+9 (999) 999-99-99"
              label="Мобильный телефон"
              name="phone"
              value={formatPhoneNumber(phone)}
              maxLength="18"
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            />
            <AutoCompleteSelectCity
              cities={cities}
              type="text"
              placeholder="Начните вводить здесь"
              size="fieldset-md"
              label="Город проживания"
              selected={city_id}
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
              value={birthday}
              onChange={onChangeBirthday}
            />
            <fieldset className="fieldset fieldset-sm">
              <label className={mi_classes.label}>Пол</label>
              <div className={radio_classes.radios_container}>
                <div className={radio_classes.radio}>
                  <input
                    className="input"
                    type="radio"
                    name="gender"
                    id="g_male"
                    value={"Мужской"}
                    onChange={handleGenderChange}
                    checked={gender === "Мужской"}
                  ></input>
                  <label htmlFor="g_male">Мужской</label>
                </div>
                <div className={radio_classes.radio}>
                  <input
                    className="input"
                    type="radio"
                    name="gender"
                    id="g_female"
                    value={"Женский"}
                    onChange={handleGenderChange}
                    checked={gender === "Женский"}
                  ></input>
                  <label htmlFor="g_female">Женский</label>
                </div>
              </div>
            </fieldset>
            <AutoCompleteSelectCountries
              type="text"
              countries={countries}
              onSelect={onSelectCitizenShip}
              selected={citizen_ship}
              size="fieldset-md"
              placeholder="Начните вводить здесь"
              label="Гражданство"
            />
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

            <fieldset className="fieldset fieldset-sm">
              <label>Зарплата</label>
              <div className={salary_classes.container}>
                <input
                  className="input"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                ></input>
                <select
                  className="input"
                  value={salary_type}
                  onChange={(e) => setSalaryType(e.target.value)}
                >
                  <option value={"KZT"} selected={salary === resume.salary}>
                    KZT
                  </option>
                  <option value={"RUB"} selected={salary === resume.salary}>
                    RUB
                  </option>
                  <option value={"USD"} selected={salary === resume.salary}>
                    USD
                  </option>
                  <option value={"EUR"} selected={salary === resume.salary}>
                    EUR
                  </option>
                </select>
              </div>
            </fieldset>
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
            selected={skills.split(",").map((skill) => ({ name: skill }))}
            placeholder="Навык, например, JavaScript"
          />
        </div>
        {/* Education */}
        <div className="create_resume_block">
          <h3>Образование</h3>

          {education.map((item, index) => (
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
                  Если учитесь в настоящее время, укажите год предпологаемого
                  окончания
                </p>
              </StyledDiv>

              <button
                className={edu_classes.remove_btn}
                onClick={() => removeEdu()}
              >
                X
              </button>
            </EducationDiv>
          ))}

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
                <option
                  key={option}
                  value={option}
                  selected={main_language === option}
                >
                  {option}
                </option>
              ))}
            </select>

            <select style={{ visibility: "hidden" }}></select>
          </StyledLangDiv>

          {foreign_languages.map((item, index) => (
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
          ))}

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
              employmentTypes={employment_types}
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
