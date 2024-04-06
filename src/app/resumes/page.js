"use client";

import MyResumesArray from "../components/myresumes";
import Link from "next/link";

import dynamic from "next/dynamic";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyResumes } from "../store/slices/resumeSlice";

const Header = dynamic(() => import("../components/header/index"), {
  ssr: false,
});

export default function MyResumes() {
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);

  const didMount = () => {
    dispatch(getMyResumes());
  };

  useEffect(didMount, []);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="d-flex jc-sb ai-c ptb20">
          <h1 className="mb0">Мои резюме</h1>
          <button className="button button-secondary button-secondary-bordered">
            <Link href="/create-resume">Создать резюме</Link>
          </button>
        </div>

        <MyResumesArray resumes={resumes} />
      </div>
    </main>
  );
}
