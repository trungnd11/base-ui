import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { RoutersModel } from "@models/routersModel/RoutersModel";
import routers from "../../routers/routers";
import { BreadcrumbContainer } from "./breadcrumbStyle";
import { convertSiteMap } from "@helper/siteMap";
import { isEmptyArray } from "@utils/arrayUtil";
import { useAppSelector } from "@store/hook";
import { getSitesMapStore } from "@store/sitesMap/sitesMap";

interface TypeBreadcrumbs {
  name: string
  icon: string
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const { sitesMap } = useAppSelector(getSitesMapStore);
  const [breadcrumbsNameSider, setBreadcrumbsNameSider] = useState<TypeBreadcrumbs[]>();

  const breadcrumbs = (routes: RoutersModel[], preName?: TypeBreadcrumbs[]) => {
    for (let i = 0; i < routes.length; i++) {
      const breadcrumb = routes[i];
      if (breadcrumb.path === pathname) {
        if (preName) {
          setBreadcrumbsNameSider(() => [...preName, { name: breadcrumb.name, icon: breadcrumb?.icon }]);
          return;
        } else {
          setBreadcrumbsNameSider(() => [{ name: breadcrumb.name, icon: breadcrumb?.icon }]);
          return;
        }
      } else if (breadcrumb.path === "/home") {
        continue;
      } else if (breadcrumb.children) {
        preName
          ? breadcrumbs(breadcrumb.children, [...preName, { name: breadcrumb.name, icon: breadcrumb?.icon }])
          : breadcrumbs(breadcrumb.children, [{ name: breadcrumb.name, icon: breadcrumb?.icon }]);
      }
      continue;
    }
  };

  useEffect(() => {
    breadcrumbs(isEmptyArray(sitesMap) ? routers : convertSiteMap(sitesMap)[0]?.children);
  }, [pathname, sitesMap]);

  return (
    <BreadcrumbContainer id="breadcrumbs-wrapper">
      <Breadcrumb separator="/">
        {
          breadcrumbsNameSider?.map((item, index) => {
            return (
              item.name !== "Home" &&
              <Breadcrumb.Item
                key={index}
                className={index === breadcrumbsNameSider.length - 1 ? "last-item" : ""}
              >
                <span>{item.name}</span>
              </Breadcrumb.Item>
            );
          })
        }
      </Breadcrumb>
    </BreadcrumbContainer>
  );
}
