import React from "react";
import Button from "./UI/Button";
import Container from "./UI/Container";
import "../styles/Header.sass";

const Header = () => {
  return (
    <header className="header">
      <Container paddings>
        <div className="header__inner">
          <a className="header__logo" href="/">
            <img src="./images/Logo.svg" alt="logo" />
          </a>
          <div className="header__box">
            <Button label="Users" />
            <Button label="Sign up" />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
