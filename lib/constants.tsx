import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

// ฟังก์ชันกำหนดลิงก์การนำทาง (navLinks) สำหรับแอปพลิเคชัน
export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
];