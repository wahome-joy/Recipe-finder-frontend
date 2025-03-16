import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Register from '../components/Register';
import Login from '../components/Login';
import AddRecipes from '../components/AddRecipes';
function Pages({isLoggedIn,setIsLoggedIn}) {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/cuisine/:category" element={<Cuisine />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/login" element={isLoggedIn ? <Home />:<Login setIsLoggedIn={setIsLoggedIn}/>} /> 
                <Route path="/addrecipes" element={isLoggedIn ? <AddRecipes /> : < Login setIsLoggedIn={setIsLoggedIn}/>} />
            </Routes>
        </AnimatePresence>
    );
}

export default Pages;