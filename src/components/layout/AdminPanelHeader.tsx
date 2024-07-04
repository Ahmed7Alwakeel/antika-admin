
// import AdminDataBtn from "./AdminDataBtn";
import { full_logo } from "../../config/variables";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import AdminDataBtn from "./AdminDataBtn";

const AdminPanelHeader = () => {
  const { pathname } = useLocation();

  return (
    <>
    <div className={`admin_panel_header ${(pathname == ("/auth/login") || pathname == ("/auth/forgot-password")) ? "login_page_header" : ""}`}>
      {(pathname == ("/auth/login") || pathname == ("/auth/forgot-password")) ?
        <div className="auth_page_header">
          <div className="logo_container">
            {full_logo}
          </div>
        </div>
        :
        <div className="normal_header">
          <Breadcrumbs />
          <div className="left-side">
          <div className={`burger`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
          <div className="hz-line"></div>
            <AdminDataBtn />
          </div>
        </div>
      }
    </div>
    {/* <div className="mobile-menu"></div> */}
    </>
  );
}

export default AdminPanelHeader;
