import Cookies from "js-cookie"
import { axiosInstance } from "../../../config/axiosConfig"

interface ILoginRequestProps {
	route: string
	values: {
		email: string
		password: string
	}
}
export const loginPostRequest = async (props: ILoginRequestProps) => {
	const { route, values } = props

	const response = await axiosInstance.post(route, values)
	return response
}

export const removeCookies=()=>{
  const cookies = Cookies.get()
  if (Cookies.get("token")) {
    for (let cookie in cookies) {
      Cookies.remove(cookie) // Remove each cookie
    }
  }
}
export const logout = async () => {
	const response = await axiosInstance.post("/auth/logout")
	return response
}
