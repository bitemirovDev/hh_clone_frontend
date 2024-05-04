"use client";

import dynamic from "next/dynamic";
import { getAppliesByVacancy } from "@/app/store/slices/applySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import classes from "@/app/style/pages/vacancy-applies.module.css";
import Applies from "@/app/components/vacancyApply";
import { userAgentFromString } from "next/server";

const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

export default function VacancyApplies() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [status, setStatus] = useState("NEW");

  const applies = useSelector((state) => state.apply.applies);
  const filteredApplies = applies.filter((item) => item.status === status);

  const didMount = () => {
    dispatch(getAppliesByVacancy(id));
  };

  useEffect(didMount, []);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="d-flex jc-sb ai-c ptb20">
          <h1 className="mb0">Отклики на вакансию</h1>
        </div>

        <div className="d-flex jc-sb">
          <div className={classes.nav_list}>
            <input
              className={status === "NEW" && classes.active}
              type="button"
              value="Не просмотренные"
              onClick={() => setStatus("NEW")}
            ></input>
            <input
              className={status === "INVITATION" && classes.active}
              type="button"
              value="Приглашенные"
              onClick={() => setStatus("INVITATION")}
            ></input>
            <input
              className={status === "DECLINED" && classes.active}
              type="button"
              value="Отказанные"
              onClick={() => setStatus("DECLINED")}
            ></input>
          </div>

          <div className={classes.content}>
            {<Applies applies={filteredApplies} />}
          </div>
        </div>
      </div>
    </main>
  );
}
