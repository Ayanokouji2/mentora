import { User, NotebookPen, GraduationCap, Book } from "lucide-react";
import studentLogin from "../assets/student_login.png";
import teacherLogin from "../assets/teacher_login.png";
import adminLogin from "../assets/admin_login.png";

const navLinks = [
  {
    id: 1,
    name: "Profile",
    link:"/profile",
    icon: <User size={24} strokeWidth={1} />,
  },
  {
    id: 2,
    name: "Attendance",
    link:"/attendance",
    icon: <NotebookPen  size={24} strokeWidth={1}/>,
  },
  {
    id: 3,
    name: "Marks/Grades",
    link:"/marks",
    icon: <GraduationCap size={24} strokeWidth={1} />,
  },
];



const home_cards=[
  {
    id:1,
    img:studentLogin,
    title:"Student Login",
    description:"Books are the best way to learn new things",
    link:"/student-login",
  },
  {
    id:2,
    img:teacherLogin,
    title:"Teacher Login",
    description:"Books are the best way to learn new things",
    link:"/teacher-login",
  },
  {
    id:3,
    img:adminLogin,
    title:"Admin Login",
    description:"Books are the best way to learn new things",
    link:"/admin-login",
  }
]

export { navLinks,home_cards };
