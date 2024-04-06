import classes from "@/app/style/components/modalAddWorkExp.module.css";
import { useState } from "react";

// months array
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default function ModalAddWorkExp({ closeModal, addNewWorkingHistory }) {
  // dates
  const [start_date, setStart_date] = useState(Date.now());
  const [end_date, setEnd_date] = useState(Date.now());

  // other inputs
  const [company_name, setCompany_name] = useState("");
  const [company_description, setCompany_description] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  // onChanges
  const onChangeYearStart_date = (e) => {
    let date = new Date(start_date);
    date.setFullYear(e.target.value);
    setStart_date(date.getTime());
  };
  const onChangeMonthStart_date = (e) => {
    let date = new Date(start_date);
    date.setMonth(e.target.value);
    setStart_date(date.getTime());
  };
  const onChangeYearEnd_date = (e) => {
    let date = new Date(end_date);
    date.setFullYear(e.target.value);
    setEnd_date(date.getTime());
  };
  const onChangeMonthEnd_date = (e) => {
    let date = new Date(end_date);
    date.setMonth(e.target.value);
    setEnd_date(date.getTime());
  };
  const onChangeCompanyName = (e) => {
    setCompany_name(e.target.value);
  };
  const onChangeCompanyDescription = (e) => {
    setCompany_description(e.target.value);
  };
  const onChangeResponsibilities = (e) => {
    setResponsibilities(e.target.value);
  };

  const save = () => {
    const working_history = {
      start_date: start_date,
      end_date: end_date,
      company_name: company_name,
      company_description: company_description,
      responsibilities: responsibilities,
    };
    addNewWorkingHistory(working_history);
    closeModal();
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modal__backdrop} onClick={closeModal}></div>
      <div className={classes.modal__inner}>
        <h3>Опыт работы</h3>
        <h5 className={classes.modal__h5}>Начало работы</h5>
        <fieldset className="fieldset fieldset-sm">
          <div className={classes.inputs_container}>
            <select
              className="input"
              onChange={onChangeMonthStart_date}
              defaultValue=""
            >
              <option value="" disabled>
                Выберите месяц
              </option>
              {months.map((month) => (
                <option key={month} value={months.indexOf(month)}>
                  {month}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="Год"
              onChange={onChangeYearStart_date}
              maxLength="4"
            ></input>
          </div>
        </fieldset>
        <h5 className={classes.modal__h5}>Конец работы</h5>
        <fieldset className="fieldset fieldset-sm">
          <div className={classes.inputs_container}>
            <select
              className="input"
              onChange={onChangeMonthEnd_date}
              defaultValue=""
            >
              <option value="" disabled>
                Выберите месяц
              </option>
              {months.map((month) => (
                <option key={month} value={months.indexOf(month)}>
                  {month}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="Год"
              onChange={onChangeYearEnd_date}
              maxLength="4"
            ></input>
          </div>
        </fieldset>
        <h5 className={classes.modal__h5}>Организация</h5>
        <fieldset className="fieldset fieldset-sm">
          <input
            placeholder="Название компании"
            type="text"
            className="input"
            onChange={onChangeCompanyName}
            value={company_name}
          ></input>
        </fieldset>
        <h5 className={classes.modal__h5}>Должность</h5>
        <fieldset className="fieldset fieldset-sm">
          <input
            placeholder="Должность"
            type="text"
            className="input"
            value={company_description}
            onChange={onChangeCompanyDescription}
          ></input>
        </fieldset>
        <h5 className={classes.modal__h5}>Обязанности на рабочем месте</h5>
        <fieldset className="fieldset fieldset-sm">
          <textarea
            rows="8"
            placeholder="Опишите, что вы делали на работе"
            type="text"
            className="input"
            value={responsibilities}
            onChange={onChangeResponsibilities}
          ></textarea>
        </fieldset>
        <div className={classes.modal__actions}>
          <button
            className="button button-primary-bordered"
            onClick={() => closeModal()}
          >
            Отменить
          </button>
          <button className="button button-primary" onClick={save}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
