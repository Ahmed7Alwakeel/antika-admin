
import { full_logo, Lang_Icon } from "../../config/variables";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import AdminDataBtn from "./AdminDataBtn";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./sideMenu/MobileMenu";
import { useTranslation } from "react-i18next";
import NotificationDropDown from "./NotificationDropDown";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";



export type Notification = {
  // id: string;
  message: string
  url?: string
  created_at: Date
};

const AdminPanelHeader = () => {
  const { pathname } = useLocation();
  const [openMenu, setMenu] = useState<boolean>(false)
  const [dropDownNot, setDropDownNot] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>([])
  let [notificationCount, setNotificationCount] = useState(0);

  let allMessages: any = [];
  
  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("29c86db87dda01e43838", {
      cluster: 'eu'
    });
    const channel = pusher.subscribe(`order`);
    channel.bind('message', function (data: any) {
      allMessages.push({ ...data, is_seen: false });
      setNotification(allMessages);
      setNotificationCount(count => count + 1)

    });
  }, []);

  const notificationRef = useRef<any>()

  const handleClickOutsideNot = (event: any) => {
    if (dropDownNot && notificationRef.current && !notificationRef?.current?.contains(event.target)) {
      setDropDownNot(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutsideNot);
    return () => {
      document.removeEventListener('click', handleClickOutsideNot);
    };
  }, [dropDownNot]);

  const handleNotifications = () => {
    setDropDownNot(!dropDownNot)
    setNotificationCount(0);
    if (notificationCount == 0) {
      const notifications: any = []
      notification.map((item: any) => {
        notifications.push({
          url: item?.url,
          created_at: item?.created_at,
          message: item?.message,
          is_seen: 1
        })
      })
      setNotification([...notifications])
    }
  }

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
              <div className="icons-container" ref={notificationRef}>
                <div
                  className={`${"active"
                    } icon`}
                  onClick={() => {
                    handleNotifications()
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 17 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.375 1.75V2.45312C11.9414 2.98047 13.875 5.23047 13.875 7.9375V8.60547C13.875 10.2578 14.4727 11.875 15.5625 13.1055L15.8086 13.3867C16.125 13.7383 16.1953 14.1953 16.0195 14.6172C15.8438 15.0039 15.4219 15.25 15 15.25H1.5C1.04297 15.25 0.621094 15.0039 0.445312 14.6172C0.269531 14.1953 0.339844 13.7383 0.65625 13.3867L0.902344 13.1055C1.99219 11.875 2.625 10.2578 2.625 8.60547V7.9375C2.625 5.23047 4.52344 2.98047 7.125 2.45312V1.75C7.125 1.15234 7.61719 0.625 8.25 0.625C8.84766 0.625 9.375 1.15234 9.375 1.75ZM8.25 18.625C7.65234 18.625 7.05469 18.4141 6.63281 17.9922C6.21094 17.5703 6 16.9727 6 16.375H10.5C10.5 16.9727 10.2539 17.5703 9.83203 17.9922C9.41016 18.4141 8.8125 18.625 8.25 18.625Z"
                      fill="#211D33"
                    />
                  </svg>
                  {notificationCount > 0 && (
                    <div className="badge">{notificationCount}</div>
                  )}
                </div>
                {dropDownNot && (
                  <NotificationDropDown notification={notification} setDropDownNot={setDropDownNot} />
                )}
              </div>
              <AdminDataBtn />
            </div>
          </div>
        }
      </div>
      <MobileMenu openMenu={openMenu} setMenu={setMenu} />
    </>
  );
}

export default AdminPanelHeader;
