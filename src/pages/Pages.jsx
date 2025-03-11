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
function Pages() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/cuisine/:type" element={<Cuisine />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:id" element={<Recipe />} /> {/* Corrected route parameter */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/addrecipes" element={<AddRecipes />} />
            </Routes>
        </AnimatePresence>
    );
}

export default Pages;