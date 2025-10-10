import React, { useEffect, useState } from "react";
import { navLinks } from "../../constants/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, PanelRightOpen } from "lucide-react";

const Sidebar = () => {
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapse(true);
      } else {
        setIsCollapse(false);
      }
    };

    handleResize(); // run initially
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCollapseSidebar = () => {
    setIsCollapse((prev) => !prev);
  };

  return (
    <div
      className={`h-full flex flex-col justify-between p-4 border-r bg-slate-50 transition-all duration-300 
      ${isCollapse ? "w-20 items-center" : "w-64"}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-6 w-full ${
          isCollapse ? "flex-col gap-2" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <ShoppingBag size={24} />
          {!isCollapse && (
            <span className="font-semibold text-lg">Mentora</span>
          )}
        </div>
        <PanelRightOpen
          className={`cursor-pointer transition-transform duration-300 ${
            isCollapse ? "rotate-180" : ""
          }`}
          onClick={handleCollapseSidebar}
        />
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto w-full">
        {navLinks?.map(({ id, link, name, icon: Icon }) => (
          <Link
            key={id}
            to={link}
            className={`flex items-center p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200
             ${isCollapse ? "justify-center" : "gap-3"}`}
          >
            {Icon}
            {!isCollapse && <span>{name}</span>}
          </Link>
        ))}
      </div>

      {/* Footer / Button */}
      <div className="mt-4 w-full">
        {isCollapse ? (
          <Button size="icon">
            <span className="text-sm">L</span>
          </Button>
        ) : (
          <Button className="w-full">Login</Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
