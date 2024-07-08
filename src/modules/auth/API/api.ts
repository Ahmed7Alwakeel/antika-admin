import { axiosInstance } from "../../../config/axiosConfig"
import { toast } from "react-toastify"

interface ILoginRequestProps {
	route: string
	values: {
		email: string
		password: string
	}
}
export const loginPostRequest = async (props: ILoginRequestProps) => {
	const { route, values } = props

	const response = await axiosInstance
		.post(route, values)
		.then((res) => {
			return res?.data
		})
		.catch((error) => {
			error.response.status == 401
				? toast.error("invalid credentials")
				: toast.error("Connection failed")
		})
	return response
}
