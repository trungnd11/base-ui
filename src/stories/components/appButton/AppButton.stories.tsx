import AppButton from "@components/appButton/AppButton";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";

const meta = {
  title: "Components/AppButton",
  component: AppButton,
  argTypes: {
    loading: {
      type: "boolean",
    }
  }
} satisfies MetaComponent<typeof AppButton>;

export default meta;

export const Default = {
  args: {
    name: "AppButton",
  }
} satisfies StoryComponent<typeof meta>;
