import React, { createContext, useState, useContext } from 'react';
// Crear el contexto de autenticación
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (username, token, refreshToken) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    //const token = `fake-token-${token}`;
    if(username == "admin@gmail.com"){ //contraseña : test12
      setAdmin(true)
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminRefresh', refreshToken);
    }
    localStorage.setItem('authToken', token);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setAdmin(false)
  };

  function verificacionLog(){
    const userToken = localStorage.getItem("authToken")
    if(userToken && userToken == "fake-token-admin@gmail.com"){
      setAdmin(true)
      return
    }if(userToken){
      setUser(userToken)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, admin, verificacionLog }}>
      {children}
    </AuthContext.Provider> );
}
export const useAuthContext = () => useContext(AuthContext);