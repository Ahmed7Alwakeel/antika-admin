import { useDispatch } from "react-redux";
import { setBreadCrumbsData } from "../../store/redux/breadCrumbsData";
import { useTranslation } from "react-i18next";
import { IMonthData } from "../../modules/dashboard/types/interfaces";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { generalGet } from "../../API/api";
import MonthData from "../../modules/dashboard/components/MonthlyData";
import ChartData from "../../modules/dashboard/components/ChartData";
import { donutsLineColors, getYearlyReport, handleMixedLineChartData } from "../../modules/dashboard/utils";
import ReportTabs from "../../modules/dashboard/components/ReportTabs";
import DonutChartData from "../../modules/dashboard/components/DonutChartData";
import ProductsData from "../../modules/dashboard/components/ProductsData";
import { authContext } from "../../store/context/authContext";

const Dashboard = () => {
    const { catchError } = useContext(authContext)
    const { t } = useTranslation()
    const [monthData, setMonthData] = useState<IMonthData>()
    const [branchesOrdersData, setBranchesOrdersData] = useState<any>({})
    const [branchesPerData, setBranchesPerData] = useState<any>([])
    const [productsOrdersData, setProductsOrdersData] = useState<any>([])


    const { data, isSuccess, isLoading, error } = useQuery({
        queryKey: ["Month data"],
        queryFn: () => generalGet("/dashboard/monthly-orders"),
        refetchOnWindowFocus: false
    });

    const { data: branchesOrdersGraph,
        isSuccess: branchesOrdersGraphSuccess,
        isLoading: branchesOrdersGraphLoading,
        error: branchesOrdersGraphError } = useQuery({
            queryKey: ["branches_Orders_Graph"],
            queryFn: () => generalGet("/dashboard/branches-orders-graph"),
            refetchOnWindowFocus: false
        });

    const { data: productsData,
        isSuccess: productsSuccess,
        isLoading: productsLoading,
        error: productsError } = useQuery({
            queryKey: ["products-orders"],
            queryFn: () => generalGet("/dashboard/products-orders"),
            refetchOnWindowFocus: false
        });

    const { data: branchesPer,
        isSuccess: branchesPerSuccess,
        isLoading: branchesPerLoading,
        error: branchesPerError } = useQuery({
            queryKey: ["branches-percentage"],
            queryFn: () => generalGet("/dashboard/branches-percentage"),
            refetchOnWindowFocus: false
        });

    useEffect(() => {
        if (isSuccess) {
            const month = new Date().getMonth() + 1
            setMonthData(data.data.data.find((item: IMonthData) => item._id === month))
        }
    }, [isSuccess, data])


    useEffect(() => {
        if (branchesOrdersGraphSuccess) {
            setBranchesOrdersData(branchesOrdersGraph.data.data[0])
        }
    }, [branchesOrdersGraphSuccess, branchesOrdersGraph])

    useEffect(() => {
        if (productsSuccess) {
            const products: any = []
            productsData.data.data.map((item: any, index: number) => {
                index < 5 &&
                    products.push({
                        label: item.productName,
                        value: item.quantity
                    })
            })
            setProductsOrdersData(products)
        }
    }, [productsSuccess, productsData])

    useEffect(() => {
        if (branchesPerSuccess) {
            const data: any = []
            branchesPer.data.data.map((item: any, index: number) => {
                data.push({
                    label: item.branch,
                    orderPercentage: item.ordersPercentage.toLocaleString(),
                    amountPercentage: item.amountPercentage.toLocaleString(),
                    backgroundColor: donutsLineColors[index],
                    amount: item.totalAmount.toLocaleString() + " $",
                    orders: item.totalOrders
                })
            })
            setBranchesPerData([...data])

        }
    }, [branchesPerSuccess, branchesPer])

    const dispatch = useDispatch()

    dispatch(setBreadCrumbsData({
        links: [{ label: t("dashboard"), path: "/" }],
        page_title: t("dashboard"),
    }))

    const [selectedTab, setSelectedTab] = useState(0)

    const tabs = [
        'Orders',
        'Revenue',
    ]

    const handleDonutChartData = (data: any, key: any) => {
        const transformedData = [
            {
                data: data?.map((item: any) => item[key]),
                backgroundColor: data?.map((item: any) => item.backgroundColor),
            },
        ];
        return transformedData
    }

    useEffect(() => {
        if (error) {
            catchError(error)
        } else if (branchesOrdersGraphError) {
            catchError(branchesOrdersGraphError)
        }
        else if (productsError) {
            catchError(productsError)
        }
        else if (branchesPerError) {
            catchError(branchesPerError)
        }
    }, [error, branchesPerError, productsError, branchesOrdersGraphError])

    return (
        <div className="dashboard-page">
            <div className="graphs-container">
                <ReportTabs
                    tabs={tabs}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    title='Branches Overview'
                />
                <ChartData
                    stepSize={50}
                    handleData={() =>
                        handleMixedLineChartData(
                            Object.entries(branchesOrdersData).map(([branchName, monthlyData]) => {
                                return {
                                    label: branchName,
                                    data: getYearlyReport(monthlyData, selectedTab == 1 ? "totalAmount" : "totalOrders")
                                };
                            })
                        )
                    }
                    desc={
                        selectedTab == 0 ?
                            'Number of monthly orders for each branch.' :
                            'Number of monthly revenue for each branch.'

                    }
                    reportData={getYearlyReport(branchesOrdersData[Object.keys(branchesOrdersData)[0]], selectedTab == 1 ? "totalAmount" : "totalOrders")}
                />

                {branchesPerData.length > 0 &&
                    <div className="donut-charts-wrapper">
                        <DonutChartData
                            summary={branchesPerData}
                            handleData={() => handleDonutChartData(branchesPerData, "amountPercentage")}
                            shownData={branchesPerData}
                            keys={["amountPercentage", "amount"]}
                            title={'Branch revenue percentage'}
                            desc={'Top branches revenue'}
                        />
                        <DonutChartData
                            title={'Branch orders percentage'}
                            desc={'Top branches orders'}
                            keys={["orderPercentage", "orders"]}
                            summary={branchesPerData}
                            handleData={() => handleDonutChartData(branchesPerData, "orderPercentage")}
                            shownData={branchesPerData}
                        />
                    </div>
                }


            </div>
            <div className="monthly-actions-container">
                {monthData && <MonthData monthData={monthData} />}
                {productsOrdersData.length > 0 && <ProductsData productsData={productsOrdersData} />}
            </div>
        </div>
    );
}

export default Dashboard;