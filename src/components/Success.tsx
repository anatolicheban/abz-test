import React from "react";
import Container from "./UI/Container";
import "../styles/Success.sass";

const Success = () => {
  return (
    <div className="success">
      <Container paddings>
        <div className="success__inner">
          <h2 className="success__title">User successfully registered</h2>
          <img src="./images/success-image.svg" alt="success" />
        </div>
      </Container>
    </div>
  );
};

export default Success;
