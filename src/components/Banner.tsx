import React from "react";
import "../styles/Banner.sass";
import Button from "./UI/Button";
import Container from "./UI/Container";

const Banner = () => {
  return (
    <section className="banner">
      <Container>
        <div className="banner__inner">
          <img src="./images/field.jpeg" alt="banner" />
          <div className="banner__content">
            <h1 className="banner__title">Test assignment for front-end developer</h1>
            <p className="banner__text">
              What defines a good front-end developer is one that has skilled knowledge of HTML,
              CSS, JS with a vast understanding of User design thinking as they'll be building web
              interfaces with accessibility in mind. They should also be excited to learn, as the
              world of Front-End Development keeps evolving.
            </p>
            <Button label="Sign Up" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
