import Cookies from 'js-cookie'
import FieldWrapper from "../../../components/formInputs/FieldWrapper";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import TextContainer from './TextContainer';
import { authContext } from '../../../store/context/authContext';
import { IUserData } from '../types/Interfaces';
import { loginPostRequest } from '../API/api';



const LoginForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const {setCurrentUserType, setUserData, setUserToken} = useContext(authContext);
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Enter valid email format')
            .required('required')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please remove spaces'),
        password: Yup.string().required('required')
        // .matches(/^[^ ]\S*/, "Please remove spaces").min(8, "The password must be at least 8 characters."),
    });

    return (
        <div className="login_form" >
                <TextContainer 
                    title="Login"
                    desc="Welcome to AutoConnect"
                />
                <Formik validateOnMount
                    validationSchema={validationSchema}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values) => {
                        setLoading(true)
                        loginPostRequest({ route: "/auth/login", values: values }).then((res) => {
                            setLoading(false)
                            // console.log(res?.data, "rere")
                            // 0- For admin
                            if (res?.success && res?.data?.token && res?.data?.user?.roles[0] === "super-admin") {
                                Cookies.set('token', res?.data?.token);
                                Cookies.set('user_data', JSON.stringify(res?.data?.user));
                                Cookies.set('user_type', "super-admin");
                                (setCurrentUserType as (userType: string) => void)("super-admin");
                                setUserData as (userData: IUserData) => void;
                                setUserToken as (userToken: string) => void;
                                navigate('/');
                            } 
                            // 1- for UAEPA moderator
                            // else if (res?.success && res?.data?.token && res?.data?.user?.user_type === "moderator") {
                            //     Cookies.set('token', res?.data?.token);
                            //     Cookies.set('user_data', JSON.stringify(res?.data?.user));
                            //     Cookies.set('user_type', "moderator");
                            //     setCurrentUserType("moderator");
                            //     setUserData(res?.data?.user);
                            //     setUserToken(res?.data?.token);
                            //     navigate('/tournaments');
                            // }
                            // // 2- for club moderator
                            // else if (res?.success && res?.data?.token && res?.data?.user?.user_type === "club_moderator") {
                            //     Cookies.set('token', res?.data?.token);
                            //     Cookies.set('user_data', JSON.stringify(res?.data?.user));
                            //     Cookies.set('user_type', "club_moderator");
                            //     setCurrentUserType("club_moderator");
                            //     setUserData(res?.data?.user);
                            //     setUserToken(res?.data?.token);
                            //     navigate('/tournaments');
                            // }
                            else if (res?.errors?.credentials) {
                                toast.error("invalid credentials")
                            } else {
                                toast.error("Something went wrong, please try again.")
                            }
                        })
                    }}
                >
                    {(formik) => (
                        <>
                            <Form> 
                                <FieldWrapper
                                    inputName={"email"}
                                    inputPlaceholder={"Email"}
                                    inputError={formik.errors.email}
                                    inputTouched={formik.touched.email}
                                    input
                                    tick 
                                /> 
                                <FieldWrapper
                                    inputName={"password"}
                                    inputPlaceholder={"Password"}
                                    inputError={formik.errors.password}
                                    inputTouched={formik.touched.password}
                                    input
                                    type={'password'}
                                    tick
                                    customClass={'password-input'}
                                />
                                <span className="forget" onClick={() => { navigate('/auth/forgot-password') }}>Forgot Password?</span>
                                <div className="form_button double"> 
                                    <Button>
                                        <span className="bold">Login</span>
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>
        </div >
    );
}

export default LoginForm;