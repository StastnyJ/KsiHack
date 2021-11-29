import React from "react";

interface IProps {
  logout: (info: { returnTo: string }) => void;
  user?: {
    name?: string;
  };
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated, user, logout }: IProps) {
  console.log(isAuthenticated, user, logout);
  return <></>;
}
