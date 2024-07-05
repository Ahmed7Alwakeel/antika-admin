import { ReactNode } from "react";
import InitialLoader from "../loaders/InitialLoader";
import AdminPanelHeader from "./AdminPanelHeader";
import SideMenu from "./sideMenu/SideMenu";

const Layout = ({ children }: { children: ReactNode }) => {
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