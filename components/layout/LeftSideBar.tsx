"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { usecheckRole } from "@/utils/roles";

// ฟังก์ชันสำหรับแสดงแถบด้านข้าง
const LeftSideBar = () => {
  const { user } = useUser();
  const isAdmin = usecheckRole("admin");
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-8 flex flex-col gap-10 bg-gradient-to-b from-purple-500 to-pink-400 shadow-xl max-lg:hidden text-white">
      <div className="flex justify-center items-center mb-8">
        <Image
          src="/logo.png"
          alt="logo"
          width={180}
          height={80}
          className="rounded-lg shadow-lg"
        />
      </div>
      <nav className="flex flex-col gap-6">
        {navLinks
          .filter((link) => link.label !== "Customers" || isAdmin)
          .map((link) => (
            <Link
              href={link.url}
              key={link.label}
              className={`flex items-center gap-4 text-lg font-medium ${
                pathname === link.url
                  ? "text-white font-semibold bg-purple-600"
                  : "text-pink-200"
              } hover:bg-purple-700 hover:text-white p-3 rounded-md transition-all duration-300 shadow-md`}
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              {link.icon} <span>{link.label}</span>
            </Link>
          ))}
      </nav>
      <div className="flex gap-4 items-center mt-auto">
        <UserButton />
        <p
          className="text-sm text-pink-200 cursor-pointer hover:text-white transition-all duration-300"
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
        >
          Edit Profile
        </p>
      </div>
    </div>
  );
};

export default LeftSideBar;
