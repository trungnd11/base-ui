import { configureStore, Store } from "@reduxjs/toolkit";
import { rootReducer, TypeReducer } from "./reducer";

export const store: Store<TypeReducer> = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
