import React from "react";
import { Link } from "react-router-dom";
import bookIcon from "../../../assets/category-icon/bookIcon.png";
import childrenIcon from "../../../assets/category-icon/childrenIcon.png";
import dressIcon from "../../../assets/category-icon/dressIcon.png";
import electroIcon from "../../../assets/category-icon/electroIcon.png";
import tableIcon from "../../../assets/category-icon/tableIcon.png";
import otherIcon from "../../../assets/category-icon/otherIcon.png";
import categoriesData from "../../../common/data/category.json";

const Categories = ({ setOpenCategoriesList }) => {
  const images = {
    electromenager: electroIcon,
    vetements: dressIcon,
    enfants: childrenIcon,
    livres: bookIcon,
    ameublement: tableIcon,
    autres: otherIcon,
  };

  const { categories } = categoriesData;
  const categoriesWithImages = categories.map((category) => ({
    ...category,
    img: images[category.img],
  }));

  return (
    <>
      <div className="category-list">
        {categoriesWithImages.map((elm, index) => {
          return (
            <div key={index}>
              <Link
                className="box f_flex"
                to={`/productList?category=${elm.cateSearch}`}
                onClick={() => setOpenCategoriesList(false)}
              >
                <img src={elm.img} alt="" />
                <span>{elm.name}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
