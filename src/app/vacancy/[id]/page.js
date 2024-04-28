"use client";

import classes from "@/app/style/pages/vacancyPage.module.css";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getVacancyById } from "@/app/store/slices/vacancySlice";
import { getMyResumes } from "@/app/store/slices/resumeSlice";
import { createApply, getEmployeeAplies } from "@/app/store/slices/applySlice";

const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

export default function VacancyPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const vacancy = useSelector((state) => state.vacancy.vacancy);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const resumes = useSelector((state) => state.resume.resumes);
  const applies = useSelector((state) => state.apply.applies);
  const [resume_id, setResumeId] = useState();

  const didMount = () => {
    dispatch(getVacancyById(id));
    dispatch(getMyResumes());
    dispatch(getEmployeeAplies());
  };

  useEffect(() => {
    if (resumes[0]) {
      setResumeId(resumes[0].id);
    }
  }, [resumes]);

  useEffect(didMount, []);

  let skills = [];
  if (vacancy.skills) {
    skills = vacancy.skills.split(",");
  }

  const handleApply = () => {
    dispatch(createApply({ resume_id, vacancy_id: id }));
  };

  let isApplied = applies.some((item) => item.vacancy_id == id);

  return (
    <main>
      <Header />

      <div style={{ marginBottom: "200px" }} className={`container`}>
        {currentUser && currentUser.id === vacancy.user_id && (
          <div className="d-flex jc-sb ai-c ptb20">
            <Link style={{ fontSize: "14px" }} className="link" href="/vacancy">
              К списку вакансий
            </Link>
            <button className="button button-secondary button-secondary-bordered">
              <Link href={`/edit-vacancy/${vacancy.id}`}>Редактировать</Link>
            </button>
          </div>
        )}

        <div className="d-flex jc-sb gap20 mb20 mt40">
          <div className="card flex-shrink">
            <h1 className={classes.position}>{vacancy.name}</h1>
            <p className={classes.salary}>
              от {vacancy.salary_from} до {vacancy.salary_to}{" "}
              {vacancy.salary_type} на руки
            </p>
            <div>
              <p>
                Требуемый опыт работы:{" "}
                {vacancy.experience && vacancy.experience.duration}
              </p>
              <p>
                Тип занятости:{" "}
                {vacancy.employmentType && vacancy.employmentType.name}
              </p>
            </div>

            {currentUser && currentUser.role.id == 1 && (
              <select
                className="input mt10"
                style={{ width: "50%" }}
                value={resume_id}
                onChange={(e) => setResumeId(e.target.value)}
              >
                {resumes.map((resume) => (
                  <option key={resume.id} value={resume.id}>
                    {resume.position}
                  </option>
                ))}
              </select>
            )}

            {currentUser && currentUser.id !== vacancy.user_id && (
              <div className="d-flex jc-sb ai-c ptb20">
                {isApplied && (
                  <button className="button button-secondary button-primary">
                    <Link href="/applies">Смотреть отклик</Link>
                  </button>
                )}
                {!isApplied && (
                  <button
                    className="button button-secondary button-primary-bordered"
                    onClick={handleApply}
                  >
                    Откликнуться
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="card h_mc">
            <div className={`${classes.company_info} ${classes.mb_30}`}>
              <h4>{vacancy.company && vacancy.company.name}</h4>
              <p>{vacancy.company && vacancy.company.address}</p>
            </div>
          </div>
        </div>

        <p className="mb20">{vacancy.company && vacancy.company.description}</p>

        <div
          className={`${classes.mb_30} ${classes.ml_20}`}
          dangerouslySetInnerHTML={{ __html: vacancy.description }}
        ></div>

        <h4>Ключевые навыки</h4>
        <div className={`${classes.tags} ${classes.mb_30}`}>
          {skills.map((item, index) => (
            <span key={index} className={classes.tag}>
              {item}
            </span>
          ))}
        </div>

        <h4>Адрес</h4>
        <p>{vacancy.address}</p>
      </div>
    </main>
  );
}
