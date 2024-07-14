import { ChangeEventHandler, FocusEventHandler, ReactNode, EventHandler, FocusEvent, FormEvent } from "react";
import { TOptions } from "./types";
import Select from "react-select/dist/declarations/src/Select";
import { FormikProps } from "formik";
import { ActionMeta, OnChangeValue } from "react-select";

export interface IFormHeader {
    children?: ReactNode,
    title: string,
    customStyle?: string
}

export interface IFormUpload {
    setShownImage?: any,
    shownImage?: string
    errors?: string
    formik?: any
    name?: string
    touched?: boolean
}
export interface IChildren {
    children: ReactNode
}

export interface ITableSkeleton {
    columns: number,
    withSelectFilter?: boolean,
    withoutButton?: boolean,
    withoutHeader?: boolean,
}
//Buttons
export interface IButtonProps {
    text?: string;
    customClass?: string;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    disabled?: boolean;
    noScroll?: boolean;
    loading?: boolean;
    children?: ReactNode;
}

//Input Fields
export interface IFieldWrapperProps {
    dir?: string
    children?: ReactNode;
    title?: string;
    desc?: string;
    inputError?: string;
    inputTouched?: boolean;
    inputName?: string;
    inputPlaceholder?: string;
    defaultValue?: TOptions;
    customPadding?: boolean;
    options?: Array<TOptions>;
    input?: boolean;
    onChange?: (newValue: OnChangeValue<TOptions, boolean>) => void;
    onFocus?: (e: FormEvent<HTMLInputElement>) => void;
    onBlur?: (e: FormEvent<HTMLInputElement>) => void;
    select?: boolean;
    customClass?: string;
    selectStyle?: object;
    type?: string;
    border?: boolean;
    tooltipTitle?: boolean;
    tooltip?: boolean;
    tooltipHeader?: string;
    tooltipText?: string;
    noPadding?: boolean;
    radio?: boolean;
    tick?: boolean;
    search?: boolean;
    disabled?: boolean;
    textArea?: boolean;
    maxLength?: number;
    multiple?: boolean;
    multipleDates?: boolean;
    date?: boolean;
    textEditor?: boolean;
    selectRef?: React.RefObject<Select> | null;
    noMinDate?: boolean;
    minDate?: string;
    maxDate?: string;
    timePicker?: boolean;
    value?: string;
    controlledInput?: boolean;
    formik?: FormikProps<any>;
    showMaxLengthHint?: boolean;
    showUnit?: boolean;
    unit?: string;
    dateFormat?: string;
    hideErrorIcon?: boolean;
    clear?: boolean;
    filterKeys?: Array<string>;
    multi?: boolean;

}

export interface IMultiDatePickerFieldProps {
    name: string
    label?: string
    onChange?: (e: FormEvent) => void
    value?: string
    minDate?: string
    maxDate?: string
    disabled?: boolean
    dateFormat?: string
}

export interface ITextEditorFieldProps {
    name: string
    className?: string
}

export interface ITimePickerFieldProps {
    name: string
    disabled?: boolean
}

export interface IAdminDataDropDown {
    dropDownToggler: boolean
}
interface IMenuLinks {
    header: string,
    headerIcon: JSX.Element[],
    baseRoute: string
    nestedLinks:
    {
        label: string,
        link: string,
        icon: JSX.Element[],
    }[]
}
export interface ITogglerNavLink {
    links: IMenuLinks,
    reAnimate?: boolean,
    customClass?: string,
    setMenu?: (e: boolean) => void
}