import { useMemo, useState } from "react";
import { Table } from "antd";
import { AppTableProps } from "@models/componentModels/AppTableModel";
import { generateId } from "@utils/genertateIdUtil";
import { AppTableStyle } from "./appTableStyle";
import { isEmptyArray } from "@utils/arrayUtil";
import EditTableRow from "./components/EditTableRow";
import EditTableCell from "./components/EditTableCell";

export default function AppTable<T>(props: AppTableProps<T>) {
  const {
    columns,
    dataSource,
    pageOption,
    loading,
    hidePage,
    onChangeFilter,
    rowClassName,
    scroll,
    onPage,
    locale,
    className,
    onClickRow,
    defaultPagination,
    components,
    ...rest
  } = props;

  const generateDataSource = dataSource?.map((item: any) => ({
    ...item,
    key: item.key ? item.key : `${generateId()}`
  }));
  const [rowClassActive, setRowClassActive] = useState<number>();

  const showTotal = (total: number, range: number[]) => (
    `Đang xem ${range[0]} - ${range[1]} trong tổng ${total} bản ghi`
  );

  const getRowClassName = (_record: any, index: number): any => {
    if (onClickRow) {
      return index === rowClassActive ? "ant-table-row-selected" : "";
    }
    return "";
  };

  const scrollConfig = useMemo(() => {
    if (dataSource && !isEmptyArray(dataSource) && dataSource.length > 10) {
      return scroll ? { ...scroll, y: 380 } : { x: 1000, y: 380 };
    }
    return scroll;
  }, [dataSource, pageOption?.size, scroll]);

  const componentsEdit = {
    body: {
      row: EditTableRow,
      cell: EditTableCell
    }
  };

  return (
    <AppTableStyle hidePage={hidePage} isOnRowClick={onClickRow && true}>
      <Table
        {...rest}
        bordered
        components={components ?? componentsEdit}
        loading={loading}
        columns={columns}
        dataSource={generateDataSource}
        rowSelection={rest.rowSelection}
        {...defaultPagination
          ? {}
          : {
              pagination: {
                responsive: true,
                pageSize: pageOption?.size ?? 10,
                current: pageOption?.current,
                total: pageOption?.total,
                locale: { items_per_page: "" },
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
                showTotal: (total, range) => showTotal(total, range)
              }
            }}
        onChange={(pagination, filters, _sorter) => {
          onChangeFilter && onChangeFilter(filters);
          onPage && onPage({
            page: pagination.current && pagination?.current - 1,
            size: pagination.pageSize
          });
        }}
        onRow={(record, index) => {
          return {
            onClick: () => {
              onClickRow && onClickRow(record, index);
              setRowClassActive(index);
            }
          };
        }}
        rowClassName={
          rowClassName ?? getRowClassName
        }
        className={className}
        locale={{
          triggerAsc: "Click để sắp xếp theo thứ tự tăng dần",
          triggerDesc: "Click để sắp xếp theo thứ tự giảm dần",
          cancelSort: "Click để bỏ sắp xếp",
          emptyText: locale && locale.emptyText ? locale.emptyText : "Không có dữ liệu hiển thị",
          filterReset: "Bỏ lọc",
          filterSearchPlaceholder: "Tìm kiếm",
          filterConfirm: "Lọc"
        }}
        scroll={scrollConfig}
      />
    </AppTableStyle>
  );
}
