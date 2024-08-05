import AppTable from "@components/appTable/AppTable";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";

const meta = {
  title: "Components/AppTable",
  component: AppTable,
  argTypes: {},
  args: {
  },
} satisfies MetaComponent<typeof AppTable>;

export default meta;

export const Default = {
  args: {
    columns: [
      {
        title: "STT",
        dataIndex: "stt",
        width: 50,
        align: "center",
        fixed: "left",
        render: (_value, _record, index) => {
          return index;
        },
      },
      {
        title: "Số tài khoản",
        dataIndex: "accountNo",
        width: 150,
      },
      {
        title: "Tên tài khoản",
        dataIndex: "accountName",
        width: 200,
      },
      {
        title: "Gợi nhớ",
        dataIndex: "accountMnemonic",
      },
      {
        title: "Loại tiền",
        dataIndex: "currency",
        align: "center",
      },
      {
        title: "KH tham chiếu",
        dataIndex: "refCustId",
      },
      {
        title: "Thời gian tạo",
        dataIndex: "createDate",
        align: "center",
      },
      {
        title: "Người tạo",
        dataIndex: "createBy",
      },
      {
        title: "Thời gian sửa",
        dataIndex: "updateDate",
        align: "center",
      },
      {
        title: "Người sửa",
        dataIndex: "updateBy",
      },
      {
        title: "Ngày đóng tài khoản",
        dataIndex: "closingDate",
        align: "center",
      },
    ],
    dataSource: [
      {
        accountNo: "accountNo",
        accountName: "accountName",
        accountMnemonic: "accountMnemonic",
        currency: "currency",
        refCustId: "refCustId",
        createDate: "createDate",
        createBy: "createBy",
        updateDate: "updateDate",
        updateBy: "updateBy",
        closingDate: "closingDate",
      }
    ]
  }
} satisfies StoryComponent<typeof meta>;
