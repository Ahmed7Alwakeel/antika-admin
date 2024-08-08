import { useDispatch } from "react-redux";
import { useContext, useEffect, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { generalGet } from "../../API/api";
import SearchInputField from "../../components/SearchInputField";
import { searchFilterLogic } from "../../utils/HelperFunctions";
import { useTranslation } from "react-i18next";
import { setBreadCrumbsData } from "../../store/redux/breadCrumbsData";
import ListHeader from "../../components/ListHeader";
import UsersTableContainer from "../../modules/user/components/UsersTableContainer";
import { IUser } from "../../modules/user/types/interfaces";
import TableSkeleton from "../../components/loaders/TableSkeleton";
import { authContext } from "../../store/context/authContext";

const Users = () => {
    const { t } = useTranslation()
    const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch()
    dispatch(setBreadCrumbsData({
        links: [{ label: "Dashboard", path: "/" }, { label: "Users List", path: "/users" }],
        page_title: "Users List",
    }))

    const [searchInput, setSearchInput] = useState("")
    const [refetch, setRefetch] = useState(false)
    const [users, setUsers] = useState<IUser[]>([])
    const [shownList, setShownList] = useState<IUser[]>([])
    const { data, isSuccess, isLoading, error } = useQuery({
        queryKey: ["Users", refetch],
        queryFn: () => generalGet("/user"),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const reqData = data?.data.data
        if (isSuccess) {
            const sortedData = reqData.sort((a: any, b: any) => b.isActive - a.isActive).sort((a: any, b: any) => {
                const dateA = new Date(b.createdAt).getTime();
                const dateB = new Date(a.createdAt).getTime();
                return dateB + dateA; // Sort in descending order
            });
            setUsers(sortedData);
        }

    }, [isSuccess, data])

    const tableHeaders = [
        { label: t("id") },
        { label: t("name") },
        { label: "Email" },
        { label: "Mobile" },
        { label: "Role" },
        { label: "Active", customClass: "status_col" },
        { label: "Verified", customClass: "status_col" }
    ];

    useEffect(() => {
        setShownList(users)
        if (searchInput) {
            const results = searchFilterLogic({ searchInput: searchInput, listOfData: users, keys: ["id", "name"] })
            startTransition(() => {
                setShownList(results)
            })
        }
    }, [users, searchInput])

    const { catchError } = useContext(authContext)

    useEffect(() => {
        if (error) {
            catchError(error)
        }
    }, [error])

    if (isLoading) return <TableSkeleton columns={6} withoutButton />
    return (
        <div className="services-page-container">
            <ListHeader>
                <div className="filter_container">
                    <SearchInputField placeholder={t("search_by_id_Name")} setSearchInput={setSearchInput} />
                </div>
            </ListHeader>
            <UsersTableContainer
                tableHeaders={tableHeaders}
                data={shownList}
                noDataMessage={"No Users found"}
                setRefetchData={setRefetch}
            />
        </div>
    );
}

export default Users;