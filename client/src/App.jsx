import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { toast } from "sonner";

import { serverUrl } from "./constants/config";
import { userExists, userNotExists } from "./redux/slices/auth";

const Attendance = lazy(() => import("./pages/attendance/Attendance"));
const Home = lazy(() => import("./pages/home/Home"));
const StudentLogin = lazy(() => import("./pages/auth/student/Login"));
const StudentSignUp = lazy(() => import("./pages/auth/student/SignUp"));
const TeacherLogin = lazy(() => import("./pages/auth/teacher/Login"));
const CreateAttendance = lazy(() =>
  import("./pages/attendance/CreateAttendance")
);
const Profile = lazy(() => import("./pages/profile/Profile"));
const Unauthorized = lazy(() => import("./pages/misc/Unauthorized"));
const ProtectRoute = lazy(() => import("./_components/auth/protectRoute"));

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/v1/auth/me`, {
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
        toast.error(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      }
    };

    getMyProfile();
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          element={
            <ProtectRoute user={user} allowedRole="teacher" redirect="/" />
          }
        >
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/create-attendance" element={<CreateAttendance />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectRoute user={!user} redirect="/profile" />}>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-signup" element={<StudentSignUp />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Suspense>
  );
};

export default App;
