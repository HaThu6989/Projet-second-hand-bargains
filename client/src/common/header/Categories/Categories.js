import React from "react";
import bookIcon from "../../../assets/images/category-icon/bookIcon.png";
import childrenIcon from "../../../assets/images/category-icon/childrenIcon.png";
import dressIcon from "../../../assets/images/category-icon/dressIcon.png";
import electroIcon from "../../../assets/images/category-icon/electroIcon.png";
import instrumentIcon from "../../../assets/images/category-icon/instrumentIcon.png";
import tableIcon from "../../../assets/images/category-icon/tableIcon.png";
import otherIcon from "../../../assets/images/category-icon/otherIcon.png";

const Categories = () => {
  const data = [
    {
      cateImg: electroIcon,
      cateName: "Electronic",
    },
    // {
    //   cateImg: instrumentIcon,
    //   cateName: "Musique",
    // },
    {
      cateImg: dressIcon,
      cateName: "Vêtements",
    },
    {
      cateImg: childrenIcon,
      cateName: "Enfants",
    },
    {
      cateImg: bookIcon,
      cateName: "Livres",
    },
    {
      cateImg: tableIcon,
      cateName: "Ameublement",
    },
    {
      cateImg: otherIcon,
      cateName: "Autres",
    },
  ];

  return (
    <>
      <div className="category-list">
        {data.map((value, index) => {
          return (
            <div className="box f_flex" key={index}>
              <img src={value.cateImg} alt="" />
              <span>{value.cateName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
