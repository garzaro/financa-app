import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '../App.css'
import '../custom.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Rotas = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default Rotas;