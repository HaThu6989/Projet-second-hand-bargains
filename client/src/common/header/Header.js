import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import Categories from "./Categories/Categories";
import Search from "./Search/Search";
import NavLinkMenu from "./NavLinkMenu/NavLinkMenu";
import { Link } from "react-router-dom";

function Header() {
  const [openCategoriesList, setOpenCategoriesList] = useState(false);

  return (
    <>
      <header className="header d_flex">
        <div className="right">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="categories-box">
            <span className="fa-solid fa-border-all"></span>
            <h4>Categories</h4>
            <button onClick={() => setOpenCategoriesList(!openCategoriesList)}>
              <i className="fa fa-chevron-down"></i>
            </button>
          </div>

          <Search />
        </div>
        <NavLinkMenu />
        {openCategoriesList && <Categories />}
      </header>
    </>
  );
}

export default Header;
