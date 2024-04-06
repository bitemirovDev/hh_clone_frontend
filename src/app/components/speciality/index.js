import { useState, useEffect } from "react";
import Fieldset from "../fieldset";
import InputWithSelect from "../inputWithSelect";

export default function Speciality({ setNewResume }) {
  const [salary, setSalary] = useState(null);
  const [salary_type, setSalaryType] = useState("KZT");
  const [position, setPosition] = useState("");

  useEffect(() => {
    // Обновление объекта newResume при изменении значений инпутов
    setNewResume((prevState) => ({
      ...prevState,
      position,
      salary,
      salary_type,
    }));
  }, [position, salary, salary_type, setNewResume]);

  return (
    <div className="create_resume_block">
      <h3>Специальность</h3>
      <div>
        <Fieldset
          type="text"
          label="Желаемая должность"
          size="fieldset-lg"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <InputWithSelect
          size="fieldset-sm"
          label="Зарплата"
          setSalary={setSalary}
          setSalaryType={setSalaryType}
        />
      </div>
    </div>
  );
}
