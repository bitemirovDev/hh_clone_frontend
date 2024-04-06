import { useState, useEffect } from "react";
import styled from "styled-components";

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

const levels = [
  "A1 - Начальный",
  "A2 - Элементарный",
  "B1 - Средний",
  "B2 - Выше среднего",
  "C1 - Продвинутый",
  "C2 - В совершенстве",
];

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

export default function LanguageSkills({ setNewResume }) {
  const [foreign_languages, setForeignLanguages] = useState([
    {
      name: "Казахский",
      level: "A1",
    },
  ]);

  const [main_language, setMainLanguage] = useState("Казахский");

  const onChange = (data) => {
    console.log(data);
  };

  const onSelectMainLanguage = (e) => {
    setMainLanguage(e.target.value);
  };

  const onSelectLanguage = (e) => {
    const [index, key] = e.target.name.split("-");
    let langsCopy = [...foreign_languages];
    langsCopy[index * 1][key] = e.target.value;
    setForeignLanguages(langsCopy);
    onChange(langsCopy);
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

  useEffect(() => {
    setNewResume((prevState) => ({
      ...prevState,
      foreign_languages,
      main_language,
    }));
  }, [foreign_languages, main_language, setNewResume]);

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
        {levels.map((option) => (
          <option key={option} value={option.split(" - ")[0]}>
            {option}
          </option>
        ))}
      </select>
    </StyledLangDiv>
  ));

  return (
    <div className="create_resume_block">
      <h3>Владение языками</h3>

      <StyledLangDiv className="lang fieldset-lg">
        <label>Родной язык</label>
        <select
          className="input"
          onChange={onSelectMainLanguage}
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
  );
}
