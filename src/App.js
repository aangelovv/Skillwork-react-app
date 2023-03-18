// // import hi from "./hi.png";
// // import { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Catalog from "./components/Catalog/Catalog";
import Register from "./components/Register/Register";
import "./App.css";

// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={hi} className="App-logo" alt="logo" />
//     //     <p>I love my bunny.</p>
//     //   </header>
//     // </div>
//     <div className="App">
//       <Header />

//       <main>
//         <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/login" element={<Login />} />
// <Route path="/register" element={<Register />} />
// <Route path="/logout" element={<Logout />} />
// <Route path="/catalog" element={<Catalog />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateProject from "./components/CreateProject/CreateProject";

// function Home() {
//   return <h1>Welcome to the homepage!</h1>;
// }

// function About() {
//   return <h1>About us</h1>;
// }

function NotFound() {
  return <h1>404 Not Found</h1>;
}

const App = () => {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav> */}
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
  );
};

export default App;
