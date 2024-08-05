import { forwardRef, startTransition, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Input } from "antd";
import useHeight from "@components/hook/useHeight";
import { AppTitle, AppWapperInput, ErrorMessage, RequiredComponent } from "@components/commonStyle/CommonStyle";
import { AppInputProps } from "@models/componentModels/AppInputModel";
import { handleKeyDownCheckNumber, handleKeyDownCheckOptions, handleValueInput, isEnterNumber } from "./AppInputService";
import { AppInputStyle } from "./appInputStyle";
import { trimValue } from "@utils/stringUtil";

function AppInput(props: AppInputProps, ref: any) {
  const {
    title,
    name,
    onChangeInput,
    maxLength,
    type,
    max,
    titleWidth,
    value,
    onChange,
    formItem,
    required,
    errorMessage,
    optionValueInput,
    onBlurForm,
    ...rest
  } = props;
  const refInput = useRef<any>();
  const [valueInput, setValueInput] = useState(value);

  const heightAppInput = useHeight("app-input-id");

  useImperativeHandle(
    ref,
    () => {
      const valueInput = refInput.current;
      return ({ valueInput });
    },
    [value]
  );

  useEffect(() => {
    setValueInput(handleValueInput(value, optionValueInput));
  }, [value]);

  return (
    <AppInputStyle>
      {
        title && (
          <AppTitle className="input-title" width={titleWidth} height={heightAppInput}>
            <span>{title}</span>
            {required && <RequiredComponent> *</RequiredComponent>}
          </AppTitle>
        )
      }
      <AppWapperInput>
        <Input
          {...rest}
          allowClear={rest.allowClear ?? true}
          ref={refInput}
          id="app-input-id"
          name={name}
          maxLength={maxLength}
          type={type}
          max={max}
          value={valueInput}
          onBlur={e => {
            setValueInput(trimValue(e.target.value));
            onBlurForm && onBlurForm(trimValue(e.target.value));
          }}
          onChange={(e) => {
            startTransition(() => {
              onChange && onChange(e);
              onChangeInput && onChangeInput(e.target.value);
            });
            setValueInput(handleValueInput(e.target.value, optionValueInput));
          }}
          onKeyDown={isEnterNumber(type, optionValueInput?.formatMoney) ? handleKeyDownCheckNumber : optionValueInput?.noSpecialCharacters ? (e) => handleKeyDownCheckOptions(e, optionValueInput) : undefined}
        />
        {
          status && <ErrorMessage>{errorMessage ?? ""}</ErrorMessage>
        }
      </AppWapperInput>
    </AppInputStyle>
  );
}

export default forwardRef(AppInput);
