import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { PetProvider } from './context/PetContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <PetProvider>
        <App />
      </PetProvider>
    </AuthProvider>
  </React.StrictMode>,
);
