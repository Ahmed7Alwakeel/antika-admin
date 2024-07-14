import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IAuthContextValues } from "../../modules/auth/types/Interfaces";
import { logout, removeCookies } from "../../modules/auth/API/api";
import { useDispatch } from "react-redux";
import { handleUnAuthenticated } from "../../modules/auth/store/redux/authData";

export const authContext = createContext<IAuthContextValues>({ handleLogout: () => {} });

interface prop {
  children: React.ReactNode;
}


export default function AuthProvider({ children }: prop) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    logout().then(res => {
      removeCookies()
      dispatch(handleUnAuthenticated());
      navigate("/auth/login");
    }).catch(err => {
      removeCookies()
      dispatch(handleUnAuthenticated());
      navigate("/auth/login");
    })
  }

  const value = {
    handleLogout
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
