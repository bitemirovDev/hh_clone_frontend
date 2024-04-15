"use client";

// next
import Link from "next/link";
import Image from "next/image";

// images and icons
import Logo from "@/app/images/hh_kz.svg";
import SearchIcon from "@/app/images/search_icon.svg";

// redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/slices/authSlice";

export default function Header() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header_inner">
          <div>
            <Link href="/">
              <Image src={Logo} alt="hh_logo" />
            </Link>
            {currentUser && currentUser.role && currentUser.role.id === 2 && (
              <Link href="/vacancy">Мои вакансии</Link>
            )}
            {currentUser && currentUser.role && currentUser.role.id === 1 && (
              <Link href="/resumes">Мои резюме</Link>
            )}
            <a>Помощь</a>
          </div>
          <div>
            <button className="header_search">
              <Image src={SearchIcon} alt="magnifying_glass" />
              Поиск
            </button>
            <button className="button_green header_button">
              {currentUser && currentUser.role && currentUser.role.id === 2 && (
                <Link href="/create-vacancy">Создать вакансию</Link>
              )}
              {currentUser && currentUser.role && currentUser.role.id === 1 && (
                <Link href="/create-resume">Создать резюме</Link>
              )}
            </button>

            <button className="header_button">
              {isAuth ? (
                <a onClick={() => dispatch(logout())}>Выйти</a>
              ) : (
                <Link href="/login">Войти</Link>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
