"use client";

import classes from "@/app/style/components/resumePage.module.css";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResumeById } from "@/app/store/slices/resumeSlice";
import { useParams } from "next/navigation";

const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const months2 = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

export default function ResumePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);

  const didMount = () => {
    dispatch(getResumeById(id));
  };

  useEffect(didMount, []);

  const birthday = new Date(resume.birthday);
  let age = new Date().getTime() - birthday.getTime();
  const formattedAge = parseInt(age / (1000 * 60 * 60 * 24 * 365));

  function formatDuration(milliseconds) {
    const durationDate = new Date(milliseconds);
    const years = durationDate.getUTCFullYear() - 1970;
    const months = durationDate.getUTCMonth();

    let result = "";

    function getEnding(number, endings) {
      const cases = [2, 0, 1, 1, 1, 2];
      return endings[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[Math.min(number % 10, 5)]
      ];
    }

    if (years > 0) {
      result += years + " " + getEnding(years, ["год", "года", "лет"]) + " ";
    }
    if (months > 0) {
      result +=
        months + " " + getEnding(months, ["месяц", "месяца", "месяцев"]) + " ";
    }

    return result.trim();
  }

  let skills = [];

  if (resume.skills) {
    skills = resume.skills.split(",");
  }

  return (
    <main>
      <Header />
      <div className={`container + ${classes.resumePage}`}>
        <div className="d-flex jc-sb ai-c ptb20">
          <Link style={{ fontSize: "14px" }} className="link" href="/resumes">
            К списку резюме
          </Link>
          <button className="button button-secondary button-secondary-bordered">
            <Link href={`/edit-resume/${resume.id}`}>Редактировать</Link>
          </button>
        </div>
        <div className={classes.block}>
          <h2 className={classes.bold}>
            {resume.first_name} {resume.last_name}
          </h2>
          <p>
            {resume.gender}, {formattedAge} лет, родился {birthday.getDate()}{" "}
            {months[birthday.getMonth()]} {birthday.getFullYear()} года
          </p>
        </div>
        <div className={classes.block}>
          <h5 className={classes.secondary}>Контакты</h5>
          <p>Номер телефона: {resume.phone}</p>
          <p>Место проживания: {resume.city && resume.city.name}</p>
        </div>
        <div className={classes.block}>
          <div className={classes.flex_jc_sb}>
            <h2 className={classes.bold}>{resume.position}</h2>
            <h2 className={classes.bold}>
              {resume.salary} {resume.salary_type} на руки
            </h2>
          </div>

          <p>
            Занятость:{" "}
            {resume.employmentTypes &&
              resume.employmentTypes.map((emp) => `${emp.name} `)}
          </p>
        </div>
        <div className={classes.block}>
          <h2 className={`${classes.secondary_bold_18}`}>Опыт работы</h2>
          {resume.workingHistories &&
            resume.workingHistories.map((job) => {
              const startDate = new Date(job.start_date);
              const startDateMonth =
                months2[startDate.getMonth()].toLowerCase();
              const startDateYear = startDate.getFullYear();

              const endDate = new Date(job.end_date);
              const endDateMonth = months2[endDate.getMonth()].toLowerCase();
              const endDateYear = endDate.getFullYear();

              return (
                <div key={job.id} className={classes.workingHistory}>
                  <div className={classes.wh_dates}>
                    {`${startDateMonth} ${startDateYear}`} -{" "}
                    {`${endDateMonth} ${endDateYear}`}
                    <p className={classes.secondary}>
                      {formatDuration(endDate - startDate)}
                    </p>
                  </div>
                  <div>
                    <p>{job.company_name}</p>
                    <p>{job.company_description}</p>
                    <p>{job.responsibilities}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={classes.block}>
          <h5 className={classes.secondary_bold_18}>Ключевые навыки</h5>
          <div className={classes.tags}>
            {skills.map((item, index) => (
              <span key={index} className={classes.tag}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={classes.block}>
          <h5 className={classes.secondary_bold_18}>Обо мне</h5>
          {resume.about}
        </div>
        <div className={classes.block}>
          <h5 className={classes.secondary_bold_18}>Образование</h5>
          {resume.education &&
            resume.education.map((edu) => {
              const endDate = new Date(edu.end_date);
              const endDateYear = endDate.getFullYear();
              return (
                <div key={edu.id} className={classes.education}>
                  <div className={classes.edu_dates}>
                    {edu.level} - {`${endDateYear}`}
                  </div>
                  <div>
                    <p>{edu.university_name}</p>
                    <p>{edu.faculty}</p>
                    <p>{edu.major}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={classes.block}>
          <h5 className={classes.secondary_bold_18}>Знание языков</h5>
          <div className={classes.tags}>
            <span className={classes.tag}>
              {resume.main_language && resume.main_language} - Родной
            </span>
            {resume.foreignLanguages &&
              resume.foreignLanguages.map((lng) => (
                <span key={lng.name} className={classes.tag}>
                  {lng.name} - {lng.level}
                </span>
              ))}
          </div>
        </div>
        <div className={classes.block}>
          <h5 className={classes.secondary_bold_18}>Гражданство</h5>
          <p>
            Гражданство:{" "}
            {resume.citizen_shipObject && resume.citizen_shipObject.name}
          </p>
        </div>
      </div>
    </main>
  );
}
