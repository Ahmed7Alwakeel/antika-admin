
import moment from "moment";
import { IMonthData } from "../types/interfaces";

const MonthData = ({monthData}: {monthData:IMonthData}) => {
    return (
        <div className="month-actions-container">
            <div className="month-header">
                <h4>Monthly financial</h4>
            </div>
            <div className="month-data">
                <div className="month">{moment().format('MMMM YYYY')}</div>
                <div className="price">
                    <p>Total orders</p>
                    <p className="bold number">{monthData?.totalOrders || 0}</p>
                </div>
                <div className="price">
                    <p>Total revenue</p>
                    <p className="bold number">{(monthData?.totalAmount || 0)?.toLocaleString('en-US', { minimumFractionDigits: 2 })} $</p>
                </div>
            </div>
        </div>
    );
}

export default MonthData;