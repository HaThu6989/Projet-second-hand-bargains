import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { checkOwnerPage } from "../../../redux/actions/UserAction";

function InfoUser(props) {
  const { productSelected } = props;
  const dispatch = useDispatch();

  const firstLetterUsernameSeller = productSelected?.seller?.username
    ?.split("")[0]
    ?.toLowerCase();

  const firstLetterEmailSeller = productSelected?.seller?.email
    ?.split("")[0]
    ?.toLowerCase();

  return (
    <div className="info-seller-container">
      <div className="seller-slogan-username">
        <div className="seller-slogan">
          {firstLetterUsernameSeller?.toUpperCase() ||
            firstLetterEmailSeller?.toUpperCase() ||
            ".."}
        </div>
        <div>
          <div className="seller-username">
            <Link
              to={`/${productSelected?.seller._id}/page`}
              onClick={() =>
                dispatch(checkOwnerPage(productSelected?.seller._id))
              }
            >
              <div className="text-ellipsis-card" style={{ width: "300px" }}>
                {productSelected?.seller?.username
                  ? productSelected?.seller?.username
                  : productSelected?.seller?.email}
              </div>
            </Link>
          </div>
          <div>
            {" "}
            {productSelected?.seller.ownerProducts.length}{" "}
            {productSelected?.seller.ownerProducts.length > 1
              ? "annonces"
              : "annonce"}{" "}
          </div>
        </div>
      </div>

      <div className="contact-seller">
        <button>Contact</button>
      </div>
    </div>
  );
}

export default InfoUser;
