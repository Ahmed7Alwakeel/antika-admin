import moment from "moment";
import { useNavigate } from "react-router-dom";


const SingleNotification = ({ item, index, setDropDownNot }: any) => {

    const navigate = useNavigate()

    return (
        <div
            className={`${item.url && "cursor"} ${index == 0 && "first"
                } single-notification ${item?.is_seen ? "" : "not-seen"}`}
            key={index}
            onClick={() => {
                if (item.url) navigate(item.url);
                setDropDownNot(false)
                item.is_seen=true
            }}
        >
            <p>{item.message}</p>
            <span>
                {moment(item.created).startOf('minute').fromNow()}
            </span>
        </div>
    );
}

export default SingleNotification;