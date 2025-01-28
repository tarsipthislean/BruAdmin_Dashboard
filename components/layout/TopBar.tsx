'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image"; 
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; 
import { Menu } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { usecheckRole } from "@/utils/roles";

// ฟังก์ชันสำหรับแสดงแถบด้านบน
const TopBar = () => {
  const { user } = useUser();
  const isAdmin = usecheckRole("admin");

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-gradient-to-b from-purple-500 to-pink-400 shadow-lg text-white lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks
          .filter((link) => link.label !== "Customers" || isAdmin)
          .map((link) => (
            <Link
              href={link.url}
              key={link.label}
              className={`flex items-center gap-4 text-body-medium ${
                pathname === link.url ? "text-white font-semibold bg-purple-600" : "text-pink-200"
              } hover:bg-purple-700 hover:text-white p-2 rounded-lg transition-all duration-300 shadow-md`}
            >
              <p>{link.label}</p>
            </Link>
          ))}
      </div>

      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-4 p-5 bg-gradient-to-b from-purple-500 to-pink-400 shadow-lg rounded-lg text-white">
            {navLinks
              .filter((link) => link.label !== "Customers" || isAdmin)
              .filter((link) => link.label !== "Orders")
              .map((link) => (
                <Link
                  href={link.url}
                  key={link.label}
                  className="flex items-center gap-4 text-body-medium hover:bg-purple-700 hover:text-white p-2 rounded-lg transition-all duration-300"
                  onClick={() => setDropdownMenu(false)}
                >
                  {link.icon} <p>{link.label}</p>
                </Link>
              ))}
          </div>
        )}
        <UserButton />
        <p className="text-sm text-pink-200">Edit Profile</p>
      </div>
    </div>
  );
};

export default TopBar;