import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ฟังก์ชันสำหรับรวม class ของ Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // ใช้ clsx และ twMerge สำหรับจัดการ class
}