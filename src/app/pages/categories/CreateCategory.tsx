import { useDispatch } from "react-redux";
import { setBreadCrumbsData } from "../../../store/redux/breadCrumbsData";
import { useTranslation } from "react-i18next";
import CreateCategoryForm from "../../../modules/category/components/CreateCategoryForm";

const CreateCategory = () => {

    const {t}=useTranslation()
    const dispatch=useDispatch()
    dispatch(setBreadCrumbsData({
        links: [{ label: "Dashboard", path: "/" },{label: "Categories List",path:"/categories"},{label: "Create Category",path:"/categories/create-category"}],
		page_title: "Create Category",
    }))
    
    return (
        <div>
            <CreateCategoryForm/>
        </div>
    );
}

export default CreateCategory;