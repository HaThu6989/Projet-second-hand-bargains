import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./common/header/Header";
import HomePage from "./components/homepage/HomePage";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
import CreateNewProduct from "./components/product/CRUD/CreateNewProduct";
import ProductListPage from "./components/product/ProductList/ProductListPage";
import UserPage from "./components/user/UserProfile/UserPage";
import UpdateUser from "./components/user/CRUD/UpdateUser";
import ProductPage from "./components/product/ProductDetail/ProductPage";
import UpdateProduct from "./components/product/CRUD/UpdateProduct";
import { useEffect } from "react";
import { getAllProducts } from "./redux/actions/ProductAction";
import UserList from "./components/user/UserList/UserList";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const allProducts = useSelector((state) => state.productReducer.allProducts);

  return (
    <>
      <Router>
        <Header allProducts={allProducts} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/productList/:productId"
            element={<ProductPage allProducts={allProducts} />}
          />
          <Route
            path="/productList"
            element={<ProductListPage allProducts={allProducts} />}
          />
          <Route path="/userList" element={<UserList />} />
          <Route path="/:userId/page" element={<UserPage />} />
          <Route
            path="/:userId/createNewProduct"
            element={<CreateNewProduct />}
          />
          <Route
            path="/productList/:productId/update"
            element={<UpdateProduct />}
          />
          <Route path="/:userId/update" element={<UpdateUser />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
