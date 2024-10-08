import { useDispatch } from "react-redux";
import { setBreadCrumbsData } from "../../../store/redux/breadCrumbsData";
import CreateBranchForm from "../../../modules/branch/components/CreateBranchForm";

const CreateBranch = () => {
    
    const dispatch=useDispatch()
    dispatch(setBreadCrumbsData({
        links: [{ label: "Dashboard", path: "/" },{label: "Branches List",path:"/branches"},{label: "Create Branch",path:"/branches/create-branch"}],
		page_title: "Create Branch",
    }))
    
    return (
        <div>
            <CreateBranchForm/>
        </div>
    );
}

export default CreateBranch;