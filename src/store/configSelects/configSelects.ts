import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TypeConfigData } from "@models/configDataModel/ConfigDataModel";

const initialState: TypeConfigData = {
  config: {
    applicationName: [],
  }
};

const ConfigSelects = createSlice({
  name: "configSelects",
  initialState,
  reducers: {},
});

export const getConfigStore = (state: RootState) => state.configSelect;
export default ConfigSelects.reducer;
