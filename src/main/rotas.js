import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import FormularioSenha from "../pages/signupFormPassword";

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.min.css';
import '../App.css'
import '../custom.css'
import 'toastr/build/toastr.css'

const Rotas = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                *<Route path="/signupFormPassword" element={<FormularioSenha/>} />
            </Routes>
        </Router>
    );
};

export default Rotas;