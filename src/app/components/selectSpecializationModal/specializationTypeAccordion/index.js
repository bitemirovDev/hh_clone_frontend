"use client";

import classes from "@/app/style/components/specializationTypeAccordion.module.css";
import { useEffect, useState } from "react";
import SpecializationRadio from "./specializationRadio";

export default function SpecializationTypeAccordion({
  specType,
  onChange,
  value,
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    specType.specializations.map((spec) =>
      spec.id == value ? setActive(true) : null
    );
  }, []);

  return (
    <div
      className={`${classes.accordion}${active ? ` ${classes.active}` : ""}`}
    >
      <button
        className={classes.accordion_btn}
        onClick={() => setActive(!active)}
      >
        {specType.name}
      </button>
      <div className={classes.accordion_content}>
        {specType.specializations.map((spec) => (
          <SpecializationRadio
            onChange={onChange}
            key={spec.id}
            specialization={spec}
            value={value}
          ></SpecializationRadio>
        ))}
      </div>
    </div>
  );
}
