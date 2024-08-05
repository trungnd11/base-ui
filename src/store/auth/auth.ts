import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "..";
import { Authenticate, EIM } from "@enum/AuthorEnum";
import { removeLocalStorage } from "@helper/localStorage";

export interface TypeStateAuthor {
  loadding: boolean
  username: string
  accessToken: string
  refreshToken: string
  isAuthentication: boolean
  timeout: number
};

const initialState: TypeStateAuthor = {
  username: "",
  accessToken: "",
  refreshToken: "",
  isAuthentication: false,
  loadding: false,
  timeout: 0
};

export const clearAuthentication = () => (dispatch: any) => {
  dispatch(logout());
};

const Authorized = createSlice({
  name: "authorized",
  initialState,
  reducers: {
    getLogin: (state) => {
      state.isAuthentication = true;
    },
    logout: (state) => {
      state.isAuthentication = false;
      state.timeout = 0;
      state.username = "";
      state.accessToken = "";
      state.refreshToken = "";
      removeLocalStorage(Authenticate.AUTH);
      removeLocalStorage(Authenticate.REFRESH_TOKEN);
      removeLocalStorage(EIM.SITE_MAP);
      removeLocalStorage(Authenticate.TIME_OUT_LOGOUT);
    },
  },
  extraReducers: (_builder) => {
  },
});

export const getAuthorStore = (state: RootState) => state.author;
export const { logout, getLogin } = Authorized.actions;
export default Authorized.reducer;
