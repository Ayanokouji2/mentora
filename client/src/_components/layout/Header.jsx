import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
// import { logout } from "../../redux/slices/auth";
import axios from "axios";
import { serverUrl } from "../../constants/config";
import { toast } from "sonner";
import { userNotExists } from "../../redux/slices/auth";


const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("user", user);
  const handleLogout = async () => {
    const url =
      user?.userRole === "student"
        ? `${serverUrl}/api/v1/auth/student/logout`
        : `${serverUrl}/api/v1/auth/teacher/logout`;
    console.log("url", url);
    try {
      const { data } = await axios.post(url, { withCredentials: true });
      console.log(data)
      if (data.success) {
        dispatch(userNotExists());
        toast.success("User logged out ");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something Went Wrong"
      );
    }
  };
  return (
    <div className="flex items-center justify-end p-3">
      <Popover>
        <PopoverTrigger>
          <div className="flex flex-col items-center">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h6 className="text-center">{user?.name}</h6>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Header;
