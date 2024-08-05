import { createContext } from "react";
import { Form, FormInstance } from "antd";

interface EditableRowProps {
  index: number
}

export const EditableContext = createContext<FormInstance<any> | null>(null);

export default function EditTableRow({ index, ...props }: EditableRowProps) {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
}
