import AppDatePicker from "@components/appDatePicker/AppDatePicker";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/AppDatePicker",
  component: AppDatePicker,
  argTypes: {

  },
  args: { onClick: fn() },
} satisfies MetaComponent<typeof AppDatePicker>;

export default meta;

export const Default = {
  args: {
    name: "AppDatePicker",
  }
} satisfies StoryComponent<typeof meta>;
