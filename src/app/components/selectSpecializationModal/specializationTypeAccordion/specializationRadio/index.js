"use client";

import classes from "@/app/style/components/specializationRadio.module.css";
import { useState } from "react";

export default function SpecializationRadio({
  specialization,
  onChange,
  value,
}) {
  return (
    <div className={classes.specialization_radio}>
      <input
        className={classes.radio}
        onChange={onChange}
        type="radio"
        name="specialization"
        id={`spec-${specialization.id}`}
        value={specialization.id}
        checked={value == specialization.id ? true : false}
      ></input>

      <label htmlFor={`spec-${specialization.id}`}>{specialization.name}</label>
    </div>
  );
}
