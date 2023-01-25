import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './state';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {global:globalReducer,},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Provider store = {store}>
        <Routes>
        <Route path="/" element={ <App /> } />
        </Routes>
      </Provider>
    </BrowserRouter>
      
  </React.StrictMode>
);

