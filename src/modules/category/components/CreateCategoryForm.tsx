import { Formik, Form } from "formik";
import * as Yup from "yup";
import FieldWrapper from "../../../components/formInputs/FieldWrapper";
import Button from "../../../components/buttons/Button";
import { useContext, useEffect, useState } from "react";
import FormUpload from "../../../components/formInputs/FormUpload";
import { buildFormData } from "../../../utils/HelperFunctions";
import { generalCreate, generalGet, generalUpdate } from "../../../API/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FormSkeleton from "../../../components/loaders/FormSkeleton";
import { ICategory } from "../types/interfaces";
import { authContext } from "../../../store/context/authContext";
import { FILES_URL } from "../../../config/APIs";

const CreateCategoryForm = () => {
    const { handleLogout } = useContext(authContext)
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [loadingRes, setLoadingRes] = useState(true)
    const [categoryData, setCategoryData] = useState<ICategory | null>()
    const [bannerImage, setBannerImage] = useState<string | null>()
    const [cardImage, setCardImage] = useState<string | null>()
    const navigate = useNavigate()
    const [refetch, setRefetch] = useState(false)

    let { data, isSuccess, isLoading } = useQuery({
        queryKey: ["Category form", refetch, id],
        queryFn: () => generalGet(`/category/${id}`),
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
            setCategoryData(reqData)
            setBannerImage(`${FILES_URL}/${reqData?.bannerImage.path}${reqData?.bannerImage.name}`)
            setCardImage(`${FILES_URL}/${reqData?.cardImage.path}${reqData?.cardImage.name}`)
            const timeOut = setTimeout(() => {
                setLoadingRes(false)
            }, 2000)
            return () => clearTimeout(timeOut)
        }
    }, [isSuccess, data, id])

    useEffect(() => {
        if (!id) {
            setCategoryData(null)
            setBannerImage(null)
            setCardImage(null)
        }
    }, [id])

    const handleSubmit = (values: any) => {
        let route = "/category"
        if (id) route = `/category/${id}`
        setLoading(true)
        const formData = new FormData()
        buildFormData(formData, values, "");
        if (id) {
            generalUpdate({ route, values: formData }).then(res => {
                toast.success(`Category updated successfully`)
                navigate("/categories")
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


        generalCreate({ route, values: formData }).then(res => {
            toast.success(`Category created successfully`)
            navigate("/categories")
        }
        ).catch(error => {
            if (error.response.status == 401) {
                handleLogout()
            }
            setLoading(false)
            toast.error(error.response.data.message || "Something went wrong please try again")
        })
    }

    const publishCategory = () => {
        setLoading(true)
        let route = `/category/${id}`
        generalUpdate({
            route, values: {
                published: !categoryData?.published
            }
        }).then(res => {
            toast.success(`Category ${categoryData?.published ? "unpublished" : "published"} successfully`)
            navigate("/categories")
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
            name: Yup.string().required("required").matches(/^[A-Za-z]+$/, "Must be english letters").min(3, "Name is to short"),
            description: Yup.string().required("required").min(3, "Description is to short"),
        });

    const initialValues: ICategory = {
        name: categoryData?.name || "",
        description: categoryData?.description || "",
        bannerImage: categoryData?.bannerImage || "",
        cardImage: categoryData?.cardImage || ""
    };

    if (loadingRes) return <FormSkeleton featuredSections={1} />

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
                                <FieldWrapper title={"Banner image"}>
                                    <FormUpload
                                        errors={formik?.errors.bannerImage as string}
                                        touched={formik?.touched?.bannerImage as boolean}
                                        setShownImage={setBannerImage}
                                        shownImage={bannerImage!}
                                        formik={formik}
                                        name={`bannerImage`}
                                    />
                                </FieldWrapper>
                                <FieldWrapper title={"Card image"}>
                                    <FormUpload
                                        errors={formik?.errors.cardImage as string}
                                        touched={formik?.touched?.cardImage as boolean}
                                        setShownImage={setCardImage}
                                        shownImage={cardImage!}
                                        formik={formik}
                                        name={`cardImage`}
                                    />
                                </FieldWrapper>
                            </div>
                            <div className="inputs_group">
                                <FieldWrapper
                                    title={"Name"}
                                    inputName={`name`}
                                    inputPlaceholder={"E.g fruits"}
                                    inputError={formik.errors.name}
                                    inputTouched={formik.touched.name}
                                    input
                                    customPadding
                                />
                                <FieldWrapper
                                    title={"Description"}
                                    inputName={`description`}
                                    inputPlaceholder={"E.g "}
                                    inputError={formik.errors.description}
                                    inputTouched={formik.touched.description}
                                    input
                                    customPadding
                                    border
                                />
                            </div>
                            <div className="form_button reverse">
                                <div >
                                    {id &&
                                        <Button type="button" customClass="blue" loading={loading} onClick={publishCategory}>
                                            <span className="bold">{categoryData?.published ? "UnPublish" : "Publish"}</span>
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

export default CreateCategoryForm;