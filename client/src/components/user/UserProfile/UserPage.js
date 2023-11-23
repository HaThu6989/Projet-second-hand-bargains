import React, { useContext, useEffect } from "react";
import UserDetail from "./UserDetail";
import UserProductsToSell from "./UserProductsToSell";
import UserProductsFavourite from "./UserProductsFavourite";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkOwnerPage,
  getUserDetail,
} from "../../../redux/actions/UserAction";
import { AuthContext } from "../../../context/auth.context";

function UserPage() {
  const { userId } = useParams();
  const { setUser, user } = useContext(AuthContext);
  const userDetail = useSelector((state) => state.userReducer.userDetail);
  const dispatch = useDispatch();
  const isOwnerPage = useSelector((state) => state.userReducer.isOwnerPage);
  const allProducts = useSelector((state) => state.productReducer.allProducts);

  const productsOfOneUser = allProducts?.filter(
    (elm) => elm?.seller === userId
  );

  useEffect(() => {
    dispatch(checkOwnerPage(userId));
    dispatch(getUserDetail(userId));
  }, [userId]);

  // Update user in AuthContext after userDetail === user is updated
  useEffect(() => {
    if (user?._id === userDetail?._id) {
      setUser(userDetail);
    }
  }, [userDetail]);

  useEffect(() => {
    dispatch(getUserDetail(userId));
  }, [allProducts]);

  return (
    <div className="container-user-page">
      <UserDetail userDetail={userDetail} isOwnerPage={isOwnerPage} />
      <UserProductsFavourite
        userDetail={userDetail}
        isOwnerPage={isOwnerPage}
      />
      <UserProductsToSell
        userDetail={userDetail}
        productsOfOneUser={productsOfOneUser}
        isOwnerPage={isOwnerPage}
      />
    </div>
  );
}

export default UserPage;
