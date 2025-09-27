import React from "react";
import { navLinks } from "../../constants/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="min-h-dvh">
      <div className="flex justify-between">
        <div>
          {navLinks?.map(({ id, link, name, icon: Icon }) => (
            <Link key={id} to={link}>
              <Icon />
              <span>{name}</span>
            </Link>
          ))}
        </div>
        <div>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
