import AppSelect from "@components/appSelect/AppSelect";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";
import { fn } from "@storybook/test";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@store/index";

const meta: any = {
  title: "Components/AppSelect",
  component: AppSelect,
  argTypes: {},
  args: {
    onClick: fn(),
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
    ]
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
} satisfies MetaComponent<typeof AppSelect>;

export default meta;

export const Default = {
} satisfies StoryComponent<typeof meta>;
