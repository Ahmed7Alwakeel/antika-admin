import { useDispatch } from "react-redux";
import { setBreadCrumbsData } from "../../../store/redux/breadCrumbsData";
import { useTranslation } from "react-i18next";
import CreateProductForm from "../../../modules/product/components/CreateProductForm";

const CreateProduct = () => {

    const {t}=useTranslation()
    const dispatch=useDispatch()
    dispatch(setBreadCrumbsData({
        links: [{ label: "Dashboard", path: "/" },{label: "Create Product",path:"/products/create-product"}],
		page_title: "Create Product",
    }))
    
    return (
        <div>
            <CreateProductForm/>
        </div>
    );
}

export default CreateProduct;