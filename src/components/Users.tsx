import React from "react";
import Container from "./UI/Container";
import "../styles/Users.sass";
import { useGetUsersQuery } from "../features/users/usersApiSlice";
import Button from "./UI/Button";
import { useSelector, useDispatch } from "react-redux";
import { addUsers, getAllUsers } from "../features/users/usersSlice";
import Loader from "./UI/Loader";
import { nanoid } from "@reduxjs/toolkit";
import { formattedValue } from "../util/formattedValue";
import { Tooltip } from "@mui/material";

const Users = () => {
  const [page, setPage] = React.useState(1);
  const users = useSelector(getAllUsers);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetUsersQuery(page);

  React.useEffect(() => {
    if (data) {
      dispatch(addUsers(data.users));
    }
  }, [data, dispatch]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="users">
      <Container paddings>
        <div className="users__inner">
          {isError && <div className="users__error">Error</div>}
          <h1 className="users__title">Working with GET request</h1>
          <ul className="users__list">
            {users.map(({ position, name, email, phone, photo }) => (
              <li key={nanoid()} className="users__item">
                <img src={photo ? photo : "/images/noAvatar.svg"} alt="avatar" />
                <Tooltip title={name} followCursor>
                  <p className="users__item-name">{formattedValue(name)}</p>
                </Tooltip>
                <Tooltip title={name} followCursor>
                  <p className="users__item-position">{formattedValue(position)}</p>
                </Tooltip>
                <Tooltip title={name} followCursor>
                  <p className="users__item-email">{formattedValue(email)}</p>
                </Tooltip>
                <Tooltip title={name} followCursor>
                  <p className="users__item-phone">{formattedValue(phone)}</p>
                </Tooltip>
              </li>
            ))}
          </ul>
          {isLoading && <Loader />}
          {data?.total_pages === page || (
            <Button onClick={handleNextPage} className="users__btn" label="Show More" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Users;
