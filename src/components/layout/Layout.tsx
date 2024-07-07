import { ReactNode, useEffect } from "react";
import InitialLoader from "../loaders/InitialLoader";
import AdminPanelHeader from "./AdminPanelHeader";
import SideMenu from "./sideMenu/SideMenu";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {

    let { pathname } = useLocation();

    return (
        <main className="layout layout-with-loader">
            <InitialLoader />
            <div className="layout_inner">
                <SideMenu />
                <div className={`layout_wrapper`}>
                    <div className={`layout_content ${pathname.includes("/auth/") ? "login_layout" : ""}`}>
                        {!pathname.includes("/auth/") && <AdminPanelHeader />}
                        <div className="content_container">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Layout;