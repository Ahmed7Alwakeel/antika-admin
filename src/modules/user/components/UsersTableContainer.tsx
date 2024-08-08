
const UsersTableContainer = ({ tableHeaders, data, noDataMessage, setRefetchData }: any) => {
    return (
        <div className={`table_container`}>
            <div className="table_header">
                {tableHeaders?.map((header: any, index: number) => (
                    <span className={`head ${header.customClass}`} key={index}>{header.label}</span>
                ))}
            </div>
            <div className={`table_data ${(!data || data?.length == 0) && "no_data"}`}>
                {data?.length > 0 ?
                    <>
                        {data?.map((item: any, index: number) => (
                            item.role!="admin"&&
                            <div className="item has_logo" key={index}>
                                <div className="column">{item?._id}</div>
                                <div className="column capitalize">{item?.name || "-"}</div>
                                <div className="column ">{item?.email || "-"}</div>
                                <div className="column ">{item?.mobile || "-"}</div>
                                <div className="column ">{item?.role || "-"}</div>
                                <div className="column status_col capitalize"><div className={`${item?.isActive ? "active" : ""}`}>{`${item?.isActive ? "active" : "inactive"}`}</div></div>
                                <div className="column status_col capitalize"><div className={`${item?.isVerified ? "active" : ""}`}>{`${item?.isVerified ? "Verified" : "Unverified"}`}</div></div>
                            </div>
                        ))}
                    </>
                    :
                    <h6>{noDataMessage}</h6>
                }
            </div>
        </div>
    );
}

export default UsersTableContainer;