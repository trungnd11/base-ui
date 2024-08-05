import { GenerateOptionsProps } from "@models/componentModels/AppSelectModel";
import { isEmptyArray } from "@utils/arrayUtil";

export const generateOptions = (props: GenerateOptionsProps) => {
  const { data, fieldLabel, fieldValue, viewCodeLabel } = props;
  const options = !isEmptyArray(data)
    ? data.map(item => ({
      ...item,
      value: item?.[fieldValue] ?? item?.id ?? item.parValue ?? item?.value ?? item?.code,
      label: viewCodeLabel
        ? (`${item?.[fieldValue]} - ${item?.[fieldLabel]}` ??
          `${item?.code ?? item?.value} - ${item?.label}` ?? `${item?.code ?? item?.value} - ${item?.name}`)
        : (item?.[fieldLabel] ?? item?.label ?? item?.name)
    }))
    : [];

  options.sort((a, b) => a.label.localeCompare(b.label, "vi"));

  return options;
};
