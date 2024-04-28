import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import classes from "@/app/style/components/myApplyCard.module.css";
import { deleteApply } from "@/app/store/slices/applySlice";

import TrashIcon from "@/app/images/trash_icon.svg";
import Image from "next/image";

const StyledDeleteButton = styled.span`
  position: relative;
  color: red;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;

  width: 24px;
  height: 24px;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

export default function MyApplyCard({ item }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const dispatch = useDispatch();

  return (
    <div className={classes.my_apply}>
      <div className={classes.row}>
        <p className={classes.status}>{item.status}</p>
      </div>
      <div
        className={classes.row}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Link
          href={item && item.vacancy && `/vacancy/${item.vacancy.id}`}
          className={classes.link}
        >
          {item && item.vacancy && item.vacancy.name}
        </Link>
      </div>
      <div className={classes.row}>
        <p>{formatDate(item.createdAt)}</p>
      </div>

      <StyledDeleteButton onClick={() => dispatch(deleteApply(item.id))}>
        <Image src={TrashIcon} alt="trash-icon" />
      </StyledDeleteButton>
    </div>
  );
}
