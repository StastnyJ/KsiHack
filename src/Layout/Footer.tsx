import React from "react";

interface IProps {
  hidden: boolean;
}

export default function Footer({ hidden }: IProps) {
  return <>{!hidden && <></>}</>;
}
