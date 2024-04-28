"use client";

import { useEffect, useState } from "react";
import { setError, logInEmployer } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

export default function EmployerSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  const handleSignIn = () => {
    dispatch(logInEmployer({ email, password }, router));
  };

  return (
    <main>
      <Header />
      <div className="container">
        <section className="login_page">
          <div className="card">
            <h1>Поиск сотрудников</h1>
            <form className="form">
              <div className="inputs-group">
                <input
                  className="input"
                  placeholder="Электронная почта"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                ></input>
                <input
                  className="input"
                  type="password"
                  placeholder="Пароль"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></input>
              </div>
              <button
                className="button button-primary"
                onClick={handleSignIn}
                type="button"
              >
                Войти
              </button>

              <Link
                href="/employer/signup"
                style={{ textAlign: "center" }}
                className="link"
              >
                Нет аккаунта? Зарегистрироваться
              </Link>
            </form>
            {error &&
              Object.keys(error).map((key) => (
                <p className="error" key={key}>
                  {error[key]}
                </p>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
