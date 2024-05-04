import Link from "next/link";
import { months3 } from "@/app/constants/constants";
import classes from "@/app/style/pages/vacancy-applies.module.css";
import { acceptApply, declineApply } from "@/app/store/slices/applySlice";
import { useDispatch } from "react-redux";

export default function Apply({ item }) {
  const dispatch = useDispatch();

  function getAge(resume) {
    const birthday = new Date(resume.birthday);
    let age = new Date().getTime() - birthday.getTime();
    const formattedAge = parseInt(age / (1000 * 60 * 60 * 24 * 365));

    return formattedAge;
  }

  const date = new Date(item.resume.createdAt);

  console.log(item);

  return (
    <div className={classes.apply}>
      <Link href={`/resumes/${item.resume.id}`} className="link">
        {item.resume.position}
      </Link>

      <div className={classes.fullname_salary}>
        <p>
          {item.resume.first_name} {item.resume.last_name},{" "}
          {`${getAge(item.resume)} лет`}
        </p>
        <p className={classes.salary}>
          {item.resume.salary} {item.resume.salary_type}
        </p>
      </div>
      <div className={classes.contact}>
        <p className={classes.gray_style}>Контакты</p>
        <p>{item.resume.phone}</p>
      </div>

      <p className={classes.gray_style} style={{ fontSize: "12px" }}>
        Откликнулся {date.getDate()} {months3[date.getMonth()]}{" "}
        {date.getFullYear()} года
      </p>

      <div className={classes.btns}>
        {item.status !== "INVITATION" && (
          <button
            className="button button-secondary button-secondary-bordered"
            onClick={() => dispatch(acceptApply(item.id))}
          >
            Пигласить
          </button>
        )}

        {item.status !== "DECLINED" && (
          <button
            className="button button-secondary button-secondary-bordered"
            onClick={() => dispatch(declineApply(item.id))}
          >
            Отказать
          </button>
        )}
      </div>
    </div>
  );
}
