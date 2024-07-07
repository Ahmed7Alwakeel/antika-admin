import { axiosInstance } from "../../../config/axiosConfig";

interface ILoginRequestProps {
    route: string;
    values: {
        email: string;
        password: string;
    };
}
export const loginPostRequest = async (props: ILoginRequestProps) => {
    const { route, values } = props;
  
    const response = await axiosInstance
      .post(route, values)
      .then((res) => {
        return res?.data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
    return response;
  };
  