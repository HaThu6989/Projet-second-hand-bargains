import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../context/auth.context";
import {
  checkOwnerPage,
  getUserDetail,
} from "../../../redux/actions/UserAction";
import { getAllProducts } from "../../../redux/actions/ProductAction";

function NavLinkMenu({ allProducts }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  const dispatch = useDispatch();
  return (
    <div className="left-navlink">
      <ul
        className={mobileMenu ? "nav-links-mobile" : "link"}
        // className="link"
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
              dispatch(checkOwnerPage(user?._id));
            }}
          >
            Annonces
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
                onClick={() => {
                  return (
                    dispatch(getUserDetail(user?._id)) &&
                    dispatch(checkOwnerPage(user?._id))
                  );
                }}
              >
                Bonjour{" "}
                <span style={{ color: "#ff014f" }}>
                  {user?.username ? user?.username : user?.email.toLowerCase()}
                </span>
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
          <i className="fas fa-times close"></i>
        ) : (
          <i className="fas fa-bars open"></i>
        )}
      </button>
    </div>
  );
}

export default NavLinkMenu;
