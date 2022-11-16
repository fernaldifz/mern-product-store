import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar/Navbar"
import ProductDetail from "./components/Product/ProductDetail";
import ProductsList from "./components/Product/ProductsList";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-3 d-flex flex-column min-vh-100">
        <Routes>
          <Route exact path="/" element={<ProductsList />} />
          <Route path="/new_product" element={<AddProduct />} />
          <Route exact path="/product_detail/:id" element={<ProductDetail />} />
          <Route path="/product_detail/:id/edit" element={<EditProduct />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
