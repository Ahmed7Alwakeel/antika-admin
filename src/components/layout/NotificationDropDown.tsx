import SingleNotification from "./SingleNotification";

const NotificationDropDown = ({ notification,setDropDownNot }: any) => {

    return (
        <div className="notification-container">
            <div className="notification-wrapper">
                <div className="notf-header">
                    <p>Notifications</p>
                    <div className="day"></div>
                </div>
                {notification.length > 0 ? (
                    <>
                        {notification?.map((item: any, index: number) => (
                            <SingleNotification
                                key={index}
                                index={index}
                                item={item}
                                setDropDownNot={setDropDownNot}
                            />
                        ))}
                    </>
                ) : (
                    <div className="no-notification-message">
                        <span>
                            You have no notifications right now
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotificationDropDown;