"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SelectSpecializationModal from "../components/selectSpecializationModal";
import { getSpecializations } from "@/app/store/slices/vacancySlice";

// style
import classes from "@/app/style/pages/create-vacancy.module.css";
import { useDispatch } from "react-redux";

const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specialization_id, setSpecializationId] = useState();

  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const handleOnSpecializationChange = (id) => {
    setSpecializationId(id * 1);
  };

  useEffect(() => {
    dispatch(getSpecializations());
  }, []);

  return (
    <main>
      <Header />
      <div className="container">
        <h1>Создание вакансии</h1>

        <h2>Основная информация</h2>
        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>Название вакансии</label>
          <input
            className="input"
            type="text"
            placeholder="Введите название"
            value={name}
            onChange={() => setName(e.target.value)}
          ></input>
        </fieldset>

        <fieldset className={classes.fieldset}>
          <label className={classes.fieldset_label}>Специализация</label>
          <p className={classes.modal_btn} onClick={() => setModal(true)}>
            Указать специализацию
          </p>
        </fieldset>

        {modal && (
          <SelectSpecializationModal
            onChange={handleOnSpecializationChange}
            closeModal={() => setModal(false)}
            value={specialization_id}
          />
        )}
      </div>
    </main>
  );
}
