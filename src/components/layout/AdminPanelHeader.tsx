
import { full_logo } from "../../config/variables";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import AdminDataBtn from "./AdminDataBtn";
import { useState } from "react";
import MobileMenu from "./sideMenu/MobileMenu";

const AdminPanelHeader = () => {
  const { pathname } = useLocation();
  const [openMenu, setMenu] = useState<boolean>(false)

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
              <div className={`burger`} onClick={() => setMenu(true)}>
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
      <MobileMenu openMenu={openMenu} setMenu={setMenu}/>
    </>
  );
}

export default AdminPanelHeader;
