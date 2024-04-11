"use client";

import Image from "next/image";
import Logo from "@/app/images/hh_kz.svg";
import { useEffect, useState } from "react";
import { signUpEmployer, setError } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function EmployerSignUp() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_description, setCompanyDescription] = useState("");
  const [company_address, setCompanyAddress] = useState("");
  const [company_logo, setCompanyLogo] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  const handleSignUp = () => {
    dispatch(
      signUpEmployer(
        {
          email,
          full_name: `${first_name} ${last_name}`,
          password,
          password2,
          company_name,
          company_description,
          company_address,
          company_logo,
        },
        router
      )
    );
  };

  return (
    <main className="bg">
      <div className="container">
        <div className="auth_header">
          <Image src={Logo} alt="logo_image"></Image>
          <p>
            Зарегистрируйтесь сейчас, чтобы купить доступ к базе резюме или
            публикацию вакансий по выгодным ценам — все акции уже ждут вас в
            разделе «Спецпредложения».
          </p>
          <p>Ответим на ваши вопросы</p>
          <a href="tel:77272321313">+7 727 232 13 13</a>
        </div>

        <section className="login_page">
          {step === 1 && (
            <div className="card">
              <h1>Регистрация для поиска сотрудников</h1>
              <p>В завершении на почту придёт пароль</p>
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
                  onClick={() => setStep(2)}
                  type="button"
                >
                  Продолжить
                </button>
              </form>
              {error &&
                Object.keys(error).map((key) => (
                  <p className="error" key={key}>
                    {error[key]}
                  </p>
                ))}
            </div>
          )}

          {step === 2 && (
            <div className="card">
              <p>Шаг {step - 1} из 3</p>
              <h1>Как вас зовут?</h1>
              <form className="form">
                <div className="inputs-group">
                  <input
                    className="input"
                    placeholder="Введите имя"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>

                  <input
                    className="input"
                    placeholder="Введите фамилию"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
                <div className="buttons-group">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => setStep(3)}
                  >
                    Продолжить
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
              {error &&
                Object.keys(error).map((key) => (
                  <p className="error" key={key}>
                    {error[key]}
                  </p>
                ))}
            </div>
          )}

          {step === 3 && (
            <div className="card">
              <p>Шаг {step - 1} из 3</p>
              <h1>Введите название компании</h1>
              <form className="form">
                <div className="inputs-group">
                  <input
                    className="input"
                    placeholder="Название компании"
                    value={company_name}
                    onChange={(e) => setCompanyName(e.target.value)}
                  ></input>

                  <textarea
                    className="input"
                    placeholder="Описание"
                    value={company_description}
                    rows={"5"}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                  ></textarea>

                  <input
                    className="input"
                    placeholder="Адрес"
                    value={company_address}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  ></input>

                  <input
                    className="input"
                    type="file"
                    placeholder="Логотип компании"
                    onChange={(e) => setCompanyLogo(e.target.files[0])}
                  ></input>
                </div>
                <div className="buttons-group">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => setStep(4)}
                  >
                    Продолжить
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
              {error &&
                Object.keys(error).map((key) => (
                  <p className="error" key={key}>
                    {error[key]}
                  </p>
                ))}
            </div>
          )}

          {step === 4 && (
            <div className="card">
              <p>Шаг {step - 1} из 3</p>
              <h1>Введите пароль</h1>
              <form className="form">
                <div className="inputs-group">
                  <input
                    className="input"
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>

                  <input
                    className="input"
                    type="password"
                    placeholder="Повторите пароль"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  ></input>
                </div>
                <div className="buttons-group">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={handleSignUp}
                  >
                    Зарегистрироваться
                  </button>
                  <button
                    type="button"
                    className="button button-primary-bordered"
                    onClick={() => setStep(3)}
                  >
                    Назад
                  </button>
                </div>
              </form>
              {error &&
                Object.keys(error).map((key) => (
                  <p className="error" key={key}>
                    {error[key]}
                  </p>
                ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
