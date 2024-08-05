import { Space } from "antd";
import { FormState, UseFormReset } from "react-hook-form";
import { NotPermissionMessageEnum } from "@enum/RoleEnum";
import usePrivileges from "@components/hook/usePrivileges";
import { AlignComponent } from "@components/commonStyle/CommonStyle";
import { FormCommonProps } from "@models/componentModels/FormCommonModel";
import AppButton from "@components/appButton/AppButton";

interface FromButtonCommonProps<T> extends FormCommonProps<T> {
  handleSearch?: () => void
  formState?: FormState<any>
  reset?: UseFormReset<any>
  loading?: boolean
};

export default function FromButtonCommon<T>(props: FromButtonCommonProps<T>) {
  const {
    handleSearch,
    formItem,
    formState,
    reset,
    isShowBtnExport,
    isShowBtnPayBatch,
    loadingBtnSearch,
    onExport,
    onPayBatch,
    disableBtnExport,
    disableBtnPayBatch,
    labelBtnSubmit,
    typeIconBtnSubmit,
    isShowBtnCreate,
    labelBtnCreate,
    onCreate,
    disableBtnCreate,
    isShowBtnClose,
    onClose,
    isShowBtnSearch,
    isShowSubmit = true,
    isDisableSubmit = false,
    buttonAlight = "end",
    loading,
    renderButton
  } = props;
  const { create, exports } = usePrivileges();

  const ButtonBodySearch = (
    <AlignComponent notMargin align="end" alignHeight="end">
      <Space>
        {
          isShowBtnPayBatch && (
            <AppButton
              name="Thanh toán theo kỳ"
              disabled={disableBtnPayBatch}
              onClick={onPayBatch}
            />
          )
        }

        {isShowBtnSearch &&
          <AppButton
            name="Tìm kiếm"
            typeIcon="search"
            loading={loadingBtnSearch}
            onClick={handleSearch}
          />
        }

        {
          isShowBtnCreate && (
            <AppButton
              name={labelBtnCreate ?? "Tạo mới"}
              typeIcon="create"
              disabled={disableBtnCreate ?? !create}
              loading={loadingBtnSearch}
              onClick={onCreate}
              title={create ? "" : NotPermissionMessageEnum.CREATE}
            />
          )
        }

        {
          isShowBtnExport && (
            <AppButton
              name="Xuất excel"
              typeIcon="excel"
              disabled={disableBtnExport}
              loading={loadingBtnSearch}
              onClick={onExport}
              title={exports ? "" : NotPermissionMessageEnum.EXPORTS}
            />
          )
        }
        {
          renderButton && renderButton()
        }
      </Space>
    </AlignComponent>
  );

  const ButtonFormItem = (
    <AlignComponent notMargin align={buttonAlight} alignHeight="end">
      <Space>
        {
          isShowBtnPayBatch && (
            <AppButton
              name="Thanh toán theo kỳ"
              disabled={disableBtnPayBatch}
              onClick={onPayBatch}
            />
          )
        }

        {
          isShowBtnClose && (
            <AppButton
              name="Đóng"
              style={{ background: "rgb(134, 139, 136)" }}
              typeIcon="close"
              onClick={() => {
                reset && reset();
                onClose && onClose();
              }}
            />
          )
        }

        {isShowSubmit && (
          <AppButton
            name={labelBtnSubmit ?? "Submit"}
            htmlType="submit"
            typeIcon={typeIconBtnSubmit ?? "create"}
            disabled={!formState?.isValid || isDisableSubmit}
            loading={loadingBtnSearch ?? loading}
          />
        )
        }

        {
          isShowBtnExport && (
            <AppButton
              name="Xuất excel"
              typeIcon="excel"
              disabled={disableBtnExport ?? !formState?.isValid}
              loading={loadingBtnSearch}
              onClick={onExport}
              title={exports ? "" : NotPermissionMessageEnum.EXPORTS}
            />
          )
        }

        {
          isShowBtnCreate && (
            <AppButton
              name={labelBtnCreate ?? "Tạo mới"}
              typeIcon='create'
              disabled={disableBtnCreate ?? !create}
              loading={loadingBtnSearch}
              onClick={onCreate}
              title={create ? "" : NotPermissionMessageEnum.CREATE}
            />
          )
        }
        {
          renderButton && renderButton()
        }
      </Space>
    </AlignComponent>
  );

  return (
    <>
      { formItem ? ButtonFormItem : ButtonBodySearch }
    </>
  );
}
