import FoundVacancy from "./foundVacancy";
import { useSelector } from "react-redux";

export default function FoundVacancies() {
  const vacancies = useSelector((state) => state.vacancy.vacancies);

  const showVacancies = vacancies.map((item) => (
    <FoundVacancy key={item.id} item={item} />
  ));

  return <div>{showVacancies}</div>;
}
