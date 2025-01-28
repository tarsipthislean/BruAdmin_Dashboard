'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CustomerType {
  _id: string;
  title: string;
  quantity?: number;
  media: string[];
  description?: string;
}

const CustomerCard = ({ customer }: { customer: CustomerType }) => {
  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 w-full max-w-xs mx-auto">
      <img
        src={customer.media[0]}
        alt={customer.title}
        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mb-3"
      />
      <h2 className="text-sm sm:text-md font-semibold text-gray-800 mb-1">{customer.title}</h2>
      <div className="flex items-center justify-center mb-2">
        <button className="px-2 py-1 text-xs rounded-full font-semibold text-white bg-red-500 shadow-sm hover:bg-red-600 transition-all duration-300">
          {customer.description ? customer.description : 'No description available'}
        </button>
      </div>
      <p className="text-gray-500 text-xs sm:text-sm mb-3">{currentDate}</p>
      <button
        className="bg-purple-500 text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-md shadow-lg transition-transform duration-300 ease-in-out hover:bg-purple-600 hover:scale-105"
        onClick={() => window.location.href = `/customers/${customer._id}`}
      >
        ดูรายละเอียดลูกค้า
      </button>
    </div>
  );
};

const Customers = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCustomers = async () => {
    try {
      const res = await fetch("/api/customers", { method: "GET" });
      const data = await res.json();
      setCustomers(data.customers);
      setLoading(false);
    } catch (err) {
      console.log("[getCustomers]", err);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="px-4 sm:px-8 py-5 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-heading3-bold text-gray-800">ลูกค้าแบล็คลิสต์</h1>
        <Button
          className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-md shadow-md hover:bg-purple-600 transition-transform duration-300 ease-in-out"
          onClick={() => router.push("/customers/new")}
        >
          <Plus className="h-5 w-5 mr-2" />
          เพิ่มลูกค้า
        </Button>
      </div>

      <hr className="border-t-2 border-gray-300 my-4" />

      <Input
        placeholder="ค้นหาลูกค้า..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <CustomerCard key={customer._id} customer={customer} />
          ))
        ) : (
          <p className="text-gray-500">ไม่พบลูกค้าที่ค้นหา</p>
        )}
      </div>
    </div>
  );
};

export default Customers;