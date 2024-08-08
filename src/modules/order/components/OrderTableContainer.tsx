import { useState } from "react";
import ModalContainer from "../../../components/ModalContainer";
import UpdateOrderModal from "./UpdateOrderModal";

const OrderTableContainer = ({ tableHeaders, data, noDataMessage, setRefetchData }: any) => {

    const [openModal, setOpenModal] = useState<any>(false);

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
                        {data?.sort((a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()).map((item: any, index: number) => (
                            <div className="item has_logo clickable" key={index} onClick={() => setOpenModal({ id: item._id, selectedOption: item.status })}>
                                <div className="column">{item?._id}</div>
                                <div className="column">{item?.deliveryDetails.email || "-"}</div>
                                <div className="column capitalize">{item?.deliveryDetails.branch || "-"}</div>
                                <div className="column capitalize">{item?.status || "-"}</div>
                                <div className="column capitalize">{(item.totalAmount || 0).toFixed(2)}</div>
                            </div>
                        ))}
                    </>
                    :
                    <h6>{noDataMessage}</h6>
                }
            </div>
            {openModal && (
                <ModalContainer customClass="x-small">
                    <UpdateOrderModal selectedOption={openModal.selectedOption} id={openModal.id} setRefetchData={setRefetchData} route={"/order"} successMsg={"Order status updated successfully"} openModal={openModal} setOpenModal={setOpenModal} />
                </ModalContainer>
            )}
        </div>
    );
}

export default OrderTableContainer;