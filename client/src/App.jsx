import { Button } from "@/components/ui/button";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { serverUrl } from "./constants/config";
import { userExists, userNotExists } from "./redux/slices/auth";
import { toast } from "sonner";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const getMyProfile = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/v1/student/profile`, {
        withCredentials: true,
      });
      console.log("data", data);
      if (data.success) {
        dispatch(userExists(data.data));
      }
    } catch (err) {
      dispatch(userNotExists());
      toast.error(err.message || err.response?.data?.message);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, [dispatch]);

  return (
    <div>
      <Button>Welcome</Button>
    </div>
  );
};

export default App;
