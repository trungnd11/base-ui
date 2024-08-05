import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Authenticate } from "../enum/AuthorEnum";
import { useAppSelector } from "../store/hook";
import { getAuthorStore } from "../store/auth/auth";
import { PathEnum } from "../enum/PathEnum";
import { getLocalStorage } from "../helper/localStorage";

export default function AuthorizedRouter(props: { children: JSX.Element }) {
  const { children } = props;
  const auth = getLocalStorage(Authenticate.AUTH);
  const { isAuthentication } = useAppSelector(getAuthorStore);
  const navigator = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    isAuthentication ? <Navigate to="/" /> : <Navigate to="/login" />;
  }, [isAuthentication]);

  const isNotPathTemplate = !pathname.includes(PathEnum.PATH_TEMPLATE);

  const shouldRenderChildren = isNotPathTemplate && auth;
  const shouldRedirectToLogin = isNotPathTemplate && !isAuthentication;
  const shouldHandleLogout = isNotPathTemplate && isAuthentication;

  if (shouldRenderChildren) {
    return children;
  }

  if (shouldRedirectToLogin) {
    return <Navigate to="/login" />;
  }

  if (shouldHandleLogout) {
    navigator("/login");
    return null;
  }

  return null;
}
