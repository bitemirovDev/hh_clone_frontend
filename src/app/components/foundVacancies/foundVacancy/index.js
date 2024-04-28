import Link from "next/link";
import styled from "styled-components";

import { useSelector } from "react-redux";

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

export default function FoundVacancy({ item }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div className="resume card mtb15 gap10">
      <Link href={`/vacancy/${item.id}`} className="resume-pos">
        {item.name}
      </Link>

      <p>
        {item.salary_from} - {item.salary_to} {item.salary_type}
      </p>

      <p>{item.address}</p>

      {currentUser && currentUser.role.id === 1 && (
        <button
          className="button button-primary"
          style={{ width: "max-content" }}
        >
          <Link href={`/vacancy/${item.id}`}>Откликнуться</Link>
        </button>
      )}
    </div>
  );
}
