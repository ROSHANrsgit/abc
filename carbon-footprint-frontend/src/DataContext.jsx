import React, { createContext, useState } from 'react';

// Create a Context
export const GlobalStateContext = createContext();

// Create a Provider Component
export const GlobalStateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    address: ''
  });

  return (
    <GlobalStateContext.Provider value={{ formData, setFormData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
