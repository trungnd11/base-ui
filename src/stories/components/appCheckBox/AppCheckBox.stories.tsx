import AppCheckbox from "@components/appCheckbox/AppCheckbox";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";

const meta = {
  title: "Components/AppCheckbox",
  component: AppCheckbox,
  argTypes: {},
  args: { },
} satisfies MetaComponent<typeof AppCheckbox>;

export default meta;

export const Default = {
  args: {
    title: "AppCheckbox",
  }
} satisfies StoryComponent<typeof meta>;
