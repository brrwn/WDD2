import React from "react";
import Button from "./Button";
import "./Hero.css";

export default function Hero({ title, description, buttontext, onButtonClick }) {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      scrollToProducts();
    }
  };

  return (
    <div>
      <section className="hero-container">
        <div className="hero-content">
          <h1>{title}</h1>
          <p>{description}</p>
          <Button variant="primary" type="button" onClick={handleClick}>
            {buttontext}
          </Button>
        </div>
      </section>
    </div>
  );
}
