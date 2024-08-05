import { formatDateToString, formatYearToDate, isDate } from "@utils/dateUtil";
import { isArray } from "@utils/arrayUtil";
import { isObject } from "@utils/objectUtil";
import { GroupOptionsType, OptionFormType } from "@models/componentModels/FormCommonModel";

export const getInitLayout = (item: OptionFormType | GroupOptionsType) => {
  return {
    xs: item.layout?.xs ?? 24,
    sm: item.layout?.sm ?? 24,
    md: item.layout?.md ?? 12,
    lg: item.layout?.lg ?? 12,
    xl: item.layout?.xl ?? 8,
    xxl: item.layout?.xxl ?? 6
  };
};

export const getInitValue = (option: OptionFormType) => {
  if (option.multiple && !option.initValue) {
    return [];
  }
  if (isDate(option.initValue)) {
    return formatDateToString({ date: option.initValue });
  }
  if (isArray(option.initValue)) {
    return null;
  }
  if (isObject(option.initValue)) {
    return option.initValue.value;
  }
  return option.initValue;
};

export const checkAndSetInitValue = (option: OptionFormType, value: any) => {
  const { typeComponent, viewDateType } = option;
  if (typeComponent === "date" && typeof value === "string") {
    if (viewDateType === "year") {
      return formatYearToDate(value);
    }
    return formatDateToString({ date: value });
  }
  return value;
};

export const initFromData = (options: OptionFormType[],
  initValueForm: Record<string, any> | undefined,
  setFormValue: React.Dispatch<React.SetStateAction<Record<string, any> | undefined>>) => {
  const form: any = {};
  for (const option of options) {
    form[option.field] = (initValueForm && initValueForm?.[option.field])
      ? checkAndSetInitValue(option, initValueForm[option.field])
      : option?.initValue ? getInitValue(option) : null;
  }
  setFormValue(form);
};

export const getOptionApp: any = (option: OptionFormType, config: any) => {
  const { typeSelectAsync } = option;
  if (typeSelectAsync) {
    return config[typeSelectAsync];
  }
  return option.optionSelect;
};
