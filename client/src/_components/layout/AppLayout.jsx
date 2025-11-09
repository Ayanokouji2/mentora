import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-dvh custom-font">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-white shadow">
          <Header />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
