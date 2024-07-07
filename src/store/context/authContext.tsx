import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IAuthContextValues, IUserData } from "../../modules/auth/types/Interfaces";
export const API_URL = "dummy";

export const authContext = createContext<IAuthContextValues>({});

interface prop {
	children: React.ReactNode;
}


export default function AuthProvider({ children }: prop) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData>({
    
  });
  const [currentUserType, setCurrentUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUnAuthenticated = (route : string) => {
    const cookies = Cookies.get();
    for (let cookie in cookies) {
      Cookies.remove(cookie);
    }
    setUserToken(null);
    setCurrentUserType(null);
    navigate(route || "/auth/login");
    console.log("unauthenticateddd");
  }

  const value = {
    userToken,
    setUserToken,
    userData,
    setUserData,
    setCurrentUserType,
    currentUserType,
    handleUnAuthenticated
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
