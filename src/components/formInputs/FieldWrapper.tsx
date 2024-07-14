import { ErrorMessage, Field } from "formik";
import Select, { components } from "react-select";
import { forwardRef, useState } from "react";
import { MultipleDatePickerField } from "./MultipleDataPickerField";
import { TextEditorField } from "./TextEditorField";
import { TimePickerField } from "./TimePickerField";
import { IFieldWrapperProps } from "../../types/Interfaces";

const FieldWrapper = (
  {
    children,
    title,
    desc,
    inputError,
    inputTouched,
    inputName,
    inputPlaceholder,
    defaultValue,
    options,
    input,
    onChange,
    onFocus,
    onBlur,
    select,
    customClass,
    selectStyle,
    type,
    border,
    customPadding,
    tooltip,
    tooltipTitle,
    tooltipHeader,
    tooltipText,
    radio,
    noPadding,
    tick,
    search,
    disabled,
    textArea,
    maxLength = 50,
    multi,
    date,
    textEditor,
    selectRef,
    multipleDates,
    minDate,
    maxDate,
    timePicker,
    value,
    controlledInput,
    noMinDate,
    formik,
    showMaxLengthHint,
    showUnit,
    unit,
    dateFormat,
    hideErrorIcon,
    clear,
    filterKeys,
    dir
  }: IFieldWrapperProps,
  ref: React.Ref<HTMLDivElement>
) => {

  const length = value?.length || 0;

  const [remainingCharachters, setRemainingCharachters] = useState(maxLength - length || maxLength);

  const handleKeyUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemainingCharachters(maxLength - e.target.value?.length || 0)
  };
  return (
    <div
      className={`field_wrapper_container ${customPadding && "custom-padding"
        } ${noPadding && "no-padding"} ${border && "add-border"} ${customClass}`}
      ref={ref}
    >
      {title && (
        <div className={`header ${radio && "radio-header"}`}>
          <h5 className="title">
            {title}
            {tooltipTitle && (
              <span className="desc">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.6"
                    d="M8 0.5C12.4062 0.5 16 4.09375 16 8.5C16 12.9375 12.4062 16.5 8 16.5C3.5625 16.5 0 12.9375 0 8.5C0 4.09375 3.5625 0.5 8 0.5ZM8 4.5C7.4375 4.5 7 4.96875 7 5.5C7 6.0625 7.4375 6.5 8 6.5C8.53125 6.5 9 6.0625 9 5.5C9 4.96875 8.53125 4.5 8 4.5ZM9.25 12.5C9.65625 12.5 10 12.1875 10 11.75C10 11.3438 9.65625 11 9.25 11H8.75V8.25C8.75 7.84375 8.40625 7.5 8 7.5H7C6.5625 7.5 6.25 7.84375 6.25 8.25C6.25 8.6875 6.5625 9 7 9H7.25V11H6.75C6.3125 11 6 11.3438 6 11.75C6 12.1875 6.3125 12.5 6.75 12.5H9.25Z"
                    fill="#000"
                  />
                </svg>
                <div className="tooltip-box">
                  {tooltipHeader && <h6>{tooltipHeader}</h6>}
                  {tooltipText && <p className="desc">{tooltipText}</p>}
                </div>
              </span>
            )}
          </h5>
          {desc && (
            <div className="desc">
              {desc}
              {tooltip && (
                <>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.6"
                      d="M8 0.5C12.4062 0.5 16 4.09375 16 8.5C16 12.9375 12.4062 16.5 8 16.5C3.5625 16.5 0 12.9375 0 8.5C0 4.09375 3.5625 0.5 8 0.5ZM8 4.5C7.4375 4.5 7 4.96875 7 5.5C7 6.0625 7.4375 6.5 8 6.5C8.53125 6.5 9 6.0625 9 5.5C9 4.96875 8.53125 4.5 8 4.5ZM9.25 12.5C9.65625 12.5 10 12.1875 10 11.75C10 11.3438 9.65625 11 9.25 11H8.75V8.25C8.75 7.84375 8.40625 7.5 8 7.5H7C6.5625 7.5 6.25 7.84375 6.25 8.25C6.25 8.6875 6.5625 9 7 9H7.25V11H6.75C6.3125 11 6 11.3438 6 11.75C6 12.1875 6.3125 12.5 6.75 12.5H9.25Z"
                      fill="#000"
                    />
                  </svg>
                  <div className="tooltip-box">
                    {tooltipHeader && <h6>{tooltipHeader}</h6>}
                    {tooltipText && <p className="desc">{tooltipText}</p>}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {input && (
        <div className="input_wrapper">
          <div className="field" dir={dir}>
            <Field
              type={type && type}
              placeholder={inputPlaceholder}
              name={inputName}
              className={`input-field ${inputError && inputTouched && "input-error"
                }`}
              maxLength={maxLength || 50}
              disabled={disabled}
              onKeyUp={handleKeyUp}
            />
            {showUnit && (
              <span className="fixed-place-holder">{unit}</span>
            )}
            {!inputError && tick && (
              <div className="tick">
                <svg
                  width="17"
                  height="13"
                  viewBox="0 0 17 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6304 0.395476C17.1232 0.882215 17.1232 1.73401 16.6304 2.22075L6.92698 12.6045C6.47213 13.1318 5.67614 13.1318 5.22129 12.6045L0.369565 7.41264C-0.123188 6.9259 -0.123188 6.0741 0.369565 5.58736C0.824415 5.06006 1.6204 5.06006 2.07525 5.58736L6.05518 9.84633L14.9247 0.395476C15.3796 -0.131825 16.1756 -0.131825 16.6304 0.395476Z"
                    fill={"#000"}
                  />
                </svg>
              </div>
            )}
            {showMaxLengthHint &&
              <p className="max_length_hint">{remainingCharachters} / {maxLength} characters left</p>
            }
            <p className="error">
              <ErrorMessage name={inputName || "defaultName"} />
            </p>
            {inputError && inputTouched && !hideErrorIcon && dir != "rtl" &&
              <div className="error-icon">
                !
              </div>
            }
          </div>
        </div>
      )}
      {controlledInput && (
        <div className="input_wrapper">
          <div className="field">
            <Field
              type={type && type}
              placeholder={inputPlaceholder}
              name={inputName}
              className={`input-field ${inputError && inputTouched && "input-error"
                }`}
              maxLength="255"
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   onChange && onChange(e);
              //   formik && formik.setFieldValue(inputName || "defaultName", e?.target?.value)
              // }}
              disabled={disabled}
            />
            {!inputError && tick && (
              <div className="tick">
                <svg
                  width="17"
                  height="13"
                  viewBox="0 0 17 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6304 0.395476C17.1232 0.882215 17.1232 1.73401 16.6304 2.22075L6.92698 12.6045C6.47213 13.1318 5.67614 13.1318 5.22129 12.6045L0.369565 7.41264C-0.123188 6.9259 -0.123188 6.0741 0.369565 5.58736C0.824415 5.06006 1.6204 5.06006 2.07525 5.58736L6.05518 9.84633L14.9247 0.395476C15.3796 -0.131825 16.1756 -0.131825 16.6304 0.395476Z"
                    fill={"#000"}
                  />
                </svg>
              </div>
            )}
            {/* <p className="error">
              <ErrorMessage name={inputName} />
            </p> */}
          </div>
        </div>
      )}
      {textArea && (
        <div className="input_wrapper">
          <div className="field">
            <Field
              as={"textarea"}
              rows={7}
              name={inputName}
              placeholder={inputPlaceholder}
              className={`input-field ${inputError && inputTouched && "input-error"}`}
              maxLength={maxLength}
              disabled={disabled}
              onKeyUp={handleKeyUp}
            />
            {showMaxLengthHint &&
              <p className="max_length_hint">{remainingCharachters} / {maxLength} characters left</p>
            }            <p className="error">
              <ErrorMessage name={inputName || "defaultName"} />
            </p>
          </div>
        </div>
      )}
      {textEditor && (
        <div className="input_wrapper">
          <div className="field">
            <TextEditorField
              name={inputName || "defaultName"}
              className={`${inputError && inputTouched && "ql-error"}`}
            />
            <p className="error">
              <ErrorMessage name={inputName || "defaultName"} />
            </p>
          </div>
        </div>
      )}
      {select && (
        <div className="input_wrapper">
          <div className="field">
            <Select
              isSearchable={search || false}
              isClearable={clear || false}
              isMulti={multi || false}
              options={options}
              name={inputName}
              placeholder={inputPlaceholder}
              className={`select-drop-down ${inputError && inputTouched && "input-error"
                } ${customClass || ""} ${search && "searchable_select"}`}
              noOptionsMessage={() => `no options`}
              classNamePrefix="react-select"
              styles={selectStyle}
              defaultValue={defaultValue}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              isDisabled={disabled}
              // ref={selectRef}
              filterOption={(option, inputValue) => {
                if (inputValue.trim().length == 0) return true;

                const dataToFilter = [
                  option.label,
                  option.value,
                  ...(filterKeys ? filterKeys?.map(key => (option?.data as { [key: string]: string })?.[key]) : [])
                ]
                return dataToFilter?.some(data => data?.toString()?.toLowerCase()?.includes(inputValue.toLowerCase().trim()));
              }}
            />
            <p className="error">
              <ErrorMessage name={inputName || "defaultName"} />
            </p>
          </div>
        </div>
      )}

      {timePicker && (
        <div className="input_wrapper">
          {/* <div className="field"> */}
          <TimePickerField name={inputName || "defaultName"} disabled={disabled} />
          <p className="error">
            <ErrorMessage name={inputName || "defaultName"} />
          </p>
          {/* </div> */}
        </div>
      )}

      {multipleDates && (
        <div className="input_wrapper">
          {/* <div className="field"> */}
          <MultipleDatePickerField
            name={inputName || "defaultName"}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat={dateFormat}
            disabled={disabled}
          />
          <p className="error">
            <ErrorMessage name={inputName || "defaultName"} />
          </p>
          {/* </div> */}
        </div>
      )}
      {children}
    </div>
  );
};

export default forwardRef(FieldWrapper);
