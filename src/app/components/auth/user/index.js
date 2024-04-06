"use client";

// next
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  authorize,
  sendVerificationEmail,
  verifyCode,
} from "@/app/store/slices/authSlice";

export default function UserLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const verifyEmail = () => {
    dispatch(sendVerificationEmail(email));
    setStep(2);
  };

  const checkCodeAndEmail = () => {
    dispatch(verifyCode(email, code));
    setStep(3);
  };

  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    let interval;
    if (step === 2) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            return prevSeconds;
          }
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (isAuth) {
      router.push("/resumes");
    }
  }, [isAuth]);

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <section className="login_page">
      {isAuth ? "True" : "False"}
      {step === 1 && (
        <div className="card">
          <h1>Поиск работы</h1>
          <form className="form">
            <div className="inputs-group">
              <input
                className="input"
                placeholder="Электронная почта"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>
            <button
              className="button button-primary"
              onClick={verifyEmail}
              type="button"
            >
              Продолжить
            </button>
          </form>
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <h1>Поиск сотрудников</h1>
          <p>Размещение вакансий и доступ к базе резюме</p>
          <button className="button button-primary-bordered" type="button">
            Я ищу сотрудников
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h1>Отправили код на beyself@vk.com</h1>
          <p>
            Напишите его, чтобы подтвердить, что это вы, а не кто-то другой
            входжит в личный кабинет.
          </p>
          <form className="form">
            <div className="inputs-group">
              <input
                className="input"
                placeholder="Введите код"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></input>
            </div>

            <p>Повторить можно через {formatTime(seconds)}</p>

            <div className="buttons-group">
              <button
                type="button"
                className="button button-primary"
                onClick={checkCodeAndEmail}
              >
                Подтвердить
              </button>
              <button
                type="button"
                className="button button-primary-bordered"
                onClick={() => setStep(1)}
              >
                Назад
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h1>Давайте познакомимся</h1>
          <form className="form">
            <div className="inputs-group">
              <input className="input" placeholder="Имя"></input>
              <input className="input" placeholder="Фамилия"></input>
            </div>
            <div className="buttons-group">
              <button
                className="button button-primary"
                onClick={() => dispatch(authorize())}
                type="button"
              >
                Подтвердить
              </button>
              <button
                type="button"
                className="button button-primary-bordered"
                onClick={() => setStep(2)}
              >
                Назад
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
