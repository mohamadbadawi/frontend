import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 import
import './index.css'; // Global styles
import App from './App'; // The main App component

// Create the root for rendering the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component into the root
root.render(
  <App />
);
