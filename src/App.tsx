import "./index.scss";
import ErrorBoundary from "@components/errorBoundary/ErrorBoundary";
import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Container = lazy(() => import("@layout/Container/Container"));
const Login = lazy(() => import("@pages/login/Login"));

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Container />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
