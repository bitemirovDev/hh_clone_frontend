"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import MyVacancies from "../components/myvacancies";
import { getMyVacancies } from "@/app/store/slices/vacancySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

export default function Vacancy() {
  const dispatch = useDispatch();
  const vacancies = useSelector((state) => state.vacancy.vacancies);

  const didMount = () => {
    dispatch(getMyVacancies());
  };

  useEffect(didMount, []);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="d-flex jc-sb ai-c ptb20">
          <h1 className="mb0">Мои вакансии</h1>
          <button className="button button-secondary button-secondary-bordered">
            <Link href="/create-vacancy">Создать вакансию</Link>
          </button>
        </div>

        <MyVacancies vacancies={vacancies} />
      </div>
    </main>
  );
}
