import React from "react";

function InfoProduct(props) {
  const { productSelected } = props;

  const dateFormated = new Date(productSelected?.updatedAt)
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

  return (
    <div className="info-product-container ">
      <h2 className="text-ellipsis-table">{productSelected?.name}</h2>
      <div className="price">{productSelected?.price}€</div>
      <div className="date"> {dateFormated} </div>
    </div>
  );
}

export default InfoProduct;
