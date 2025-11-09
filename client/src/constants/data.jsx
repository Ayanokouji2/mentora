import { User, NotebookPen, GraduationCap, Book, Calendar } from "lucide-react";
import studentLogin from "../assets/student_login.png";
import teacherLogin from "../assets/teacher_login.png";
import adminLogin from "../assets/admin_login.png";

const navLinks = [
  {
    id: 1,
    name: "Profile",
    link: "/profile",
    icon: <User size={24} strokeWidth={1} />,
    permission: ["student", "teacher", "admin"],
  },
  {
    id: 2,
    name: "View Attendance",
    link: "/attendance",
    icon: <NotebookPen size={24} strokeWidth={1} />,
    permission: ["student", "teacher", "admin"],
  },
  {
    id: 3,
    name: "Marks/Grades",
    link: "/marks",
    icon: <GraduationCap size={24} strokeWidth={1} />,
    permission: ["teacher", "admin"],
  },
  {
    id: 4,
    name: "Take Attandance ",
    link: "/create-attendance",
    icon: <Calendar size={24} strokeWidth={1} />,
    permission: ["teacher", "admin"],
  },
];

const home_cards = [
  {
    id: 1,
    img: studentLogin,
    title: "Student Login",
    description: "Books are the best way to learn new things",
    link: "/student-login",
  },
  {
    id: 2,
    img: teacherLogin,
    title: "Teacher Login",
    description: "Books are the best way to learn new things",
    link: "/teacher-login",
  },
  {
    id: 3,
    img: adminLogin,
    title: "Admin Login",
    description: "Books are the best way to learn new things",
    link: "/admin-login",
  },
];

const class_names = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
  {
    id: 6,
    name: "6",
  },
  {
    id: 7,
    name: "7",
  },
  {
    id: 8,
    name: "8",
  },
  {
    id: 9,
    name: "9",
  },
  {
    id: 10,
    name: "10",
  },
  {
    id: 11,
    name: "11",
  },
  {
    id: 12,
    name: "12",
  },
];

const sections = [
  {
    id: 1,
    name: "A",
  },
  {
    id: 2,
    name: "B",
  },
  {
    id: 3,
    name: "C",
  },
  {
    id: 4,
    name: "D",
  },
];

const periods = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
  {
    id: 6,
    name: "6",
  },
  {
    id: 7,
    name: "7",
  },
  {
    id: 8,
    name: "8",
  },
  {
    id: 9,
    name: "9",
  },
  {
    id: 10,
    name: "10",
  },
];

const subjects = [
  {
    id: 1,
    name: "Math",
  },
  {
    id: 2,
    name: "Science",
  },
  {
    id: 3,
    name: "English",
  },
  {
    id: 4,
    name: "Hindi",
  },
  {
    id: 5,
    name: "Social Studies",
  },
  {
    id: 6,
    name: "Computer Science",
  },
  {
    id: 7,
    name: "Physics",
  },
];

export { navLinks, home_cards, class_names, sections, periods, subjects };
