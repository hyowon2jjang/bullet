// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App.js 컴포넌트를 가져옴

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);