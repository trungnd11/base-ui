import dayjs from "dayjs";
import { useRef } from "react";
import * as yup from "yup";
import AppButton from "@components/appButton/AppButton";
import AppInput from "@components/appInput/AppInput";
import FormCommon from "@components/form/formCommon/FormCommon";
import { isWithinNumberDays } from "@helper/functionCommon";
import { IFormRef, OptionsFormType } from "@models/componentModels/FormCommonModel";
import AppDatePicker from "@components/appDatePicker/AppDatePicker";

const schemaSearch = yup.object({
  accountName: yup
    .string()
    .required("Tên tài khoản không bỏ trống")
    .nullable()
    .min(6, "Tên tài khoản ít nhất 6 ký tự!")
    .max(100, "Tên tài khoản tối đa 100 ký tự!"),
  accountId: yup.string().required().trim(),
  fromDate: yup.date()
    // .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }
      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }
      return true;
    }),
  toDate: yup
    .date()
    // .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
});

export interface TypeConfigLocal {
  products: any[]
};

export default function FormCommonPage() {
  const options: OptionsFormType<TypeConfigLocal> = [
    // {
    //   component: AppDatePicker,
    //   field: "fromDate",
    //   label: "Ngày khởi tạo",
    //   propsAppDatePicker: {
    //     isShowToDay: false
    //   }
    // },
    {
      component: AppDatePicker,
      field: "toDate1",
      label: "Ngày kết thúc",
      propsAppDatePicker: {
        isShowToDay: false,
        showTime: true
      }
    },
    {
      component: AppDatePicker,
      field: "toDate2",
      label: "Ngày kết thúc",
      propsAppDatePicker: {
        isShowToDay: false
      }
    },
    {
      component: AppInput,
      field: "accountName",
      label: "Tên tài khoản",
      dependentField: ["accountId"],
      optionValueInput: {
        formatMoney: false,
      },
      propsAppInput: {
        optionValueInput: { formatMoney: true }
      }
    },
    {
      component: AppInput,
      field: "accountId",
      label: "Mã tài khoản",
      multiple: true,
      propsAppInput: {
        optionValueInput: {
          regExp: /^\w*$/
        }
      }
    },
  ];

  const ref = useRef<IFormRef>();

  return (
    <>
      <FormCommon
        formItem
        ref={ref}
        schema={schemaSearch}
        options={options}
        initValueForm={{ accountName: "1" }}
        onHandleSubmit={(value) => console.log({ value })}
      />
      <AppButton name="Reset" onClick={() => {
        // ref.current?.reset();
        ref.current?.handleReset && ref.current?.handleReset();
      }} />
    </>
  );
}
