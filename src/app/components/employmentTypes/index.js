import { useEffect, useState } from "react";
import { END_POINT } from "@/config/end-point";
import axios from "axios";
import SelectEmploymentTypes from "../selectEmploymentTypes";

export default function EmploymentTypes({ setNewResume }) {
  const [allEmployment_types, setAllEmploymentTypes] = useState([]);
  const [employment_types, setEmploymentTypes] = useState([]);

  useEffect(() => {
    axios.get(`${END_POINT}/api/employment-types`).then((res) => {
      setAllEmploymentTypes(res.data);
    });
  }, []);

  useEffect(() => {
    setNewResume((prevState) => ({
      ...prevState,
      employment_types,
    }));
  }, [employment_types, setNewResume]);

  return (
    <div className="create_resume_block">
      <h3>Другая важная информация</h3>
      <div>
        <SelectEmploymentTypes
          label="Занятость"
          size="fieldset-md"
          onChange={(emps) => setEmploymentTypes(emps)}
          allEmploymentTypes={allEmployment_types}
          employmentTypes={employment_types}
        />
      </div>
    </div>
  );
}
