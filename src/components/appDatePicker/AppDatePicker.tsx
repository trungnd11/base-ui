/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import localeDate from "antd/es/date-picker/locale/vi_VN";
import { DatePickerStyle } from "./appDatePickerStyle";
import { AppTitle, AppWapperInput, ErrorMessage, RequiredComponent } from "../commonStyle/CommonStyle";
import useHeight from "../hook/useHeight";
import { AppDatePickerProps } from "@models/componentModels/AppDatePickerModel";
import { formatDateToString, formatStringToDate, getToDay } from "@utils/dateUtil";
import { localeDateTime, setValueDate, setValueDateToString } from "./handleDatePicker";
dayjs.locale("vi");

export default function AppDatePicker(props: AppDatePickerProps) {
  const {
    name,
    placeholder,
    title,
    picker,
    onChange,
    defaultValue,
    format = "DD/MM/YYYY",
    required,
    disabledDate,
    onKeyPress,
    status,
    value,
    validateText,
    titleWidth,
    errorMessage,
    onBlurForm,
    showTime,
    ...rest
  } = props;
  let arr: any[] = [];
  const [valueInput, setValueInput] = useState<any>(defaultValue ?? value ?? null);
  const heightAppDate = useHeight("app-datepicker-id");

  useEffect(() => {
    if (typeof value === "string") {
      return setValueInput(value);
    }
    value && dayjs(value).isValid() ? setValueInput(setValueDateToString(value, showTime)) : setValueInput(null);
  }, [value]);

  const checkIsValidDate = (stringDate: string) => {
    const date = formatStringToDate({ date: stringDate, format: "DD/MM/YYYY" });
    if (date?.isValid) {
      onKeyPress && onKeyPress(formatDateToString({ date, format: "DD/MM/YYYY" }));
      setValueInput(() => formatDateToString({ date, format: "DD/MM/YYYY" }));
      return;
    }
    onKeyPress && onKeyPress(formatDateToString({ date: dayjs(), format: "DD/MM/YYYY" }));
    setValueInput(() => formatDateToString({ date, format: "DD/MM/YYYY" }));
  };

  const handleDate = (e: any) => {
    if (!/[0-9/-]/.test(e.key) && !e.key.includes("Backspace") &&
      !e.key.includes("Tab") && !e.key.includes("Enter") &&
      !e.key.includes("Control") && !e.key.includes("c") &&
      !e.key.includes("ArrowLeft") && !e.key.includes("ArrowRight") && !e.key.includes("v")) {
      e.preventDefault();
    } else {
      if (e.key.includes("Backspace")) {
        arr.splice(arr.length - 1, 1);
      }
      const value: any = e.key;
      if (/[0-9/-]/.test(value) && arr.length < 10) {
        arr.push(value);
        const stringDate = arr.join("");
        stringDate.length === 10 && checkIsValidDate(stringDate);
      } else {
        /[0-9]/.test(value) && arr.length < 8 && arr.push(value);
        const stringDate = arr.map((item, index) => index === 1 || index === 3 ? `${item}/` : item).join("");
        stringDate.length === 10 && checkIsValidDate(stringDate);
      }
    }
  };

  const onBlurDate = (e: any) => {
    const valueDate = e.target.value;
    if (!valueDate && !valueInput) {
      onKeyPress && onKeyPress(null);
      setValueInput(null);
      return;
    };

    if ((valueDate?.includes("/") && valueDate.length === 10) || (valueDate?.includes("-") && valueDate.length === 10)) {
      const date = formatStringToDate({ date: valueDate, format: "DD/MM/YYYY" });
      if (date?.isValid) {
        onKeyPress && onKeyPress(formatDateToString({ date, format: "DD/MM/YYYY" }));
        setValueInput(() => formatDateToString({ date, format: "DD/MM/YYYY" }));
      }
    }
    if (valueDate?.length === 8) {
      const arrDate = [];
      for (const number of valueDate) {
        arrDate.push(number);
      }
      arr = arrDate;
      const stringDate = arr.map((item, index) => index === 1 || index === 3 ? `${item}/` : item).join("");
      if (stringDate.length === 10) {
        checkIsValidDate(stringDate);
      }
    }
    if ((arr.length === 10 && arr.includes("-")) || (arr.length === 10 && arr.includes("/"))) {
      const stringDate = arr.join("");
      if (stringDate.length === 10) {
        checkIsValidDate(stringDate);
      }
    } else if (arr.length === 8) {
      const stringDate = arr.map((item, index) => index === 1 || index === 3 ? `${item}/` : item).join("");
      if (stringDate.length === 10) {
        checkIsValidDate(stringDate);
      }
    }
  };

  return (
    <DatePickerStyle>
      {title && (
        <AppTitle
          width={titleWidth}
          height={heightAppDate && heightAppDate + 8}
        >
          <span>{title}</span>
          {required && <RequiredComponent> *</RequiredComponent>}
        </AppTitle>
      )}

      <AppWapperInput>
        <DatePicker
          {...rest}
          id="app-datepicker-id"
          name={name}
          showTime={showTime}
          {...(showTime ? { locale: localeDateTime, format: undefined } : { locale: localeDate, format })}
          onChange={(date, dateString) => {
            onChange && onChange(date, dateString);
            setValueInput(() => date);
          }}
          defaultValue={defaultValue}
          placeholder={placeholder ?? "Chọn ngày"}
          picker={picker ?? "date"}
          disabledDate={disabledDate}
          onBlur={e => {
            const value = e.target.nodeValue;
            console.log(e.target);
            !value?.includes("/") && value?.length === 8 && onBlurDate(e);
            onBlurForm && onBlurForm();
          }}
          onKeyDown={(e) => onKeyPress && handleDate(e)}
          value={setValueDate(valueInput, showTime)}
          status={status ?? ""}
          defaultPickerValue={!value && !valueInput ? getToDay() : undefined}
        />
        {validateText && <div className="validate">{validateText}</div>}
        {status && <ErrorMessage>{errorMessage ?? ""}</ErrorMessage>}
      </AppWapperInput>
    </DatePickerStyle>
  );
}
