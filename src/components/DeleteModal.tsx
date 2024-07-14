import React, { useState } from "react";
import Button from "./buttons/Button";
import { generalDelete } from "../API/api";
import { toast } from "react-toastify";

export default function DeleteModal({ id, setModal, setRefetchData, route, successMsg, warningMsg}:any) {
  const [loading, setLoading] = useState(false);

  function handleDelete() {
    setLoading(true);

    generalDelete(
       `${route}/${id}`
    ).then((res) => {
      setLoading(false);
        setRefetchData(`deleted_${Date.now()}`);
        setModal(false);
        toast.success(successMsg);
    }).catch(error=>{
      setLoading(false);
      toast.error(error?.response.data.message|| "Something went wrong, please try again.")
    })
  }

  return (
    <div className="delete-modal">
      <h4>{warningMsg}</h4>
      <div className="buttons">
        <Button
          loading={loading}
          onClick={handleDelete}
        >
            <span className="bold">Confirm</span>
        </Button>
        <Button type={"submit"} onClick={() => setModal(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
