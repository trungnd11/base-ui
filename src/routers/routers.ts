import { RoutersModel } from "@models/routersModel/RoutersModel";
import { generateId } from "@utils/genertateIdUtil";
import { lazy } from "react";

const FormCommonPage = lazy(async () => await import("@pages/components/FormCommon/FormCommonPage"));
const AppTablePage = lazy(async () => await import("@pages/components/AppTable/AppTablePage"));
const LoadingSeleton = lazy(async () => await import("@pages/loadingSkeletonSearch/LoadingSkeletonSearch"));
const LoadingListCard = lazy(async () => await import("@pages/loadingSkeletonListCard/LoadingSkeletonListCard"));

const routers: RoutersModel[] = [
  {
    id: generateId(),
    name: "Vui lòng chờ",
    path: "/",
    icon: "LoadingOutlined",
    element: LoadingSeleton
  },
  {
    id: generateId(),
    name: "Loading list card",
    path: "/list-card",
    icon: "LoadingOutlined",
    element: LoadingListCard
  },
  {
    id: generateId(),
    name: "Trang chủ",
    path: "/home",
    icon: "TeamOutlined",
    element: FormCommonPage,
    children: [
      {
        id: generateId(),
        name: "Components",
        path: "/components",
        element: FormCommonPage,
        children: [
          {
            id: generateId(),
            name: "FormCommon",
            path: "/component/form-common",
            element: FormCommonPage,
          },
          {
            id: generateId(),
            name: "App Table",
            path: "/component/app-table",
            element: AppTablePage
          },
        ]
      }
    ]
  }
];

export default routers;
