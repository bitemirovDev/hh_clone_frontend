"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyApplies from "../components/myapplies";
import { getEmployeeAplies } from "../store/slices/applySlice";
import Image from "next/image";
import ArrowDownIcon from "@/app/images/arrow-down-solid.svg";

import styled from "styled-components";

const TableTitle = styled.p`
  width: 25%;
  color: #a4a6a8;
  font-size: 14px;
  position: relative;
  cursor: pointer;

  &:nth-child(2) {
    width: calc(50% - 16px);

    & img {
      width: 12px;
      height: 12px;
      position: absolute;
      top: 50%;
      right: 85%;
      transform: translate(-50%, -50%);

      &.rotate {
        transform: translate(-50%, -50%) rotate(180deg);
      }
    }
  }

  & img {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    right: 75%;
    transform: translate(-50%, -50%);

    &.rotate {
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }
`;

const Header = dynamic(() => import("@/app/components/header/index"), {
  ssr: false,
});

export default function Applies() {
  const dispatch = useDispatch();
  const applies = useSelector((state) => state.apply.applies);

  const [sortKey, setSortKey] = useState("status");
  const [sortDirection, setSortDirection] = useState("asc");

  const didMount = () => {
    dispatch(getEmployeeAplies());
  };

  let sortedApplies = [];

  if (applies.length > 0) {
    sortedApplies = [...applies].sort((a, b) => {
      let aPart, bPart;
      if (sortKey === "status") {
        aPart = a.status;
        bPart = b.status;
      } else if (sortKey === "vacancy") {
        aPart = a.vacancy.name;
        bPart = b.vacancy.name;
      } else if (sortKey === "updatedAt") {
        aPart = a.updatedAt;
        bPart = b.updatedAt;
      }

      if (sortDirection === "asc") {
        if (aPart < bPart) return -1;
        if (bPart > bPart) return 1;
      } else {
        if (aPart > bPart) return -1;
        if (bPart < bPart) return 1;
      }

      return 0;
    });
  }

  const sortBy = (key) => {
    if (sortKey === key) {
      sortDirection === "asc"
        ? setSortDirection("desc")
        : setSortDirection("asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  useEffect(didMount, []);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="d-flex jc-sb ai-c ptb20">
          <h1 className="mb0">Отклики и приглашения</h1>
        </div>

        <div style={{ display: "flex", padding: "15px 20px" }}>
          <TableTitle onClick={() => sortBy("status")}>
            Статус{" "}
            {sortKey && sortKey === "status" && (
              <Image
                src={ArrowDownIcon}
                alt="arrow-down-icon"
                className={sortDirection !== "asc" && "rotate"}
              />
            )}
          </TableTitle>
          <TableTitle onClick={() => sortBy("vacancy")}>
            Вакансия{" "}
            {sortKey && sortKey === "vacancy" && (
              <Image
                src={ArrowDownIcon}
                alt="arrow-down-icon"
                className={sortDirection !== "asc" && "rotate"}
              />
            )}
          </TableTitle>
          <TableTitle onClick={() => sortBy("updatedAt")}>
            Дата{" "}
            {sortKey && sortKey === "updatedAt" && (
              <Image
                src={ArrowDownIcon}
                alt="arrow-down-icon"
                className={sortDirection !== "asc" && "rotate"}
              />
            )}
          </TableTitle>
        </div>

        <MyApplies applies={sortedApplies} />
      </div>
    </main>
  );
}
