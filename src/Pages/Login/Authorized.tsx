import React from "react";
import { useLayout } from "../../Layout/LayoutContext";
import NotLoggedinPage from "./NotLoggedinPage";

interface IProps {
  adminRequired?: boolean;
  children?: React.ReactNode;
}

export default function Authorized({ adminRequired, children }: IProps) {
  const layout = useLayout();
  const hasAccessRights = layout.isLoggedIn && (adminRequired !== true || layout.isAdmin);

  return <>{hasAccessRights ? children : <NotLoggedinPage adminRequired={adminRequired} />}</>;
}
