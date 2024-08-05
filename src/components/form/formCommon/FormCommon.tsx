import { useState, useEffect, useImperativeHandle, forwardRef, useMemo } from "react";
import { Col, Collapse, Form, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SearchOutlined } from "@ant-design/icons";
import { FormCommonProps, OptionFormType, RequiredListType } from "@models/componentModels/FormCommonModel";
import { formatDateToString, isDate } from "@utils/dateUtil";
import { useAppSelector } from "@store/hook";
import { getConfigStore } from "@store/configSelects/configSelects";
import AppCheckbox from "@components/appCheckbox/AppCheckbox";
import { isEmptyObject, isObject } from "@utils/objectUtil";
import AppCard from "@components/appCard/AppCard";
import { getInitLayout, getOptionApp, initFromData } from "./FromCommonServices";
import FromButtonCommon from "./FromButtonCommon";
import FormInput from "../formInput/FormInput";
import { FormBodyItemStyle, FormSearchCommontStyle, HeaderSearch } from "./formCommonStyle";
import { trimValue } from "@utils/stringUtil";
import { removeSpace } from "@helper/functionCommon";

const { Panel } = Collapse;

function FormCommon<T>(props: FormCommonProps<T>, ref: any) {
  const {
    options,
    gutter,
    children,
    titleSearch,
    titleResult,
    layoutCommon,
    initValueForm,
    onSearch,
    layoutWrapperButton,
    onChange,
    formItem,
    schema,
    onHandleSubmit,
    resetField,
    noBorder,
    values,
    layout = "horizontal",
    isCreatePolicy = false,
    groupOptions,
    onSearchAsync
  } = props;
  const { config } = useAppSelector(getConfigStore);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<Record<string, any> | undefined>();
  const [requiredList, setRequiredList] = useState<RequiredListType[]>();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const { control, formState, handleSubmit, reset, trigger, setValue, watch } = useForm({
    mode: "all",
    resolver: schema ? yupResolver(schema) : undefined,
    values,
    defaultValues: initValueForm,
    reValidateMode: "onBlur",
  });

  const handleReset = () => {
    const formReset: Record<string, any> = {};
    if (values && isObject(values) && !isEmptyObject(values)) {
      for (const key in values) {
        formReset[key] = initValueForm?.[key] ?? "";
      }
      reset(formReset);
      reset(formState);
    }
  };

  useImperativeHandle(
    ref, () => ({
      reset,
      setValue,
      setFormValue,
      handleReset,
      trigger
    }));

  const getRequiredComponent = () => {
    const listRequired: RequiredListType[] = [];
    for (const item of options) {
      if (item?.required) {
        listRequired.push(
          {
            field: item.field,
            errorMessage: `${item.label} không được để trống`,
            required: initValueForm ? !initValueForm[item.field] : true
          });
      }
    };
    setRequiredList(listRequired);
  };

  const checkErrorField = (item: OptionFormType) =>
    requiredList?.find(required => required.field === item.field)?.required;

  const handleChange = (field: string, value: string) => {
    const fieldRequired = requiredList?.find(item => item.field === field);
    if (fieldRequired && !isSearch && !value) {
      setRequiredList(pre => pre?.map(item => {
        if (item.field === fieldRequired.field) {
          return {
            ...fieldRequired, required: true
          };
        }
        return { ...item };
      }));
      setIsSearch(true);
    }
    if (fieldRequired && value) {
      setRequiredList(pre => pre?.map(item => {
        if (item.field === fieldRequired.field) {
          return {
            ...fieldRequired, required: false
          };
        }
        return { ...item };
      }));
      setIsSearch(false);
    }
    onChange && onChange({ field, value, setValue });

    setFormValue(pre => ({ ...pre, [field]: value }));
  };

  const handleSearch = () => {
    const form: any = {};
    for (const field in formValue) {
      const fieldRequired = requiredList?.find(item => item.field === field);
      if (fieldRequired?.required && !formValue[field]) {
        setRequiredList(pre => pre?.map(item => {
          if (item.field === fieldRequired.field) {
            return {
              ...fieldRequired, required: true
            };
          }
          return { ...item };
        }));
        setIsSearch(true);
        return;
      }
      setIsSearch(false);
      if (isDate(formValue[field])) {
        const option = options.find(item => item.field === field);
        if (option) {
          if (option.viewDateType === "year") {
            form[field] = formValue[field].year().toString();
          } else {
            form[field] = formatDateToString({ date: formValue[field] });
          }
        }
      } else {
        form[field] = typeof formValue[field] === "string" ? trimValue(formValue[field]) : formValue[field];
      }
    };
    onSearch && onSearch(form);
  };

  const onSubmit = (formValue: FieldValues) => {
    const form: any = {};
    for (const field in formValue) {
      const option = options.find(item => item.field === field);
      if (option?.multiple) {
        if (option && typeof formValue[field] === "string" && formValue[field]?.includes(",")) {
          const value = formValue[field] as string;
          const listArr = value.split(",");
          form[field] = listArr.map(item => removeSpace(item));
        } else {
          form[field] = formValue[field] ? [formValue[field]] : [];
        }
        continue;
      }
      if (isDate(formValue[field])) {
        const option = options.find(item => item.field === field);
        if (option) {
          if (option.viewDateType === "year") {
            form[field] = formValue[field].year().toString();
          } else if (option.propsAppDatePicker?.showTime) {
            form[field] = formatDateToString({ date: formValue[field], format: "DD/MM/YYYY HH:mm:ss" });
          } else {
            form[field] = formatDateToString({ date: formValue[field] });
          }
        }
        continue;
      }
      form[field] = typeof formValue[field] === "string" ? trimValue(formValue[field]) : formValue[field];
    };

    const confirmFunction = onHandleSubmit instanceof Function ? onHandleSubmit(form) : undefined;
    if (confirmFunction instanceof Promise) {
      setIsLoadingSubmit(true);
      confirmFunction.then(() => {
        setIsLoadingSubmit(false);
      }).catch(_err => {
        setIsLoadingSubmit(false);
      });
    }
    // onHandleSubmit && onHandleSubmit(form);
  };

  const generateOptions = useMemo(() => {
    if (groupOptions) {
      const groupFields = groupOptions.reduce((acc: string[], obj) => acc.concat(obj.fields), []);
      const notGroupFields = options.filter(option => !groupFields.includes(option.field));
      return notGroupFields;
    }
    return options;
  }, [options, groupOptions]);

  const FormBodySearch = (
    <Row gutter={gutter ?? [32, 10]}>
      {
        options?.map((item, index) => {
          return (
            <Col key={index}
              {...(layoutCommon ? { ...layoutCommon } : { ...getInitLayout(item) })}
            >
              <item.component
                title={item.label}
                onBlurInput={(value: string) => handleChange(item.field, value)}
                onChange={(value: any, _option: any) => handleChange(item.field, value)}
                placeholder={`${item.typeSelectAsync ? "Chọn" : ""} ${item.typeSelectAsync ? item.label?.toLocaleLowerCase() : item.label}`}
                picker={"year"}
                options={getOptionApp(item, config)}
                defaultValue={item?.initValue ?? formValue?.[item.field]}
                allowClear={item?.allowClearSelect ?? false}
                status={isSearch && checkErrorField(item) ? "error" : ""}
                errorMessage={requiredList?.find(required => required.field === item.field)?.errorMessage}
                required={item.required}
              />
            </Col>
          );
        })
      }
      <Col {...(layoutWrapperButton ? { ...layoutWrapperButton } : { span: 24 })}>
        <FromButtonCommon {...props} formState={formState} handleSearch={handleSearch} />
      </Col>
    </Row>
  );

  // const isValidComponent = (component: any) => {
  //   return typeof component === "string" || (typeof component === "function" && component.prototype.isReactComponent);
  // };

  const generateFormItem = (item: OptionFormType, index: number) => {
    return item.hidden
      ? null
      : <Col key={index} {...(layoutCommon ? { ...layoutCommon } : { ...getInitLayout(item) })}>
        {item.invisible
          ? null
          : <FormInput
            className={item.component === AppCheckbox ? "checkbox" : ""}
            {...item}
            name={item.field}
            label={item.label}
            extraLabel={item.extraLabel}
            TypeComponent={item.component}
            control={control}
            formState={formState}
            schema={schema}
            trigger={trigger}
            dependentField={item.dependentField}
            onChange={(value) => handleChange(item.field, value)}
            content={values?.content}
            onSearchAsync={value => onSearchAsync && onSearchAsync({ field: item.field, value })}
            allowClear={item.allowClearSelect}
          />
        }
      </Col>;
  };

  const handleFormBodyItemWithGroup = () => {
    if (groupOptions) {
      const renderGroupField = groupOptions?.map((group, index) => {
        const findOptions = options.filter(option => group.fields.includes(option.field))
          .sort((a, b) => group.fields.indexOf(a.field) - group.fields.indexOf(b.field));
        return (
          <group.renderWapper key={index}>
            <Row gutter={[32, 10]}>
              {
                findOptions.map(item => {
                  return item.hidden
                    ? null
                    : generateFormItem(item, index);
                })
              }
            </Row>
          </group.renderWapper>
        );
      });

      return renderGroupField;
    }
  };

  const FormBodyItem = (
    <Form
      onFinish={handleSubmit(onSubmit)}
      ref={ref}
      layout={layout}
    >
      {
        <>
          {handleFormBodyItemWithGroup()}
          <Row gutter={[32, 10]}>
            {
              generateOptions.map((item, index) => {
                return item.hidden
                  ? null
                  : generateFormItem(item, index);
              })
            }
            <Col
              className={`${isCreatePolicy ? "action-container" : ""}`}
              {...(layoutWrapperButton ? { ...layoutWrapperButton } : { span: 24 })}
            >
              <FromButtonCommon {...props} formState={formState} reset={reset} loading={isLoadingSubmit} />
            </Col>
          </Row>
        </>
      }
    </Form>
  );

  useEffect(() => {
    initFromData(options, initValueForm, setFormValue);
    getRequiredComponent();
  }, []);

  useEffect(() => {
    reset();
  }, [resetField]);

  useEffect(() => {
    values ? setFormValue(values) : setFormValue(initValueForm);
  }, [values]);

  useEffect(() => {
    const subscription = watch((form, { name, type }) => {
      if (type === "change" && name) {
        const valueChange = form[name];
        if (isDate(valueChange)) {
          handleChange(name, formatDateToString({ date: valueChange }));
          trigger(name);
          return;
        }
        handleChange(name, valueChange);
      }
    }
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return noBorder
    ? <FormBodyItemStyle className={layout === "vertical" ? "vertical-form" : ""}>
      {FormBodyItem}
    </FormBodyItemStyle>
    : <FormSearchCommontStyle>
      <Collapse
        defaultActiveKey={[`1`]}
        expandIconPosition="end"
      >
        <Panel header={titleSearch ??
          <HeaderSearch>
            <SearchOutlined /><span className="title-search">{titleSearch ?? "Tìm kiếm"}</span>
          </HeaderSearch>}
          key={1}
        >
          {
            formItem && schema
              ? (
                  FormBodyItem
                )
              : (
                  FormBodySearch
                )
          }
        </Panel>
      </Collapse>
      {
        children && (
          <Row>
            <Col span={24}>
              <AppCard
                title={titleResult ?? "Kết quả tìm kiếm"}
                contents={children}
              />
            </Col>
          </Row>
        )
      }
    </FormSearchCommontStyle>
  ;
}

export default forwardRef(FormCommon);
