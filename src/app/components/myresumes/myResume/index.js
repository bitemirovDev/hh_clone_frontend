import Link from "next/link";

export default function MyResumeCard({ item }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="resume card mtb15 gap10">
      <Link href={`/resumes/${item.id}`} className="resume-pos">
        {item.position}
      </Link>
      <p>Дата создания: {formatDate(item.createdAt)} </p>
      <div className="statistics">
        <h3>Статистика:</h3>
        <div className="statistics-links d-flex">
          <a href="#">{0} показов</a>
          <a href="#">{0} просмотров</a>
          <a href="#">{0} приглашений</a>
        </div>
      </div>
    </div>
  );
}
