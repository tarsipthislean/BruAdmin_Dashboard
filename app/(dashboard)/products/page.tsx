"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductType {
  _id: string;
  title: string;
  sum: number;
  media: string[];
  category: string;
}

const ProductCard = ({ product }: { product: ProductType }) => {
  const sum = product.sum || 0;
  const quantityLabel = `คงเหลือ ${sum} ชิ้น`;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-5 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 w-80 sm:w-64 mx-auto">
      <img
        src={product.media[0]}
        alt={product.title}
        className="w-24 h-24 sm:w-36 sm:h-36 object-cover rounded-lg mb-3"
      />
      <h2 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">
        {product.title}
      </h2>
      <div className="flex items-center justify-center mb-3">
        <button
          className={`px-3 py-1 text-sm rounded-full text-white font-semibold ${
            sum === 0 ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {quantityLabel}
        </button>
      </div>
      <button
        className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-md transition-transform duration-300 ease-in-out hover:bg-purple-600 hover:scale-105"
        onClick={() => (window.location.href = `/products/${product._id}`)}
      >
        ดูรายละเอียดสินค้า
      </button>
    </div>
  );
};

const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", { method: "GET" });
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      console.log("[getProducts]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="px-4 sm:px-10 py-5 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-heading3-bold font-bold text-gray-800">
          สต๊อกสินค้า
        </h1>
        <Button
          className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-md shadow-md hover:bg-purple-600 transition-transform duration-300 ease-in-out"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-5 w-5 mr-2" />
          เพิ่มสินค้า
        </Button>
      </div>

      <hr className="border-t-2 border-gray-300 my-4" />

      <Input
        placeholder="ค้นหาสินค้า..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">ไม่พบสินค้าที่ค้นหา</p>
        )}
      </div>
    </div>
  );
};

export default Products;
