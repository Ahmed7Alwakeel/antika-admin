import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FieldWrapper from "../../../components/formInputs/FieldWrapper";
import Button from "../../../components/buttons/Button";
import { useContext, useEffect, useRef, useState } from "react";
import FormUpload from "../../../components/formInputs/FormUpload";
import { buildFormData } from "../../../utils/HelperFunctions";
import { generalCreate, generalDelete, generalGet, generalUpdate } from "../../../API/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FormSkeleton from "../../../components/loaders/FormSkeleton";
import { ICategory } from "../types/interfaces";
import { authContext } from "../../../store/context/authContext";
import { FILES_URL } from "../../../config/APIs";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandAccordion from "../../../components/ExpandAccordion";
import ProductForm from "../../product/components/ProductForm";
import { IProduct } from "../../product/types/interfaces";
import { createCategoryAndProducts, handleApiError, handleDeleteProducts, updateProducts } from "../utils/HelperFunctions";

const CreateCategoryForm = () => {
    const [expanded, setExpanded] = useState(0)
    const [count, setCount] = useState(1);
    const [deletedProducts, setDeletedProducts] = useState<string[]>([])
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
            setCount(reqData.products.length)
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

    const handleSubmit = async (values: any) => {
        let route = "/category"
        if (id) route = `/category/${id}`
        setLoading(true)
        const formData = new FormData()
        buildFormData(formData, values, "");

        try {
            if (id) {
                const res = await generalUpdate({
                    route,
                    values: formData
                });
                const categoryId = res.data.data.data._id;
                await updateProducts(categoryId, values.products);
                if (deletedProducts.length > 0) handleDeleteProducts(deletedProducts)
                toast.success('Category updated successfully');
                navigate("/categories");
            }
            else {
                await createCategoryAndProducts(formData, route, values);
                toast.success('Category created successfully');
                navigate("/categories");
            }
        } catch (error) {
            handleApiError(error, handleLogout, setLoading);
        }
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
            name: Yup.string().required("required").matches(/^[A-Za-z\s]+$/, "Must be english letters").min(3, "Name is to short"),
            description: Yup.string().required("required").min(3, "Description is to short"),
            products: Yup.array().of(
                Yup.object().shape(
                    {
                        name: Yup.string().required("required").matches(/^[A-Za-z\s]+$/, "Must be english letters").min(3, "Name is to short"),
                        price: Yup.number().typeError('Must be a number').min(0, 'Must be greater than or equal 0')
                    }
                )
            ),
        });

    const initialValues: ICategory = {
        name: categoryData?.name || "",
        description: categoryData?.description || "",
        bannerImage: categoryData?.bannerImage || "",
        cardImage: categoryData?.cardImage || "",
        products: categoryData?.products || [{
            name: "",
            price: "",
        }]
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
                            <FieldWrapper>
                                <div className={`input-wrapper start-times`}>
                                    <FieldArray
                                        name='products'
                                        render={(arrayHelpers) => (
                                            <div>
                                                {formik.values.products.map((res, index) => (
                                                    <div className={`field-array-container`} key={index}>
                                                        <Accordion
                                                            expanded={expanded == index}
                                                            onChange={() => setExpanded(expanded == index ? -1 : index)}>
                                                            <AccordionSummary
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                                className={`header-container ${expanded != index && 'expand'}`}
                                                            >
                                                                <p><ExpandAccordion expand={expanded == index} /> {formik.values.products[index].name || `Product Details ${index + 1}`}</p>
                                                                {
                                                                    count > 1 &&
                                                                    <p onClick={() => {
                                                                        setCount((count) => count - 1);
                                                                        arrayHelpers.remove(index);
                                                                        setDeletedProducts(prev => [...prev, res.id as string])

                                                                    }}>
                                                                        Remove
                                                                        <svg width="11" height="13" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11.8125 2.5C12.0312 2.5 12.25 2.71875 12.25 2.9375C12.25 3.18359 12.0312 3.375 11.8125 3.375H11.293L10.6094 13.1367C10.5273 14.0664 9.76172 14.75 8.85938 14.75H3.36328C2.46094 14.75 1.69531 14.0664 1.61328 13.1367L0.929688 3.375H0.4375C0.191406 3.375 0 3.18359 0 2.9375C0 2.71875 0.191406 2.5 0.4375 2.5H3.03516L3.74609 1.37891C3.96484 0.996094 4.40234 0.75 4.83984 0.75H7.38281C7.82031 0.75 8.25781 0.996094 8.47656 1.37891L9.1875 2.5H11.8125ZM4.83984 1.625C4.70312 1.625 4.56641 1.70703 4.48438 1.84375L4.04688 2.5H8.17578L7.73828 1.84375C7.65625 1.70703 7.51953 1.625 7.38281 1.625H4.83984ZM10.418 3.375H1.80469L2.48828 13.082C2.51562 13.5195 2.89844 13.875 3.36328 13.875H8.85938C9.32422 13.875 9.70703 13.5195 9.73438 13.082L10.418 3.375Z" fill="white" />
                                                                        </svg>
                                                                    </p>
                                                                }

                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <ProductForm
                                                                    formik={formik}
                                                                    index={index}
                                                                />
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </div>
                                                ))}

                                                <div
                                                    className="add-time-button"
                                                    onClick={() => {
                                                        arrayHelpers.push({
                                                            name: "",
                                                            price: ""
                                                        });
                                                        setCount((count) => count + 1);
                                                        setExpanded(count)
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.9375 12.625V9.8125H6.125C5.80859 9.8125 5.5625 9.56641 5.5625 9.25C5.5625 8.96875 5.80859 8.6875 6.125 8.6875H8.9375V5.875C8.9375 5.59375 9.18359 5.3125 9.5 5.3125C9.78125 5.3125 10.0625 5.59375 10.0625 5.875V8.6875H12.875C13.1562 8.6875 13.4375 8.96875 13.4375 9.25C13.4375 9.56641 13.1562 9.8125 12.875 9.8125H10.0625V12.625C10.0625 12.9414 9.78125 13.1875 9.5 13.1875C9.18359 13.1875 8.9375 12.9414 8.9375 12.625ZM18.5 9.25C18.5 14.2422 14.457 18.25 9.5 18.25C4.50781 18.25 0.5 14.2422 0.5 9.25C0.5 4.29297 4.50781 0.25 9.5 0.25C14.457 0.25 18.5 4.29297 18.5 9.25ZM9.5 1.375C5.14062 1.375 1.625 4.92578 1.625 9.25C1.625 13.6094 5.14062 17.125 9.5 17.125C13.8242 17.125 17.375 13.6094 17.375 9.25C17.375 4.92578 13.8242 1.375 9.5 1.375Z" fill="#211D33" />
                                                    </svg>
                                                    Add Product
                                                </div>

                                            </div>

                                        )}
                                    />
                                </div>
                            </FieldWrapper>
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