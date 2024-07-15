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
import { authContext } from "../../../store/context/authContext";
import { FILES_URL } from "../../../config/APIs";
import { IProduct, IProductImage } from "../../product/types/interfaces";
import { ICategory } from "../../category/types/interfaces";
import { customStyles } from "../../../utils/SelectStyles";
import Select from "react-select";
import { TOptions } from "../../../types/types";

const CreateProductForm = () => {
    const { handleLogout } = useContext(authContext)
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [loadingRes, setLoadingRes] = useState(true)
    const [productData, setProductData] = useState<IProduct | null>()
    const [categoriesData, setCategoriesData] = useState<TOptions[]>([])
    const [bannerImage, setBannerImage] = useState<string | null>()
    const [cardImage, setCardImage] = useState<string | null>()
    const navigate = useNavigate()
    const [refetch, setRefetch] = useState(false)

    let { data, isSuccess, isLoading } = useQuery({
        queryKey: ["Product form", refetch, id],
        queryFn: () => generalGet(`/product/${id}`),
        enabled: !!id,
    });

    let { data: categoryData, isSuccess: categorySuccess, isLoading: categoryLoading } = useQuery({
        queryKey: ["Category"],
        queryFn: () => generalGet(`/category`)
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
            setProductData(reqData)
            setBannerImage(`${FILES_URL}/${reqData?.bannerImage.path}${reqData?.bannerImage.name}`)
            setCardImage(`${FILES_URL}/${reqData?.cardImage.path}${reqData?.cardImage.name}`)
            const timeOut = setTimeout(() => {
                setLoadingRes(false)
            }, 2000)
            return () => clearTimeout(timeOut)
        }
    }, [isSuccess, data, id])

    useEffect(() => {
        const reqData = categoryData?.data.data.data
        if (categorySuccess) {
            setCategoriesData(reqData.map((item: ICategory) => {
                return {
                    label: item.name,
                    value: item.id,
                }
            }))
        }
    }, [categorySuccess, categoryData])

    useEffect(() => {
        if (!id) {
            setProductData(null)
            setBannerImage(null)
            setCardImage(null)
        }
    }, [id])

    const handleSubmit = (values: any) => {
        let route = "/product"
        if (id) route = `/product/${id}`
        setLoading(true)
        const formData = new FormData()
        if ((productData?.bannerImage as IProductImage)?.name === values?.bannerImage?.name) delete values.bannerImage;
        if ((productData?.cardImage as IProductImage)?.name === values?.cardImage?.name) delete values.cardImage;
        buildFormData(formData, values, "");
        if (id) {
            generalUpdate({ route, values: formData }).then(res => {
                toast.success(`product updated successfully`)
                navigate("/products")
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
            toast.success(`Product created successfully`)
            navigate("/products")
        }
        ).catch(error => {
            if (error.response.status == 401) {
                handleLogout()
            }
            setLoading(false)
            toast.error(error.response.data.message || "Something went wrong please try again")
        })
    }

    const publishProduct = () => {
        setLoading(true)
        let route = `/product/${id}`
        generalUpdate({
            route, values: {
                published: !productData?.published
            }
        }).then(res => {
            toast.success(`Product ${productData?.published ? "unpublished" : "published"} successfully`)
            navigate("/products")
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
            category: Yup.string().required("required"),
            description: Yup.string().required("required").min(3, "Description is to short"),
            quantity: Yup.number().typeError('Must be a number').min(0, 'Must be greater than or equal 0')
        });

    const initialValues: IProduct = {
        name: productData?.name || "",
        description: productData?.description || "",
        quantity: productData?.quantity || 0,
        bannerImage: productData?.bannerImage || "",
        cardImage: productData?.cardImage || "",
        category: productData?.category || "",
    };
    console.log(categoriesData.find((item: TOptions) => item.value == productData?.category))
    if (loadingRes || isLoading || categoryLoading) return <FormSkeleton featuredSections={1} />

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
                            <div className="inputs_group">
                                <FieldWrapper
                                    customPadding
                                    title={"Category"}
                                    inputPlaceholder="Category"
                                    inputName={"category"}
                                    inputError={formik.errors.category}
                                    inputTouched={formik.touched.category}
                                    options={categoriesData}
                                    onChange={(e) => {
                                        formik.setFieldValue("category", (e as TOptions).value);
                                    }}
                                    defaultValue={categoriesData && categoriesData.find((item: TOptions) => item.value == productData?.category)}
                                    selectStyle={customStyles}
                                    select
                                />
                                <FieldWrapper
                                    title={"Quantity"}
                                    inputName={`quantity`}
                                    inputPlaceholder={"E.g "}
                                    inputError={formik.errors.quantity}
                                    inputTouched={formik.touched.quantity}
                                    input
                                    customPadding
                                    border
                                />
                            </div>
                            <div className="form_button reverse">
                                <div >
                                    {id &&
                                        <Button type="button" customClass="blue" loading={loading} onClick={publishProduct}>
                                            <span className="bold">{productData?.published ? "UnPublish" : "Publish"}</span>
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

export default CreateProductForm;