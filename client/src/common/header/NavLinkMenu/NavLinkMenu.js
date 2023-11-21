import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../context/auth.context";
import {
  checkOwnerPage,
  getAllUsers,
  getUserDetail,
} from "../../../redux/actions/UserAction";
import { getAllProducts } from "../../../redux/actions/ProductAction";

function NavLinkMenu() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, isLoggedIn, logOutUser, admin } = useContext(AuthContext);

  const dispatch = useDispatch();
  return (
    <div className="left-navlink">
      <ul
        className={mobileMenu ? "nav-links-mobile" : "link"}
        onClick={() => setMobileMenu(false)}
      >
        {isLoggedIn && (
          <li>
            <Link to={`/${user?._id}/createNewProduct`}>Nouvelle annonce</Link>
          </li>
        )}
        {admin && (
          <li>
            <Link
              to={`/userList`}
              onClick={() => {
                console.log("admin?._id", admin?._id);
                dispatch(getAllUsers(admin?._id));
              }}
            >
              Utilisateurs
            </Link>
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
                className="link-userprofile"
                to={`/${user?._id}/page`}
                onClick={() => {
                  return (
                    dispatch(getUserDetail(user?._id)) &&
                    dispatch(checkOwnerPage(user?._id))
                  );
                }}
              >
                <div
                  className="text-ellipsis-card"
                  style={{ color: "#ff014f" }}
                >
                  {user?.username || user?.email}
                </div>
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
