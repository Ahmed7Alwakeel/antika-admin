import { useEffect, useRef, useState } from "react";
import AdminDataDropDown from "./AdminDataDropDown";
// import Cookies from "js-cookie";

const AdminDataBtn = () => {
    const [dropDownToggler, setDropDownToggler] = useState(false);
    const el = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e:MouseEvent) => {
        if (el.current && !el.current.contains(e.target as Node)) {
            setDropDownToggler(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    function getInitials(name:string) {
        var words = name?.split(' ');
        if (words?.length == 1) {
            return words[0].substring(0, 1)?.toUpperCase();
        } else if (words?.length > 1) {
            return (words?.[0]?.[0] + words?.[1]?.[0])?.toUpperCase();
        }
    }

    const [userData, setUserData] = useState();
    const [userInitials, setUserInitials] = useState();

    // useEffect(() => {
    //     if (Cookies.get("user_data")) {
    //         setUserData(JSON.parse(Cookies.get("user_data")));
    //         setUserInitials(getInitials(JSON.parse(Cookies.get("user_data")).name));
    //     }
    // }, [Cookies.get("user_data")])




    return (
        <div className="admin_data_btn" ref={el}>
            <div className="icon_container" onClick={() => setDropDownToggler(!dropDownToggler)}>
                <span className="user_name">{userInitials}</span>
                <div className="active_icon"></div>
            </div>
            <AdminDataDropDown dropDownToggler={dropDownToggler} userData={userData} />
        </div>
    );
}

export default AdminDataBtn;