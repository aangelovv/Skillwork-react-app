// import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Catalog from "./components/Catalog/Catalog";
import Register from "./components/Register/Register";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateProject from "./components/CreateProject/CreateProject";

function NotFound() {
  return <h1>404 Not Found</h1>;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/create" element={<CreateProject />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
