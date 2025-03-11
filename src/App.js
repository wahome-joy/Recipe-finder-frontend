import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import styled from "styled-components";
import Navbar from "./components/Navbar";


const LogoImage = styled.img`
  width: 100px;
  height: auto;
  margin: 20px;
  text-align: center;
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       

        {/* Navigation Links */}
        {/* <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav> */}
        <Navbar />

        {/* Main Content */}
        

        {/* Other Components */}
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
