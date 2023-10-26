import React, { useEffect } from "react";
import UserDetail from "./UserDetail";
import UserProductsFavourite from "./UserProductsFavourite";
import UserProductsToSell from "./UserProductsToSell";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../../redux/actions/UserAction";
import Header from "../../../common/header/Header";

function UserPage() {
  const { userId } = useParams();
  const userDetail = useSelector((state) => state.userReducer.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetail(userId));
  }, [userId]);

  return (
    <>
      <Header />
      <div className="container-user-page">
        <UserDetail userDetail={userDetail} />
        <UserProductsFavourite userDetail={userDetail} />
        <UserProductsToSell userDetail={userDetail} />
      </div>
    </>
  );
}

export default UserPage;
