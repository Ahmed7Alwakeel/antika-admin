import { useDispatch } from "react-redux";
import { useContext, useEffect, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { generalGet } from "../../../API/api";
import SearchInputField from "../../../components/SearchInputField";
import { searchFilterLogic } from "../../../utils/HelperFunctions";
import { useTranslation } from "react-i18next";
import { setBreadCrumbsData } from "../../../store/redux/breadCrumbsData";
import ListHeader from "../../../components/ListHeader";
import { IUser } from "../../../modules/user/types/interfaces";
import TableSkeleton from "../../../components/loaders/TableSkeleton";
import OrderTableContainer from "../../../modules/order/components/OrderTableContainer";
import { authContext } from "../../../store/context/authContext";

const Orders = () => {
    const { t } = useTranslation()
    const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch()
    dispatch(setBreadCrumbsData({
        links: [{ label: "Dashboard", path: "/" }, { label: "Orders List", path: "/orders" }],
        page_title: "Orders List",
    }))

    const { catchError } = useContext(authContext)
    const [searchInput, setSearchInput] = useState("")
    const [refetch, setRefetch] = useState(false)
    const [ordersData, setOrdersData] = useState<IUser[]>([])
    const [shownList, setShownList] = useState<IUser[]>([])
    const { data, isSuccess, isLoading, error } = useQuery({
        queryKey: ["Orders", refetch],
        queryFn: () => generalGet("/order"),
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
            setOrdersData(sortedData);
        }

    }, [isSuccess, data])

    const tableHeaders = [
        { label: t("id") },
        { label: "Customer" },
        { label: "Branch" },
        { label: "Created at" },
        { label: "Status", customClass: "status_col" },
        { label: "Amount",customClass:"text-center"},
    ];

    useEffect(() => {
        setShownList(ordersData)
        if (searchInput) {
            const results = searchFilterLogic({ searchInput: searchInput, listOfData: ordersData, keys: ["id", "deliveryDetails.branch", "status"] })
            startTransition(() => {
                setShownList(results)
            })
        }
    }, [ordersData, searchInput])

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
                    <SearchInputField placeholder={"Search by ID or branch or status"} setSearchInput={setSearchInput} />
                </div>
            </ListHeader>
            <OrderTableContainer
                tableHeaders={tableHeaders}
                data={shownList}
                noDataMessage={"No Orders found"}
                setRefetchData={setRefetch}
            />
        </div>
    );
}

export default Orders;