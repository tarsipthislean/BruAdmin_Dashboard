"use client"; 

import { Roles } from "./globals"; 
import { useUser } from "@clerk/nextjs"; 

// ฟังก์ชันสำหรับตรวจสอบบทบาทของผู้ใช้
export const usecheckRole = (role: Roles) => {
  const { user } = useUser(); 

  return user?.publicMetadata?.role === role; 
};