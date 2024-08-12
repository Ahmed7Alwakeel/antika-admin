import { Formik, Form } from "formik";
import * as Yup from "yup";
import FieldWrapper from "../../../components/formInputs/FieldWrapper";
import Button from "../../../components/buttons/Button";
import { useContext, useEffect, useState } from "react";
import { generalCreate, generalGet, generalUpdate } from "../../../API/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FormSkeleton from "../../../components/loaders/FormSkeleton";
import { authContext } from "../../../store/context/authContext";
import { IRestaurant } from "../types/interfaces";

const CreateBranchForm = () => {
    const { handleLogout } = useContext(authContext)
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [loadingRes, setLoadingRes] = useState(true)
    const [branchData, setBranchData] = useState<IRestaurant | null>()
    const navigate = useNavigate()
    const [refetch, setRefetch] = useState(false)

    let { data, isSuccess, isLoading,error } = useQuery({
        queryKey: ["Branch form", refetch, id],
        queryFn: () => generalGet(`/restaurant/${id}`),
        enabled: !!id,
    });



    useEffect(() => {
        setRefetch(true)
    }, [])

    useEffect(() => {
        if (!id) {
            const timeOut = setTimeout(() => {
                setLoadingRes(false)
            }, 1000)
            return () => clearTimeout(timeOut)
        }
    }, [id])

    useEffect(() => {
        const reqData = data?.data.data.data
        if (isSuccess) {
            setBranchData({ ...reqData, lat: reqData?.startLocation?.coordinates[0], lng: reqData?.startLocation?.coordinates[0] })
            const timeOut = setTimeout(() => {
                setLoadingRes(false)
            }, 2000)
            return () => clearTimeout(timeOut)
        }
    }, [isSuccess, data, id])

    useEffect(() => {
        if (!id) {
            setBranchData(null)
        }
    }, [id])

    const handleSubmit = (values: any) => {
        values.startLocation = {
            type: "Point",
            coordinates: [values.lat, values.lng]
        }
        let route = "/restaurant"
        if (id) route = `/restaurant/${id}`
        setLoading(true)
        if (id) {
            generalUpdate({ route, values }).then(res => {
                toast.success(`Branch updated successfully`)
                navigate("/branches")
            }
            ).catch(error => {
                if (error.response.status == 401) {
                    toast.error(error.response.data.message || "Something went wrong please try again")
                    handleLogout()
                }
                setLoading(false)
                toast.error(error.response.data.message || "Something went wrong please try again")
            })
            return
        }


        generalCreate({ route, values }).then(res => {
            toast.success(`Branch created successfully`)
            navigate("/branches")
        }
        ).catch(error => {
            if (error.response.status == 401) {
                handleLogout()
            }
            setLoading(false)
            toast.error(error.response.data.message || "Something went wrong please try again")
        })
    }

    const publishBranch = () => {
        setLoading(true)
        let route = `/restaurant/${id}`
        generalUpdate({
            route, values: {
                published: !branchData?.published
            }
        }).then(res => {
            toast.success(`Branch ${branchData?.published ? "unpublished" : "published"} successfully`)
            navigate("/branches")
        }
        ).catch(error => {
            if (error.response.status == 401) {
                toast.error(error.response.data.message || "Something went wrong please try again")
                handleLogout()
            }
            setLoading(false)
            toast.error(error.response.data.message || "Something went wrong please try again")
        })
    }

    const validationSchema =
        Yup.object({
            city: Yup.string().required("required"),
            area: Yup.string().required("required"),
            estimatedDeliveryTime: Yup.number().typeError('Must be a number').min(0, 'Must be greater than or equal 0'),
            deliveryPrice: Yup.number().typeError('Must be a number').min(0, 'Must be greater than or equal 0'),
            lat: Yup.number().typeError('Must be a number').min(0, 'Must be greater than or equal 0'),
            lng: Yup.number().typeError('Must be a number').min(0, 'Must be greater than or equal 0'),
        });

    const initialValues: IRestaurant = {
        lat: branchData?.lat || "",
        lng: branchData?.lng || "",
        city: branchData?.city || "",
        area: branchData?.area || "",
        estimatedDeliveryTime: branchData?.estimatedDeliveryTime || "",
        deliveryPrice: branchData?.deliveryPrice || "",
    };

    const { catchError } = useContext(authContext)

    useEffect(() => {
        if (error) {
            catchError(error)
        }
    }, [error])

    if (loadingRes || isLoading) return <FormSkeleton featuredSections={1} />

    return (

        <div className={'form_section'}>
            <Formik
                validateOnMount
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setFieldValue }) => {
                    handleSubmit({ ...values })
                }}
            >
                {(formik) => (
                    <>
                        <Form>
                            <div className="inputs_group">
                                <FieldWrapper
                                    title={"City"}
                                    inputName={`city`}
                                    inputPlaceholder={"E.g Cairo"}
                                    inputError={formik.errors.city}
                                    inputTouched={formik.touched.city}
                                    input
                                    customPadding
                                />
                                <FieldWrapper
                                    title={"Area"}
                                    inputName={`area`}
                                    inputPlaceholder={"E.g Nasr city"}
                                    inputError={formik.errors.area}
                                    inputTouched={formik.touched.area}
                                    input
                                    customPadding
                                    border
                                />
                            </div>
                            <div className="inputs_group">
                                <FieldWrapper
                                    title={"Delivery Time"}
                                    inputName={`estimatedDeliveryTime`}
                                    inputPlaceholder={"E.g "}
                                    inputError={formik.errors.estimatedDeliveryTime}
                                    inputTouched={formik.touched.estimatedDeliveryTime}
                                    input
                                    customPadding
                                    border
                                    type="number"
                                />
                                <FieldWrapper
                                    title={"Delivery Price"}
                                    inputName={`deliveryPrice`}
                                    inputPlaceholder={"E.g "}
                                    inputError={formik.errors.deliveryPrice}
                                    inputTouched={formik.touched.deliveryPrice}
                                    input
                                    customPadding
                                    border
                                    type="number"
                                />
                            </div>
                            <div className="inputs_group">
                                <FieldWrapper
                                    title={"Lat"}
                                    inputName={`lat`}
                                    inputPlaceholder={"E.g 30,09"}
                                    inputError={formik?.errors?.lat}
                                    inputTouched={formik.touched.lat}
                                    input
                                    customPadding
                                    border
                                    type="number"
                                />
                                <FieldWrapper
                                    title={"Lng"}
                                    inputName={`lng`}
                                    inputPlaceholder={"E.g 31,65"}
                                    inputError={formik.errors.lng}
                                    inputTouched={formik.touched.lng}
                                    input
                                    customPadding
                                    border
                                    type="number"
                                />
                            </div>
                            <div className="form_button reverse">
                                <div >
                                    {id &&
                                        <Button type="button" customClass="blue" loading={loading} onClick={publishBranch}>
                                            <span className="bold">{branchData?.published ? "UnPublish" : "Publish"}</span>
                                        </Button>
                                    }
                                    <Button type="submit" loading={loading} disabled={!formik.dirty}>
                                        <span className="bold">{id ? "Update" : "Create"}</span>
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        </div >

    );
}

export default CreateBranchForm;