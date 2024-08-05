import { ReactNode } from "react";
import { Form, FormItemProps } from "antd";
import { Controller } from "react-hook-form";

import { formatDateToString, formatStringToDate, isDate } from "@utils/dateUtil";
import { FormInputStyle, RequiredComponent, TitleFormInput } from "./formInputStyle";
import AppCheckbox from "@components/appCheckbox/AppCheckbox";
import AppDatePicker from "@components/appDatePicker/AppDatePicker";
import { AppDatePickkerForm, AppInputPropsForm, AppSelectPropsForm } from "@models/componentModels/FormCommonModel";

interface PropsFormInput<T = any> extends FormItemProps {
  name: string
  label?: string | ReactNode
  extraLabel?: ReactNode
  formState?: any
  control?: any
  typeInput?: "input" | "select" | "date-picker" | "checkbox" | "radio"
  TypeComponent?: JSX.Element | any
  typeSelectAsync?: keyof T
  schema: any
  children?: ReactNode
  trigger?: any
  dependentField?: string[]
  onChange?: (value: any) => void
  content?: string
  disabled?: boolean
  onSearchAsync?: (value: string) => void
  allowClear?: boolean
  watchFields?: string[]
  propsAppInput?: AppInputPropsForm
  propsAppSelect?: AppSelectPropsForm<T>
  propsAppDatePicker?: AppDatePickkerForm
}

export default function FormInput({
  name,
  label,
  formState: { errors },
  control,
  typeInput,
  schema,
  TypeComponent,
  labelCol,
  wrapperCol,
  trigger,
  dependentField,
  onChange,
  content,
  onSearchAsync,
  propsAppInput,
  propsAppSelect,
  propsAppDatePicker,
  extraLabel,
  ...rest
}: PropsFormInput) {
  // const ItemComponent = useMemo(() => DynamicComponent(typeInput ?? "input"), [typeInput]);

  const handleOnChange = (value: any) => {
    if (value?.target) {
      onChange && onChange(value.target.value);
    } else {
      onChange && onChange(value);
    }
  };
  const component = <TypeComponent />;

  const isCheckRequired = (schema: any, name: string) => !!schema?.fields[name]?.exclusiveTests?.required;

  return (
    <FormInputStyle
      className={component?.type === AppCheckbox ? "checkbox" : ""}
    >
      <Form.Item
        {...rest}
        label={
          <TitleFormInput>
            {label} {isCheckRequired(schema, name) ? <RequiredComponent /> : null}
            { extraLabel }
          </TitleFormInput>
        }
        labelAlign="left"
        colon={false}
        validateStatus={errors?.[name] ? "error" : "success"}
        help={errors?.[name] ? errors[name].message : null}
        required={isCheckRequired(schema, name)}
      // {...(component?.type === AppDatePicker ? { valuePropName: "date" } : {})}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              TypeComponent &&
              <TypeComponent
                {...rest}
                {...field}
                disabled={rest?.disabled}
                {...propsAppInput}
                {...propsAppSelect}
                {...propsAppDatePicker}
                onBlurForm={field.onBlur}
                status={errors?.[name] ? "error" : ""}
                {...(content ? { content } : {})}
                onChange={(value: any) => {
                  if (isDate(value)) {
                    field.onChange(formatStringToDate({ date: value }));
                    dependentField && trigger(dependentField);
                    handleOnChange(formatDateToString({ date: value }));
                    return;
                  }
                  handleOnChange(value);
                  field.onChange(value);
                  dependentField && trigger(dependentField);
                }}
                {...(component?.type === AppDatePicker
                  ? {
                      onKeyPress: (stringDate: string) => {
                        stringDate ? field.onChange(formatStringToDate({ date: stringDate, format: "DD/MM/YYYY" })) : field.onChange(null);
                        dependentField && trigger(dependentField);
                      }
                    }
                  : {})}
                onSearchAsync={onSearchAsync}
              />
              // : <ItemComponent
              //   {...field} status={errors?.[name] ? "error" : ""}
              // />
            );
          }}
        />
      </Form.Item>
    </FormInputStyle>
  );
};
