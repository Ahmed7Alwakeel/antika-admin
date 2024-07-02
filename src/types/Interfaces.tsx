import { ChangeEventHandler, FocusEventHandler, ReactNode, EventHandler, FocusEvent, FormEvent } from "react";
import { TOptions } from "./types";

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
    // Editor?: any;
    // select?: any;
    // expand?: any;
    customClass?: string;
    advanced?: boolean;
    selectStyle?: string;
    type?: string;
    single?: boolean;
    halfWidth?: boolean;
    
    
 
    // onChange,
    // onFocus,
    // onBlur,
    // Editor,
    // select,
    // expand,
    // advanced,
    // selectStyle,
    // type,
    // single,
    // halfWidth,
    // border,
    // tooltip,
    // tooltipTitle,
    // tooltipHeader,
    // tooltipText,
    // radio,
    // noPadding,
    // tick,
    // search,
    // disabled,
    // textArea,
    // maxLength = 50,
    // multi,
    // date,
    // textEditor,
    // selectRef,
    // multipleDates,
    // range,
    // minDate,
    // maxDate,
    // timePicker,
    // value,
    // controlledInput,
    // noMinDate,
    // formik,
    // showMaxLengthHint,
    // showUnit,
    // unit,
    // dateFormat,
    // hideErrorIcon,
    // clear,
    // filterKeys
}

