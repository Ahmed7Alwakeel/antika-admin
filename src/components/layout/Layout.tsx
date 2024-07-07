import { ReactNode, useEffect } from "react";
import InitialLoader from "../loaders/InitialLoader";
import AdminPanelHeader from "./AdminPanelHeader";
import SideMenu from "./sideMenu/SideMenu";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
		if ( !Cookies.get('token')) {
            navigate('/auth/login')
        }
		
	}, []);
    return (
        <main className="layout layout-with-loader">
            <InitialLoader />
            <div className="layout_inner">
                <SideMenu />
                <div className={`layout_wrapper`}>
					<div className={`layout_content `}>
							<AdminPanelHeader />
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