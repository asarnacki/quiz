import React from "react";
import { Navigate, Outlet } from "react-router";
import useStateContext from "../hooks/useStateContext";

export default function Auth() {
  const { context } = useStateContext();
  return context.participantID == 0 ? <Navigate to="/" /> : <Outlet />;
}
