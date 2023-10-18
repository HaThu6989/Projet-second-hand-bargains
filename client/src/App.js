import "./App.scss";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/header/Header";
import HomePage from "./components/homepage/HomePage";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
import CreateNewProduct from "./components/product/CRUD/CreateNewProduct";
import ProductList from "./components/product/ProductList";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createNewProduct" element={<CreateNewProduct />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
