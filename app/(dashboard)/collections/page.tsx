'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CollectionType {
  _id: string;
  title: string;
  quantity?: number;
  media: string[];
}

const CollectionCard = ({ collection }: { collection: CollectionType }) => {
  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 w-60 mx-auto">
      <img
        src={collection.media[0]}
        alt={collection.title}
        className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-lg mb-3"
      />
      <h2 className="text-sm sm:text-md font-semibold text-gray-800 mb-1">{collection.title}</h2>
      <div className="flex items-center justify-center mb-2">
        <button className="px-2 py-1 text-xs rounded-full font-semibold text-white bg-red-500 shadow-md hover:bg-red-600 transition-all duration-300">
          HOT
        </button>
      </div>
      <p className="text-gray-500 text-xs sm:text-sm mb-3">{currentDate}</p>
      <button
        className="bg-purple-500 text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-md shadow-lg transition-transform duration-300 ease-in-out hover:bg-purple-600 hover:scale-105"
        onClick={() => window.location.href = `/collections/${collection._id}`}
      >
        ดูรายละเอียดคอลเลคชั่น
      </button>
    </div>
  );
};

const Collections = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", { method: "GET" });
      const data = await res.json();
      setCollections(data.collections);
      setLoading(false);
    } catch (err) {
      console.log("[getCollections]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const filteredCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="px-4 sm:px-8 py-5 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-heading3-bold text-gray-800">คอลเลคชั่น</h1>
        <Button
          className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-transform duration-300 ease-in-out"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="h-5 w-5 mr-2" />
          เพิ่มคอลเลคชั่น
        </Button>
      </div>

      <hr className="border-t-2 border-gray-300 my-4" />

      <Input
        placeholder="ค้นหาคอลเลคชั่น..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {filteredCollections.length > 0 ? (
          filteredCollections.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))
        ) : (
          <p className="text-gray-500">ไม่พบคอลเลคชั่นที่ค้นหา</p>
        )}
      </div>
    </div>
  );
};

export default Collections;