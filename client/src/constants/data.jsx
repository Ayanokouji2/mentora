import { User, NotebookPen, GraduationCap } from "lucide-react";

const navLinks = [
  {
    id: 1,
    name: "Profile",
    link:"/profile",
    icon: <User />,
  },
  {
    id: 2,
    name: "Attendance",
    link:"/attendance",
    icon: <NotebookPen />,
  },
  {
    id: 3,
    name: "Marks/Grades",
    link:"/marks",
    icon: <GraduationCap />,
  },
];

export { navLinks };
