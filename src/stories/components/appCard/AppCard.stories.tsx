import AppCard from "@components/appCard/AppCard";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/AppCard",
  component: AppCard,
  argTypes: {},
  args: {
    onClick: fn(),
  },
} satisfies MetaComponent<typeof AppCard>;

export default meta;

export const Default = {
  args: {
    contents: "AppCard",
    size: "small",
    extra: "",
    loading: false,
    bordered: true
  }
} satisfies StoryComponent<typeof meta>;
