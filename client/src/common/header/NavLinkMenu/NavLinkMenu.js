import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../context/auth.context";
import { getUserDetail } from "../../../redux/actions/UserAction";
import { getAllProducts } from "../../../redux/actions/ProductAction";

function NavLinkMenu() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  return (
    <div className="left-navlink">
      <ul
        className={mobileMenu ? "nav-links-mobile" : "link f_flex capitalize"}
        onClick={() => setMobileMenu(false)}
      >
        {isLoggedIn && (
          <li>
            <Link to={`/${user?._id}/createNewProduct`}>Nouvelle annonce</Link>
          </li>
        )}

        <li>
          <Link
            to="/productList"
            onClick={() => {
              dispatch(getAllProducts());
              user && dispatch(getUserDetail(user?._id));
            }}
          >
            Produits
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/" onClick={logOutUser}>
                Logout
              </Link>
            </li>
            <li>
              <Link
                to={`/${user?._id}/page`}
                onClick={() => dispatch(getUserDetail(user?._id))}
              >
                Votre compte
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
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
