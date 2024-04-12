import MyVacancyCard from "./myVacancy";
import { useSelector } from "react-redux";

export default function MyVacancies() {
  const vacancies = useSelector((state) => state.vacancy.vacancies);

  const showVacancies = vacancies.map((item) => (
    <MyVacancyCard key={item.id} item={item} />
  ));

  return <div>{showVacancies}</div>;
}
