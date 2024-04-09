import Link from "next/link";
import styled from "styled-components";

import { deleteMyResume } from "@/app/store/slices/resumeSlice";
import { useDispatch } from "react-redux";

const StyledDeleteButton = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  color: red;
  cursor: pointer;
  padding: 3px 6px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  transition: 0.3s;

  &:hover {
    background: red;
    color: #fff;
  }
`;

export default function MyResumeCard({ item }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const dispatch = useDispatch();

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

      <StyledDeleteButton
        className="delete_resume"
        onClick={() => dispatch(deleteMyResume(item.id))}
      >
        Удалить резюме
      </StyledDeleteButton>
    </div>
  );
}
