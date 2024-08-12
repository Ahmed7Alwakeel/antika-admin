import { createContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleUnAuthenticated } from "../../modules/auth/store/redux/authData";
import { logout } from "../../modules/auth/API/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const authContext = createContext<any>({ handleLogout: () => { }, catchError: () => { } });

interface prop {
  children: React.ReactNode;
}


export default function AuthProvider({ children }: prop) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const removeCookies = () => {
    const cookies = Cookies.get()
    if (Cookies.get("token")) {
      for (let cookie in cookies) {
        Cookies.remove(cookie) // Remove each cookie
      }
    }
  }

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

  const catchError = (error: any, setLoading?: (loading: boolean) => void) => {
    if(error){
      if (error?.response?.data?.code == 401 || error?.response?.data?.code == 403) {
        setLoading && setLoading(false)
        toast.error(error?.response?.data?.message || t("somethingWrong"))
        handleLogout()
        } else {
          setLoading && setLoading(false)
          toast.error(error?.response?.data?.message || t("somethingWrong"))
          handleLogout()
      }
    }
  }

  const value = {
    handleLogout,
    catchError
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
