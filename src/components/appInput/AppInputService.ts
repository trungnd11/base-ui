import { KeyboardEvent } from "react";
import { OptionValueInput, ValueType } from "@models/componentModels/AppInputModel";
import { trimEndValue, trimStartValue, trimValue } from "@utils/stringUtil";
import { formatMoney } from "@helper/helper";

export const listKeyNameActive = ["c", "v", "x", "Tab"];

export const listKeyCodeActive = [8, 46];

export const handleKeyDownCheckNumber = (event: KeyboardEvent<HTMLInputElement>) => {
  const keyCode = event.which || event.keyCode;
  const keyName = event.key;
  const isSideNumberKey = (keyCode >= 96 && keyCode <= 105) || (keyCode >= 48 && keyCode <= 57);
  const isValidKey = isSideNumberKey || listKeyCodeActive.includes(keyCode) || listKeyNameActive.includes(keyName);

  if (!isValidKey) {
    event.preventDefault();
  }
};

export const handleKeyDownCheckOptions = (event: KeyboardEvent<HTMLInputElement>, optionValueInput: OptionValueInput) => {
  // const keyCode = event.code;
  const { noSpecialCharacters } = optionValueInput;
  if (noSpecialCharacters) {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharacters.test(event.key)) {
      event.preventDefault();
    }
  }
  // if (keyCode === KeyCodeEnum.SPACE && trim) {
  //   event.preventDefault();
  // }
};

export const handleValueInput = (value: ValueType, optionValueInput?: OptionValueInput) => {
  if (!optionValueInput) return value;
  if (optionValueInput) {
    const { trim, upperCase, trimEnd, trimStart, regExp } = optionValueInput;
    if (regExp && typeof value === "string") {
      const isValid = regExp.test(value);
      if (isValid && value) return value;
      if (isValid && !value) return "";
      if (!isValid && value) return trimValue(value);
    }

    if (typeof value === "string" && optionValueInput.formatMoney) {
      const regexPattern = /^[1-9][0-9]*/;
      if ((!isNaN(+value.replace(/,/g, "")) &&
        +value !== 0 &&
        regexPattern.test(value)) ||
        value.length === 0) {
        return formatMoney(value);
      }
    }
    if (typeof value === "string" && upperCase) {
      if (typeof value === "string" && trim) return trimValue(value.toUpperCase());
      if (typeof value === "string" && trimStart) return trimStartValue(value.toUpperCase());
      if (typeof value === "string" && trimEnd) return trimEndValue(value.toUpperCase());
      return value.toUpperCase();
    }
    if (typeof value === "string" && trim) return trimValue(value);
    if (typeof value === "string" && trimStart) return trimStartValue(value);
    if (typeof value === "string" && trimEnd) return trimEndValue(value);
  }
  return value;
};

export const isEnterNumber = (type?: string, formatMoney?: boolean) => type === "tel" || formatMoney;
