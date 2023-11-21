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
    ?.toLowerCase();

  const firstLetterEmailSeller = product?.seller?.email
    ?.split("")[0]
    ?.toLowerCase();

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
        <Link
          to={`/productList/${product?._id}`}
          className="img-container have-img"
        >
          <img src={firstImageURL} />
        </Link>
      );
    } else {
      return (
        <Link
          to={`/productList/${product?._id}`}
          className="img-container no-img"
        >
          <img src={noPicture} />
        </Link>
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
          {firstLetterUsernameSeller?.toUpperCase() ||
            firstLetterEmailSeller?.toUpperCase() ||
            ".."}
        </div>
        <div className="seller-username">
          {user ? (
            <Link
              to={`/${product?.seller?._id}/page`}
              onClick={() => dispatch(checkOwnerPage(product?.seller?._id))}
            >
              <div className="text-ellipsis-card">
                {product?.seller?.username || product?.seller?.email}
              </div>
            </Link>
          ) : (
            <div className="text-ellipsis-card">
              {product?.seller?.username}
            </div>
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
            <div className="text-ellipsis-card">{product?.name}</div>
          </Link>
        ) : (
          <div className="text-ellipsis-card">{product?.name}</div>
        )}
      </div>
      <div className="price text-ellipsis-card">{product?.price}€</div>
      <div className="date text-ellipsis-card">{dateFormated}</div>
    </div>
  );
}

export default ProductCart;
