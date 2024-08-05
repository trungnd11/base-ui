import { Spin } from "antd";
import { Suspense, useEffect, useMemo } from "react";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@components/breadcrumb/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { SiderBarStore, closeMobileMenu, toggleMenuSlider } from "@store/sider/sider";
import { flattenTreeArray } from "@helper/functionCommon";
import { getSitesMapStore } from "@store/sitesMap/sitesMap";
import { isEmptyArray } from "@utils/arrayUtil";
import { ContentWapperProps } from "@models/layoutModel/ContentWapperModel";
import SiderBar from "../SiderBar/SiderBar";
import { ContentLoading, SliderListMenu } from "./contentWapperStyle";
import { handleAutoWidth, mapRoutersPage } from "./handleContentWapper";
import * as routerLocal from "@routers/routers";
import { PathEnum } from "@enum/PathEnum";

export default function ContentWapper({ routers, basename }: ContentWapperProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collapsed } = useAppSelector(SiderBarStore);
  const { privileges } = useAppSelector(getSitesMapStore);
  const { showMenuM } = useAppSelector(SiderBarStore);
  const dispatch = useAppDispatch();

  const routersSider = useMemo(() => mapRoutersPage(flattenTreeArray(isEmptyArray(routers) ? routerLocal.default : routers)), [routers]);

  useEffect(() => {
    handleAutoWidth(collapsed);
  }, [collapsed]);

  useEffect(() => {
    if ((pathname === PathEnum.PATH_HOME || pathname === basename) && !isEmptyArray(privileges)) {
      navigate(privileges[0]?.path, { replace: true });
    }
  }, [pathname, navigate, privileges]);

  // Check to set show menu mobile to false when user zoom
  let prevWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;

    if (currentWidth !== prevWidth) {
      dispatch(closeMobileMenu());
      prevWidth = currentWidth;
    }
  });

  return (
    <>
      <Breadcrumbs />
      <Suspense
        fallback={
          <ContentLoading className="loading">
            <Spin tip="Loading, please..." />
          </ContentLoading>
        }
      >
        <Routes>
          {routersSider}
        </Routes>
      </Suspense>

      {showMenuM && (
          <SliderListMenu onClick={() => dispatch(toggleMenuSlider())}>
            <div
              className="list-menu-slider"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <SiderBar />
            </div>
          </SliderListMenu>
      )}
    </>
  );
}
