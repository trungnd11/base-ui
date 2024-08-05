import AppTable from "@components/appTable/AppTable";
import { ColumnsEditTable } from "@models/componentModels/AppTableModel";
import { sampleData } from "./dataConfig/dataConfig";
import AppInput from "@components/appInput/AppInput";
import AppSelect from "@components/appSelect/AppSelect";
import AppDatePicker from "@components/appDatePicker/AppDatePicker";
import { useState } from "react";

export default function AppTablePage() {
  const [dataSource, setDataSource] = useState(sampleData);

  const columns: ColumnsEditTable = [
    {
      dataIndex: "id",
      title: "ID",
    },
    {
      dataIndex: "idType",
      title: "ID Type",
      editable: {
        component: AppSelect,
        propsAppSelect: {
          options: [
            {
              value: "CCCD",
              label: "CCCD"
            },
            {
              value: "CMND",
              label: "CMND"
            },
          ]
        }
      }
    },
    {
      dataIndex: "idNo",
      title: "ID Number",
      editable: {
        component: AppInput,
        propsFormItem: {
          rules: [
            {
              required: true
            }
          ]
        }
      }
    },
    {
      dataIndex: "fullName",
      title: "Full Name",
      editable: {
        component: AppInput
      }
    },
    {
      dataIndex: "dob",
      title: "Date of Birth",
      editable: {
        component: AppDatePicker,
        propsAppDatePicker: {
          typeFormatDate: "YYYY-MM-DD"
        }
      }
    },
    {
      dataIndex: "mobiNumber",
      title: "Mobile Number",
      editable: {
        component: AppInput
      }
    },
    {
      dataIndex: "gender",
      title: "Gender",
      editable: {
        component: AppSelect,
        propsAppSelect: {
          options: [
            {
              value: "1",
              label: "Nam"
            },
            {
              value: "2",
              label: "Nữ"
            },
          ]
        }
      }
    },
    {
      dataIndex: "jobName",
      title: "Job Name",
      editable: {
        component: AppInput
      }
    },
    {
      dataIndex: "position",
      title: "Position",
      editable: {
        component: AppInput
      }
    },
    {
      dataIndex: "idIssueDate",
      title: "ID Issue Date",
      editable: {
        component: AppDatePicker,
        propsAppDatePicker: {
          typeFormatDate: "YYYY-MM-DD"
        }
      }
    }
  ];

  const handleSave = (record: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => record.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...record,
    });
    setDataSource(newData);
  };

  const columnsMap = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      }),
    };
  });

  return (
    <div>
      <AppTable
        columns={columnsMap as ColumnsEditTable}
        dataSource={dataSource}
      />
    </div>
  );
}
