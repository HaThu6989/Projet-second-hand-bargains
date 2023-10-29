import React from "react";
import { useDispatch } from "react-redux";
import { getUserDetail, updateUser } from "../../redux/actions/UserAction";

function IsFavourite(props) {
  const { user, userDetail, isFavourite, productSelected } = props;
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
      dispatch(updateUser(user?._id, request));
      dispatch(getUserDetail(user?._id));
    } else {
      const request = {
        favouriteProducts: [...userDetail?.favouriteProducts, productClicked],
      };
      dispatch(updateUser(user?._id, request));
      dispatch(getUserDetail(user?._id));
    }
  };

  return (
    <button
      className={`${isFavourite ? "remove-favourite" : "add-favourite"}`}
      onClick={() => {
        toggleFavorite(productSelected);
      }}
    ></button>
  );
}

export default IsFavourite;
