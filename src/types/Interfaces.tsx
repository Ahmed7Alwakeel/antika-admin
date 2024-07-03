import { ChangeEventHandler, FocusEventHandler, ReactNode, EventHandler, FocusEvent, FormEvent } from "react";
import { TOptions } from "./types";
import Select from "react-select/dist/declarations/src/Select";
import { FormikProps } from "formik";

//Buttons
export interface IButtonProps {
    text: string;
    customClass?: string;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    disabled?: boolean;
    noScroll?: boolean;
    loading?: boolean;
    children?: ReactNode;
  }

//Field Wrapper
export interface IFieldWrapperProps {
    children?: ReactNode;
    title: string;
    desc?: string;
    inputError?: string;
    inputTouched?: boolean;
    inputName?: string;
    inputPlaceholder?: string;
    defaultValue?: string;
    customPadding?: boolean;
    options?: Array<TOptions>;
    input?: boolean;
    onChange?: (e: FormEvent<HTMLInputElement>) => void;
    onFocus?: (e: FormEvent<HTMLInputElement>) => void;
    onBlur?: (e: FormEvent<HTMLInputElement>) => void;
    select?: boolean ;
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
   
}

