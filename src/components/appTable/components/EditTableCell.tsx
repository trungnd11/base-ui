import { Form } from "antd";
import { useContext, useState } from "react";
import { EditableContext } from "./EditTableRow";
import { formatDateToString, formatStringToDate, isDate } from "@utils/dateUtil";
import { isEmptyArray } from "@utils/arrayUtil";
import { EditableCellProps } from "@models/componentModels/AppTableModel";
import AppInput from "@components/appInput/AppInput";
import AppDatePicker from "@components/appDatePicker/AppDatePicker";

export default function EditTableCell({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  handleError,
  ...props
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;

  const toggleEdit = () => {
    const TypeComponent = <editable.component />;
    setEditing(!editing);
    if (TypeComponent.type === AppDatePicker) {
      const value = formatStringToDate({ date: record[dataIndex], format: editable.propsAppDatePicker?.typeFormatDate });
      form.setFieldsValue({ [dataIndex]: value });
      return;
    }
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      if (isDate(values[dataIndex])) {
        const valueDate = values[dataIndex];
        const valueStringDate = formatDateToString({ date: valueDate, format: editable.propsAppDatePicker?.typeFormatDate });
        handleSave({ ...record, [dataIndex]: valueStringDate });
        return;
      }
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      handleError && handleError(errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    const TypeComponent = <editable.component />;
    childNode = editing
      ? (
        <Form.Item
          {...editable.propsFormItem}
          style={{ margin: 0 }}
          name={dataIndex}
        >
          <editable.component
            {...editable.propsAppInput}
            {...editable.propsAppSelect}
            {...editable.propsAppDatePicker}
            onPressEnter={save}
            onBlur={save}
            {...(TypeComponent.type === AppInput)
              ? {}
              : { onChange: () => save() }}
          />
        </Form.Item>
        )
      : (
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {children}
          {
            isEmptyArray(children.filter((item: unknown) => item)) && <span className="title-edit">{title}</span>
          }
        </div>
        );
  }

  return (
    <td {...props}>{childNode}</td>
  );
}
