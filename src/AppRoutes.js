import React from 'react';
import { Route, Routes  } from 'react-router-dom';

import Home from './pages/home';
import Cadratra from './pages/cadastro';
import Edit from './pages/edit';

const AppRoutes = () => (
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadratra/>} />
        <Route path="/edit/:id" element={<Edit/>} />
    </Routes>
);

export default AppRoutes;