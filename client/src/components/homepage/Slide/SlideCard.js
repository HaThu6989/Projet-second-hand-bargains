import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import noPicture from "../../../assets/products/no-picture.png";
import { Link } from "react-router-dom";

function SlideCard() {
  const allProducts = useSelector((state) => state.productReducer.allProducts);

  const productsToRender = allProducts
    .sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    .slice(0, 3);

  console.log("productsToRender", productsToRender);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "-10px" }}>{dots}</ul>;
    },
  };

  const getFirstImage = (productDescription) => {
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
    <>
      <Slider {...settings}>
        {productsToRender.map((product, index) => {
          return (
            <>
              <div className="slide" key={index}>
                <div className="left">
                  <p className="title-new">Nouvelle annonce</p>
                  <p className="title-product">{product.name}</p>
                  <Link to={`/productList/${product._id}`}>En détail</Link>
                </div>
                {getFirstImage(product?.description)}
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
}

export default SlideCard;
