import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";

function NavLinkMenu() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className="left-navlink">
      <ul
        className={mobileMenu ? "nav-links-mobile" : "link f_flex capitalize"}
        onClick={() => setMobileMenu(false)}
      >
        {/* <li>
          <NavLink to="/">home</NavLink>
        </li> */}
        <li>
          <NavLink to="/createNewProduct">Nouvelle annonce</NavLink>
        </li>
        <li>
          <NavLink to="/productList">Produits</NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <a onClick={logOutUser}>Logout</a>
            </li>
            <li>
              <NavLink to="/user">
                {/* <i className="fa fa-user icon-circle"></i> */}
                Hi, {user?.email} !!!
              </NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}
      </ul>

      <button className="toggle" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? (
          <i className="fas fa-times close home-btn"></i>
        ) : (
          <i className="fas fa-bars open"></i>
        )}
      </button>
    </div>
  );
}

export default NavLinkMenu;
