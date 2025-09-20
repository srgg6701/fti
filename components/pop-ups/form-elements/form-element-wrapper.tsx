import { ReactElement } from "react";

import { Header4Left } from "@/components/pop-ups/styled-popup-header";
export default function FormElementWrapper({
  header4,
  children,
  id,
  wrapperClass = "",
}: {
  header4: string;
  children: ReactElement;
  id?: string;
  wrapperClass?: string;
}) {
  return (
    <div className={wrapperClass} id={`${id || ""}`}>
      <Header4Left>{header4}</Header4Left>
      {children}
    </div>
  );
}
