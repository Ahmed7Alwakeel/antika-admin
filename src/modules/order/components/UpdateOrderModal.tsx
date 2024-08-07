import { useEffect, useState } from "react";
import { generalDelete, generalUpdate } from "../../../API/api";
import { toast } from "react-toastify";
import Button from "../../../components/buttons/Button";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { sortStyles } from "../../../utils/SelectStyles";
import CloseButton from '../../../components/buttons/CloseButton';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


const UpdateOrderModal = ({ id, setOpenModal, openModal, setRefetchData, route, successMsg, selectedOption }: any) => {

    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState({ label: "", value: "", progressValue: 0 })
    const [chosenStatus, setChosenStatus] = useState("string")

    const orderStatus = [
        { label: "Placed", value: "placed", progressValue: 0 },
        {
            label: "Awaiting Restaurant Confirmation",
            value: "paid",
            progressValue: 25,
        },
        { label: "In Progress", value: "inProgress", progressValue: 50 },
        { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
        { label: "Delivered", value: "delivered", progressValue: 100 },
    ];

    useEffect(() => {
        setSelectedStatus(prev => {
            const selected = orderStatus.find(item => item.value === selectedOption);
            return selected || { label: "", value: "", progressValue: 0 }; // Fallback to default state
        });
    }, [selectedOption]);

    function handleUpdate() {
        if (selectedStatus.progressValue !== 100) {
            setLoading(true);
            generalUpdate(
                {
                    route: `${route}/${id}`,

                    values: { status: chosenStatus }
                }
            ).then((res) => {
                setLoading(false);
                setRefetchData(`updated_${Date.now()}`);
                setOpenModal(false);
                toast.success(successMsg);
            }).catch(error => {
                setLoading(false);
                toast.error(error?.response.data.message || "Something went wrong, please try again.")
            })
        }
    }

    return (
        <div className="common-modal">
            <CloseButton handleClose={() => setOpenModal(false)} />
            <div className='modal-header'>
                <h4>Status</h4>
            </div>
            <div className='modal-info'>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={selectedOption}
                    name="radio-buttons-group"
                >
                    {orderStatus?.map((status: any) => (
                        <FormControlLabel className='normal-cursor' key={status.value} value={status.value} control={
                            <Radio
                                onChange={(e) => setChosenStatus(e.target.value)}
                                disabled={status.progressValue < selectedStatus.progressValue}
                                className='normal-cursor'
                                size="small"
                                sx={{
                                    color: "black",
                                    '&.Mui-checked': {
                                        color: "black",
                                    },
                                }}
                            />} label={status.label} />
                    ))}
                </RadioGroup>
                <div className="buttons">
                    <Button
                        loading={loading}
                        onClick={handleUpdate}
                    >
                        <span className="bold">Confirm</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UpdateOrderModal;