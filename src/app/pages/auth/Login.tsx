import LoginForm from "../../../modules/auth/components/LoginForm";

const Login = () => {
    return (
        <div className="login_page_container authlayout">
            <div className="login_container">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;