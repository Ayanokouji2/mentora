import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { toast } from "sonner";

import { serverUrl } from "./constants/config";
import { userExists, userNotExists } from "./redux/slices/auth";

const Attendance = lazy(() => import("./pages/attendance/Attendance"));
const Home = lazy(() => import("./pages/home/Home"));
const StudentLogin = lazy(() => import("./pages/auth/student/Login"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/v1/student/profile`, {
          withCredentials: true,
        });
        console.log("data", data);
        if (data.success) {
          dispatch(userExists(data.data));
        } else {
          dispatch(userNotExists());
        }
      } catch (err) {
        dispatch(userNotExists());
        toast.error(err.response?.data?.message || err.message || "Something went wrong");
      }
    };

    getMyProfile();
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/student-login" element={<StudentLogin />} />
      </Routes>
    </Suspense>
  );
};

export default App;
