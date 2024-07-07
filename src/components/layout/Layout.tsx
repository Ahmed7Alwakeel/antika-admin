import { ReactNode, useEffect } from "react";
import InitialLoader from "../loaders/InitialLoader";
import AdminPanelHeader from "./AdminPanelHeader";
import SideMenu from "./sideMenu/SideMenu";

const Layout = ({ children }: { children: ReactNode }) => {
	const pathName = window.location.pathname;
    return (
        <main className="layout layout-with-loader">
            <InitialLoader />
            <div className="layout_inner">
                <SideMenu />
                <div className={`layout_wrapper`}>
					<div className={`layout_content ${(pathName == ("/auth/login") ) ? "login_layout" : ""}`}>
							{!pathName.includes("/auth/")&&<AdminPanelHeader />}
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