import FieldWrapper from "../../../components/formInputs/FieldWrapper";

const ProductForm = ({ formik, index }: any) => {

    return (

        <div className={'form_section'}>
            <div className="inputs_group">
                <FieldWrapper
                    title={"Name"}
                    inputName={`products.${index}.name`}
                    inputPlaceholder={"E.g Coffee"}
                    inputError={formik?.errors?.products && formik?.errors?.products[index]?.name}
                    inputTouched={formik?.touched?.products && formik?.touched?.products[index]?.name}
                    input
                    customPadding
                />
                <FieldWrapper
                    title={"Price"}
                    inputName={`products.${index}.price`}
                    inputPlaceholder={"E.g "}
                    inputError={formik?.errors?.products && formik?.errors?.products[index]?.price}
                    inputTouched={formik?.touched?.products && formik?.touched?.products[index]?.price}
                    input
                    customPadding
                    border
                    type="number"
                />
            </div>
        </div >

    );
}

export default ProductForm;