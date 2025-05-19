import type { JSX } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const token = useAuthStore((state) => state.accessToken);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default PrivateRoute;
