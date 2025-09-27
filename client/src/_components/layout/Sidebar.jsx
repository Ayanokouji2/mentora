import React from "react";
import { navLinks } from "../../constants/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, PanelRightOpen } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-full w-64 flex flex-col justify-between p-4 border-r">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag />
          <span className="font-semibold text-lg">Mentora</span>
        </div>
        <PanelRightOpen className="cursor-pointer" />
      </div>

      {/* Links */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {navLinks?.map(({ id, link, name, icon: Icon }) => (
          <Link
            key={id}
            to={link}
            className="flex items-center gap-3 hover:text-blue-600"
          >
            {Icon}
            <span>{name}</span>
          </Link>
        ))}
      </div>

      {/* Footer / Button */}
      <div className="mt-4">
        <Button className="w-full">Login</Button>
      </div>
    </div>
  );
};


export default Sidebar;
