import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "..";

export interface TypeSiteMap {
  loading: boolean
  sitesMap: any[]
  privileges: any[]
};

const initialState: TypeSiteMap = {
  loading: true,
  sitesMap: [],
  privileges: [],
};

const SitesMap = createSlice({
  name: "sitesMap",
  initialState,
  reducers: {},
});

export const getSitesMapStore = (state: RootState) => state.sitesMap;
export default SitesMap.reducer;
