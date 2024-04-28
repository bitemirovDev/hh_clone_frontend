"use client";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getSearchedVacancies,
  getSpecializations,
  getCities,
  getExperiences,
  getSkills,
  getEmploymentTypes,
} from "@/app/store/slices/vacancySlice";
import FoundVacancies from "@/app/components/foundVacancies";
import searchResultClasses from "@/app/style/pages/searchResult.module.css";
import SelectSpecializationModal from "@/app/components/selectSpecializationModal";
import AutoCompleteSelectCity from "@/app/components/autoCompleteSelectCity";

export default function SearchResult() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q"));
  const [specialization_id, setSpecializationId] = useState(
    searchParams.get("specialization_id")
  );
  const [city_id, setCityId] = useState(searchParams.get("city_id"));
  const [salary, setSalary] = useState(searchParams.get("salary"));
  const [salary_type, setSalaryType] = useState(
    searchParams.get("salary_type")
  );
  const [experience_id, setExperienceId] = useState(
    searchParams.get("experience_id")
  );
  const [employmentType_id, setEmploymentTypeId] = useState(
    searchParams.get("employmentType_id")
  );
  const [specialization_name, setSpecializationName] = useState("");

  const [modal, setModal] = useState(false);

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

    handleSearch();
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
    dispatch(
      getSearchedVacancies(
        {
          q,
          specialization_id,
          city_id,
          salary,
          salary_type,
          experience_id,
          employmentType_id,
        },
        router
      )
    );
  };

  useEffect(handleSearch, [
    specialization_id,
    city_id,
    salary,
    salary_type,
    experience_id,
    employmentType_id,
  ]);

  return (
    <main>
      <Header></Header>
      <div className="container">
        <h1>Результаты поиска</h1>

        <div className="d-flex gap10 ai-c mb40">
          <fieldset
            className={searchResultClasses.fieldset}
            style={{ width: "100%", marginBottom: "0" }}
          >
            <input
              className="input"
              type="text"
              placeholder="Введите слова"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            ></input>
          </fieldset>

          <button className="button button-primary" onClick={handleSearch}>
            Найти
          </button>
        </div>

        <div className="d-flex jc-sb gap50">
          <div>
            <fieldset className={searchResultClasses.fieldset}>
              <label className={searchResultClasses.fieldset_label}>
                Специализация
              </label>

              {specialization_id !== null && (
                <p style={{ marginBottom: "10px" }}>{specialization_name}</p>
              )}

              <p
                className={searchResultClasses.modal_btn}
                onClick={() => setModal(true)}
              >
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

            <fieldset className={searchResultClasses.fieldset}>
              <label className={searchResultClasses.fieldset_label}>
                Регион
              </label>
              <AutoCompleteSelectCity
                cities={cities}
                type="text"
                placeholder="Начните вводить здесь"
                size="fieldset-md"
                onSelect={onSelectCity}
              ></AutoCompleteSelectCity>
            </fieldset>

            <fieldset className={searchResultClasses.fieldset}>
              <label className={searchResultClasses.fieldset_label}>
                Предпологаемый доход в месяц
              </label>
              <div className={searchResultClasses.input_group}>
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

            <fieldset className={searchResultClasses.fieldset}>
              <label className={searchResultClasses.fieldset_label}>
                Опыт работы
              </label>
              <div className={searchResultClasses.radio_group}>
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <input
                      name="experience"
                      type="radio"
                      id={`experience-${exp.id}`}
                      value={exp.id}
                      onChange={handleChangeExperience}
                    ></input>
                    <label htmlFor={`experience-${exp.id}`}>
                      {exp.duration}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset
              className={`${searchResultClasses.fieldset} ${searchResultClasses.checkbox_container}`}
            >
              <label className={searchResultClasses.fieldset_label}>
                Тип занятости
              </label>
              {employmentTypes.map((type) => (
                <div key={type.id} className={searchResultClasses.checkbox}>
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
          </div>
          <div style={{ width: "80%" }}>
            <FoundVacancies />
          </div>
        </div>
      </div>
    </main>
  );
}
