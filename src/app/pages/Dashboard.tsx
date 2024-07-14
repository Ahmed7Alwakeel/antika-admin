import { useDispatch } from "react-redux";
import { setBreadCrumbsData } from "../../store/redux/breadCrumbsData";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    dispatch(setBreadCrumbsData({
        links: [{ label: t("dashboard"), path: "/" }],
        page_title: t("dashboard"),
    }))
    return (
        <div>
            Enter
        </div>
    );
}

export default Dashboard;