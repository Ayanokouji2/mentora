import React from "react";
import Sidebar from "./Sidebar";
const AppLayout = ({ children }) => {
  return (
    <div className="flex h-dvh custom-font">
      {" "}
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default AppLayout;
