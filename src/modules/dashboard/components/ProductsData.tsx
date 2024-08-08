
import moment from "moment";

const ProductsData = ({ productsData }: any) => {
    return (
        <div className="month-actions-container">
            <div className="month-header">
                <h4>Top Products selling</h4>
            </div>
            <div className="month-data">
                <div className="month">{moment().format('MMMM YYYY')}</div>
                {productsData?.map((item:any, index:number) => (
                    <div className="price" key={index}>
                        <p style={{textTransform:"capitalize"}}>{item.label}</p>
                        <p className="bold number">{item.value || 0}</p>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default ProductsData;