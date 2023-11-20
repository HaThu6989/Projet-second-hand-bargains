import React, { useContext } from "react";
import { Link } from "react-router-dom";
import IsFavourite from "./IsFavourite";
import noPicture from "../../../assets/products/no-picture.png";
import colorsData from "./ColorsFirstLetterUsername.json";
import { AuthContext } from "../../../context/auth.context";
import { useDispatch } from "react-redux";
import { checkOwnerPage } from "../../../redux/actions/UserAction";

function ProductCart(props) {
  const { user } = useContext(AuthContext);
  const { userDetail, product, isFavourite } = props;
  const dispatch = useDispatch();

  const dateFormated = new Date(product?.updatedAt)
    .toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      millisecond: "3-digit",
      timeZoneName: "short",
    })
    .split("à")[0];

  const firstLetterUsernameSeller = product?.seller?.username
    ?.split("")[0]
    .toLowerCase();

  const getFirstImage = (productDescription) => {
    // Sử dụng DOMParser để phân tích chuỗi HTML
    const descriptionHTML = new DOMParser().parseFromString(
      productDescription,
      "text/html"
    );

    const imagesInDescriptionHTML = descriptionHTML.querySelectorAll("img");

    if (imagesInDescriptionHTML.length > 0) {
      const firstImageURL = imagesInDescriptionHTML[0].getAttribute("src");
      return (
        <div className="img-container have-img">
          <img src={firstImageURL} />
        </div>
      );
    } else {
      return (
        <div className="img-container no-img">
          <img src={noPicture} />
        </div>
      );
    }
  };

  return (
    <div key={product?._id} className="product-cart">
      <div className="seller-slogan-username-productList">
        <div
          className="seller-slogan"
          style={{
            backgroundColor:
              colorsData.colors[firstLetterUsernameSeller] ||
              "rgb(136, 198, 158)",
          }}
        >
          {firstLetterUsernameSeller?.toUpperCase() || ".."}
        </div>
        <div className="seller-username text-ellipsis">
          {user ? (
            <Link
              to={`/${product?.seller?._id}/page`}
              onClick={() => dispatch(checkOwnerPage(product?.seller?._id))}
            >
              {product?.seller?.username}
            </Link>
          ) : (
            product?.seller?.username
          )}
        </div>
      </div>

      {user?._id && (
        <IsFavourite
          userDetail={userDetail}
          isFavourite={isFavourite}
          productSelected={product}
        />
      )}

      {getFirstImage(product?.description)}
      <div className="title">
        {user ? (
          <Link to={`/productList/${product?._id}`}>
            <div className="text-ellipsis">{product?.name}</div>
          </Link>
        ) : (
          product?.name
        )}
      </div>
      <div className="price text-ellipsis">{product?.price}€</div>
      <div className="date text-ellipsis">{dateFormated}</div>
    </div>
  );
}

export default ProductCart;
