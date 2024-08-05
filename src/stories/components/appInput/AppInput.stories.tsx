import AppInput from "@components/appInput/AppInput";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";

const meta = {
  title: "Components/AppInput",
  component: AppInput,
  argTypes: {
    name: {
      type: "string"
    },
    placeholder: {
      type: "string"
    },
    allowClear: {
      defaultValue: true,
      type: "boolean"
    }
  }
} satisfies MetaComponent<typeof AppInput>;

export default meta;

export const Default = {
  args: {
    name: "AppInput",
  }
} satisfies StoryComponent<typeof meta>;
