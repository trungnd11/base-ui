import AppUploadFile from "@components/appUploadFile/AppUploadFile";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";

const meta = {
  title: "Components/AppUpload",
  component: AppUploadFile,
  argTypes: {},
  args: { },
} satisfies MetaComponent<typeof AppUploadFile>;

export default meta;

export const Default = {
  args: {
    title: "AppUpload",
  }
} satisfies StoryComponent<typeof meta>;
