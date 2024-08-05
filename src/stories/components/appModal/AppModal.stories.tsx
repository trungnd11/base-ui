import AppModal from "@components/appModal/AppModal";
import { MetaComponent, StoryComponent } from "../../models/BaseModel";
import AppButton from "@components/appButton/AppButton";
import { useRef } from "react";
import { RefModal } from "@models/componentModels/AppModalModel";

const ModalComponent = (props: any) => {
  const createModalRef = useRef<RefModal>();

  return (
      <>
         <AppButton
            name="AppModal"
            onClick={() => createModalRef.current?.setOpenModal(true)}
         />
         <AppModal
            {...props}
            ref={createModalRef}
         />
      </>

  );
};

const meta = {
  title: "Components/AppModal",
  component: ModalComponent,
  argTypes: {},
  args: {},
} satisfies MetaComponent<typeof AppModal>;

export default meta;

export const Default = {
  args: {
    title: "AppModal",
    content: "AppModal",
  }
} satisfies StoryComponent<typeof meta>;
