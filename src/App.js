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
import Parse from "parse/dist/parse.min.js";
import Details from "./components/Details/Details";

function NotFound() {
  return <h1>404 Not Found</h1>;
}

const PARSE_APPLICATION_ID = "l6kPqgl0vczfSwTUi6wmlW0K7yrnHP6LupC5vSJT";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "zzZWt7MQOPzFb7syzRnkbpV80bcoFr8TyY4ekzlo";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

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
          <Route path="/project/:projectId" element={<Details />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
