// import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./screen/Home";
import Login from "./screen/Login";
import Signup from "./screen/Signup";
import Footer from "./Components/Footer";

import { ContextReducer } from "./Components/ContextReducer";
import Cart from "./screen/Cart";
import Myorder from "./screen/Myorder"


export default function App() {
  return (
    <>
      <ContextReducer>
        <Navbar />
        <div className="container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/myorder" element={<Myorder />} />
          </Routes>
        </div>
        <Footer />
      </ContextReducer>
    </>
  );
}
