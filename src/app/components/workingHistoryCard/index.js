import classes from "@/app/style/components/workingHistoryCard.module.css";
import Image from "next/image";

// images & icons
import TrashIcon from "@/app/images/trash_icon.svg";

// months array
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default function WorkingHistoryCard({ workingHistory, remove }) {
  const startDate = new Date(workingHistory.start_date);
  const startDateMonth = months[startDate.getMonth()].toLowerCase();
  const startDateYear = startDate.getFullYear();

  const endDate = new Date(workingHistory.end_date);
  const endDateMonth = months[endDate.getMonth()].toLowerCase();
  const endDateYear = endDate.getFullYear();

  return (
    <div className={classes.card}>
      <p className={classes.dates}>
        {`${startDateMonth} ${startDateYear}`} -{" "}
        {`${endDateMonth} ${endDateYear}`}
      </p>
      <h5>{workingHistory.company_name}</h5>
      <p>{workingHistory.company_description}</p>

      <button
        className={classes.reset_btn}
        onClick={() => remove(workingHistory)}
      >
        <Image src={TrashIcon} alt="trash_icon"></Image>
      </button>
    </div>
  );
}
