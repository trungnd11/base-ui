import { PlusOutlined } from "@ant-design/icons";
import { AppUploadFileProps } from "@models/componentModels/AppUploadFileModel";
import { Upload } from "antd";

export default function AppUploadFile(props: AppUploadFileProps) {
  const {
    title,
    fileList,
    onChange,
    onChangeInput,
  } = props;

  const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>{title ?? "Tải lên"}</div>
      </div>
  );

  return (
     <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={(e) => {
        onChange && onChange(e);
        onChangeInput && onChangeInput(e);
      }}
     >
        {fileList?.length ? fileList : uploadButton}
     </Upload>
  );
}
