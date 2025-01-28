import React, { useEffect, useState } from "react";

// แสดงจำนวนลูกค้าทั้งหมด
const TotalCustomers = () => {
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null); // เก็บจำนวนลูกค้า
  const [error, setError] = useState<string | null>(null); // เก็บข้อความข้อผิดพลาด

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers");
        if (!response.ok) throw new Error("Failed to fetch customers");
        const data = await response.json();
        setTotalCustomers(data.totalCustomers); // ตั้งค่าจำนวนลูกค้าจาก API
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }
    };

    fetchCustomers();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">ลูกค้าติดแบล็คลิสต์ทั้งหมด</h3>
      <div className="text-3xl font-bold mt-2">
        {totalCustomers !== null ? totalCustomers : "Loading..."}
      </div>
    </div>
  );
};

export default TotalCustomers;
