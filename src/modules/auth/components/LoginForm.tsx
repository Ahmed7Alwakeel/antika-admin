import Cookies from 'js-cookie'
import FieldWrapper from "../../../components/formInputs/FieldWrapper";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import TextContainer from './TextContainer';
import { authContext } from '../../../store/context/authContext';
import { IUserData } from '../types/Interfaces';
import { loginPostRequest } from '../API/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { setCurrentUserType, setUserData, setUserToken } from '../store/redux/authData';



const LoginForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    // const {setCurrentUserType, setUserData, setUserToken} = useContext(authContext);
    const authentication = useSelector((state: RootState) => state.authData);
    const dispatch = useDispatch();

    // Dispatch actions to update the authData state
    const updateToken = (token: string) => {
        dispatch(setUserToken('exampleToken'));
    };

    const updateUserData = (data: IUserData) => {
        dispatch(setUserData(data));
    };

    const updateCurrentUserType = (userType: string) => {
        dispatch(setCurrentUserType(userType));
    };
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
                desc="Welcome to Antika"
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
                        if (res?.data?.data.user.role == "admin") {

                            Cookies.set('token', res?.data?.data.token);
                            Cookies.set('user_data', JSON.stringify(res?.data?.data?.user));
                            Cookies.set('user_type', res?.data?.data.user.role);
                            updateToken(res?.data?.data.token)
                            updateUserData(res?.data?.data.user)
                            updateCurrentUserType(res?.data?.data.user.role);
                            navigate('/');
                        } else {
                            toast.error("invalid credentials")
                        }
                    }).catch(err => {
                        toast.error("invalid credentials")
                        setLoading(false)
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