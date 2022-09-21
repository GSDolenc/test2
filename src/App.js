import React from 'react';
import { BrowserRouter } from 'react-router-dom';


import AppRoutes from './AppRoutes';

import './style.css';

const App = () => (
  <BrowserRouter>
  <div className='boyd'>
    <div className='App'>
     <AppRoutes />
    </div>
    </div>
  </BrowserRouter>
);
  
export default App;
