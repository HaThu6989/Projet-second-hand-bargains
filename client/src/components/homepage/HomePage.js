import React from "react";
import Slider from "./Slide/Slider";
import Carts from "./CartsCategory/CartsCategory";
import Slogan from "./Slogan/Slogan";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/Header";

function HomePage() {
  return (
    <div className="container-homepage">
      <Slogan />
      <Slider />
      <Carts />
      <Footer />
    </div>
  );
}

export default HomePage;
