import Apply from "./apply";

export default function VacancyApplies({ applies }) {
  const showVacancyApplies = applies.map((item) => (
    <Apply key={item.id} item={item} />
  ));

  return (
    <div>
      {showVacancyApplies.length === 0 && (
        <p style={{ textAlign: "center" }}>Пусто</p>
      )}
      {showVacancyApplies}
    </div>
  );
}
