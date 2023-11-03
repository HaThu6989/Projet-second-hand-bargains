import React from "react";
import { useDispatch } from "react-redux";
import { getUserDetail, updateUser } from "../../../redux/actions/UserAction";

function IsFavourite(props) {
  const { userDetail, isFavourite, productSelected } = props;
  const dispatch = useDispatch();

  // Add/remove from favorite list
  const toggleFavorite = (productClicked) => {
    if (
      userDetail?.favouriteProducts?.some(
        (elm) => elm._id === productClicked?._id
      )
    ) {
      const updatedFavoritesProducts = userDetail?.favouriteProducts?.filter(
        (elm) => elm?._id !== productClicked?._id
      );

      const request = {
        favouriteProducts: updatedFavoritesProducts,
      };
      dispatch(updateUser(userDetail?._id, request));
      dispatch(getUserDetail(userDetail?._id));
    } else {
      const request = {
        favouriteProducts: [...userDetail?.favouriteProducts, productClicked],
      };
      dispatch(updateUser(userDetail?._id, request));
      dispatch(getUserDetail(userDetail?._id));
    }
  };

  return (
    <button
      className={`${
        isFavourite ? "favourite remove-favourite" : "favourite add-favourite"
      }`}
      onClick={() => {
        toggleFavorite(productSelected);
      }}
    ></button>
  );
}

export default IsFavourite;
