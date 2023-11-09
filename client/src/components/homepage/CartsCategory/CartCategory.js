import React from "react";
import { Link } from "react-router-dom";
import books from "../../../assets/category/books.jpg";
import children from "../../../assets/category/children.jpg";
import dress from "../../../assets/category/dress.avif";
import electromenager from "../../../assets/category/electromenager.jpg";
import ameublement from "../../../assets/category/ameublement.avif";
import car from "../../../assets/category/car.avif";
import categoriesData from "../../../common/data/category.json";

const CartCategory = () => {
  const images = {
    electromenager: electromenager,
    vetements: dress,
    enfants: children,
    livres: books,
    ameublement: ameublement,
    autres: car,
  };

  const { categories } = categoriesData;
  const categoriesWithImages = categories.map((category) => ({
    ...category,
    img: images[category.img],
  }));

  return (
    <>
      <div className="box-cart-category">
        {categoriesWithImages.map((elm, index) => {
          return (
            <Link
              to={`/productList?category=${elm.cateSearch}`}
              style={{ backgroundImage: "url(" + elm.img + ")" }}
              className="box"
              key={index}
            >
              <div className="title-category">
                <h4>{elm.name}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CartCategory;
