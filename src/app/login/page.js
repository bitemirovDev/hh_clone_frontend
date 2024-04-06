"use client";

// import Header from "@/app/components/header/index";
import UserLogin from "../components/auth/user";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/header/index"), {
  ssr: false,
});

export default function Login() {
  return (
    <main>
      <Header />
      <UserLogin />
    </main>
  );
}
