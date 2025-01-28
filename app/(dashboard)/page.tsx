'use client';

import React from 'react';
import SalesChart from '@/components/dashboards/SalesChart';
import TotalProduct from '@/components/products/TotalProduct';
import TotalCollection from '@/components/collections/TotalCollection';
import TotalCustomer from '@/components/customers/TotalCustomer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <p className="text-heading3-bold text-gray-800">หน้าหลัก</p>
      <hr className="border-t-2 border-gray-300 my-6" />
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <TotalCollection />
        <TotalCustomer />
        <TotalProduct />
      </div>
      
      <div className="bg-white shadow-xl rounded-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">การขาย, สินค้า, ลูกค้า</h3>
        <SalesChart />
      </div>
    </div>
  );
};

export default Dashboard;
