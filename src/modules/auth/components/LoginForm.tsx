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
                                // 0- For admin
                                if (res?.status=="Success" && res?.data?.token && res?.data?.user?.role == "admin") {
                                    Cookies.set('token', res?.data?.token);
                                    Cookies.set('user_data', JSON.stringify(res?.data?.user));
                                    Cookies.set('user_type', "admin");
                                    // (setCurrentUserType as (userType: string) => void)("super-admin");
                                    // setUserData as (userData: IUserData) => void;
                                    // setUserToken as (userToken: string) => void;
                                    navigate('/');
                                    }else{
                                        setLoading(false)
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
                                <div className="form_button double"> 
                                    <Button loading={loading} type='submit'>
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