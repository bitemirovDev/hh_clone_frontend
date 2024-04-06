"use client";

// import Header from "./components/header";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("./components/header/index"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Header />
    </main>
  );
}
