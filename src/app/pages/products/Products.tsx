import { useDispatch } from "react-redux";
import { setBreadCrumbsData } from "../../../store/redux/breadCrumbsData";
import { useEffect, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { generalGet } from "../../../API/api";
import TableSkeleton from "../../../components/loaders/TableSkeleton";
import ListHeader from "../../../components/ListHeader";
import SearchInputField from "../../../components/SearchInputField";
import { searchFilterLogic } from "../../../utils/HelperFunctions";
import { useTranslation } from "react-i18next";
import { ICategory } from "../../../modules/category/types/interfaces";
import CategoriesTableContainer from "../../../modules/category/components/CategoriesTableContainer";
import ProductsTableContainer from "../../../modules/product/components/ProductsTableContainer";

const Products = () => {
    const { t } = useTranslation()
    const [isPending, startTransition] = useTransition()
    const dispatch = useDispatch()
    dispatch(setBreadCrumbsData({
        links: [{ label: "Dashboard", path: "/" }, { label: "Products List", path: "/products" }],
        page_title: "Products List",
    }))

    const [searchInput, setSearchInput] = useState("")
    const [refetch, setRefetch] = useState(false)
    const [categories, setCategories] = useState<ICategory[]>([])
    const [shownList, setShownList] = useState<ICategory[]>([])
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["Products", refetch],
        queryFn: () => generalGet("/product"),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const reqData = data?.data.data.data
        if (isSuccess) {
            const sortedCategories = reqData.sort((a: any, b: any) => a.published - b.published).sort((a: any, b: any) => {
                const dateA = new Date(b.createdAt).getTime();
                const dateB = new Date(a.createdAt).getTime();
                return dateB + dateA; // Sort in descending order
            });
            setCategories(sortedCategories);
        }

    }, [isSuccess, data])

    const tableHeaders = [
        { label: t("id") },
        { label: t("name") },
        { label: "Category" },
        { label: t("slug") },
        { label: "Quantity" },
        { label: "Published", customClass: "status_col" },
        { label: t("actions"), customClass: "actions_col" }
    ];

    useEffect(() => {
        setShownList(categories)
        if (searchInput) {
            const results = searchFilterLogic({ searchInput: searchInput, listOfData: categories, keys: ["id", "name"] })
            startTransition(()=>{
                setShownList(results)
            })
        }
    }, [categories, searchInput])

    if (isLoading) return <TableSkeleton columns={6} withoutButton />
    return (
        <div className="services-page-container">
            <ListHeader>
                <div className="filter_container">
                    <SearchInputField placeholder={t("search_by_id_Name")} setSearchInput={setSearchInput} />
                </div>
            </ListHeader>
            <ProductsTableContainer
                tableHeaders={tableHeaders}
                data={shownList}
                noDataMessage={"No Products found"}
                setRefetchData={setRefetch}
            />
        </div>
    );
}

export default Products;