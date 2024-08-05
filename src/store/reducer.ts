import { combineReducers, Reducer } from "@reduxjs/toolkit";
import configSelect from "./configSelects/configSelects";
import siderBar, { TypeStateSiderBar } from "./sider/sider";
import sitesMap, { TypeSiteMap } from "./sitesMap/sitesMap";
import { TypeConfigData } from "@models/configDataModel/ConfigDataModel";
import author, { TypeStateAuthor } from "./auth/auth";

export interface TypeReducer {
  configSelect: TypeConfigData
  sitesMap: TypeSiteMap
  siderBar: TypeStateSiderBar
  author: TypeStateAuthor
}

export const rootReducer: Reducer<TypeReducer> = combineReducers({
  configSelect,
  sitesMap,
  siderBar,
  author
});
