import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/header/Header";
import HomePage from "./components/homepage/HomePage";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
import CreateNewProduct from "./components/product/CRUD/CreateNewProduct";
import ProductList from "./components/product/ProductList";
import UserPage from "./components/user/UserProfile/UserPage";
import UpdateUser from "./components/user/CRUD/UpdateUser";
import { useSelector } from "react-redux";
import ProductDetail from "./components/product/ProductDetail";

function App() {
  const allProducts = useSelector((state) => state.productReducer.allProducts);

  console.log("allProducts", allProducts);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/productList"
            element={<ProductList allProducts={allProducts} />}
          />
          <Route path="/productList/:productId" element={<ProductDetail />} />
          <Route path="/:userId/page" element={<UserPage />} />
          <Route
            path="/:userId/createNewProduct"
            element={<CreateNewProduct />}
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
