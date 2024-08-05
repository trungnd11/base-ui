import { Select } from "antd";
import { AppSelectProps } from "@models/componentModels/AppSelectModel";
import { AppSelectStyle } from "./appSelectStyle";
import { AppTitle, AppWapperInput, ErrorMessage, RequiredComponent } from "../commonStyle/CommonStyle";
import { removeVietnameseDiacritics } from "../../helper/functionCommon";
import useHeight from "../hook/useHeight";
import { useAppSelector } from "@store/hook";
import { getConfigStore } from "@store/configSelects/configSelects";
import { isArray } from "@utils/arrayUtil";
import { initValueAll } from "@config/dataConfig";

export default function AppSelect(props: AppSelectProps) {
  const {
    placeholder,
    title,
    options,
    onChange,
    defaultValue,
    typeSelectAsync,
    allowClear,
    required = false,
    showSearch,
    addAll = false,
    titleWidth,
    errorMessage,
    status,
    filterOptions,
    combineField,
    onSearchAsync,
    ...rest
  } = props;
  const { config } = useAppSelector(getConfigStore);
  const heightAppSelect = useHeight("app-select-id");

  const getOptionApp: any = () => {
    if (typeSelectAsync && typeof typeSelectAsync === "string") {
      if (combineField?.length) {
        const data = config[typeSelectAsync].map((item: any) => {
          return {
            ...item,
            label: item.code === "NAPAS" ? item.name : combineField.map((f, index) => ` ${index !== combineField.length - 1 ? "" : "-"} ${item[f]}`)
          };
        });

        return data;
      }
      return config[typeSelectAsync];
    }
    return options;
  };

  const addSelectAll: any = () => {
    if (typeSelectAsync && typeof typeSelectAsync === "string") {
      const data = config[typeSelectAsync];
      if (filterOptions) {
        return [initValueAll].concat(data.filter((item: any) => {
          return isArray(item.cateId) ? item.cateId.includes(filterOptions) : +item.cateId === +filterOptions;
        }));
      }
      return [initValueAll].concat(data);
    }
    return options ? [initValueAll, ...options] : [];
  };

  return (
    <AppSelectStyle>
      {
        title && (
          <AppTitle width={titleWidth} height={heightAppSelect}>
            <span>{title}</span>
            {required && <RequiredComponent> *</RequiredComponent>}
          </AppTitle>
        )
      }
      <AppWapperInput>
        <Select
          {...rest}
          id="app-select-id"
          style={{ width: "100%" }}
          showSearch={showSearch ?? true}
          allowClear={allowClear ?? true}
          options={addAll ? addSelectAll() : getOptionApp()}
          placeholder={placeholder ?? "Chọn"}
          onChange={(value, option) => {
            onChange && onChange(value, option);
          }}
          filterOption={(input, option) => {
            return removeVietnameseDiacritics(option?.label?.toString().toLowerCase() ?? "")
              .includes(removeVietnameseDiacritics(input.toLowerCase())) ?? false;
          }
          }
          onSearch={(value) => setTimeout(() => {
            onSearchAsync && onSearchAsync(value);
          }, 1000)}
          status={status ?? ""}
          maxTagCount="responsive"
        />
        {
          status && <ErrorMessage>{errorMessage ?? ""}</ErrorMessage>
        }
      </AppWapperInput>
    </AppSelectStyle>
  );
}
