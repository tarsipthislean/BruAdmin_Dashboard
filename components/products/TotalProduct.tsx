import React, { useEffect, useState } from 'react';

const TotalProduct = () => {
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันดึงข้อมูลสินค้า
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('เรียกข้อมูลสินค้าไม่สำเร็จ');
        }
        const data = await response.json();
        setTotalProducts(data.products.length);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
        }
      }
    };

    fetchProducts();
  }, []);

  // แสดงเมื่อเกิดข้อผิดพลาด
  if (error) {
    return <p>Error: {error}</p>;
  }

  // แสดงผลจำนวนสินค้า
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">สินค้าทั้งหมด</h3>
      <div className="text-3xl font-bold mt-2">
        {totalProducts !== null ? totalProducts : 'Loading...'}
      </div>
    </div>
  );
};

export default TotalProduct;
