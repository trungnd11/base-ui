import { AppCheckBoxProps } from "@models/componentModels/AppCheckboxModel";
import { Checkbox } from "antd";

function AppCheckbox(props: AppCheckBoxProps) {
  const {
    title,
    ...rest
  } = props;

  return (
      <>
         <Checkbox
            {...rest}
         >
            {title}
         </Checkbox>
      </>
  );
};

export default AppCheckbox;
