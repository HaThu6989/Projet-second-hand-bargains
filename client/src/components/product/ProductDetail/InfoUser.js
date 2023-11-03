import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { checkOwnerPage } from "../../../redux/actions/UserAction";

function InfoUser(props) {
  const { productSelected } = props;
  const dispatch = useDispatch();

  return (
    <div className="info-seller-container">
      <div className="seller-slogan-username">
        <div className="seller-slogan">
          {productSelected?.seller.username.split("")[0]}
        </div>
        <div>
          <div className="seller-username">
            <Link
              to={`/${productSelected?.seller._id}/page`}
              onClick={() =>
                dispatch(checkOwnerPage(productSelected?.seller._id))
              }
            >
              {productSelected?.seller.username}
            </Link>
          </div>
          <div> {productSelected?.seller.ownerProducts.length} annonce(s)</div>
        </div>
      </div>

      <div className="contact-seller">
        <button>Contact</button>
      </div>
    </div>
  );
}

export default InfoUser;
