"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import MultiText from "@/components/custom ui/MultiText";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import { Check, X } from "lucide-react";

// Schema สำหรับตรวจสอบข้อมูลฟอร์ม
const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  sum: z.coerce.number().min(0),
  tags: z.array(z.string()),
  price: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null; // รับข้อมูลสินค้าเริ่มต้น (ถ้ามี)
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ตั้งค่า default values สำหรับ useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      media: [],
      sum: 0,
      tags: [],
      price: 0.1,
    },
  });

  // ฟังก์ชันป้องกันการกด Enter ส่งฟอร์ม
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        router.push("/products");
      } else throw new Error("Failed to submit form");
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-heading3-bold text-gray-800">
          {initialData ? "รายละเอียดสินค้า" : "เพิ่มสินค้า"}
        </p>
        {initialData && (
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-3 "
            onClick={async () => {
              await fetch(`/api/products/${initialData._id}`, { method: "DELETE" });
              toast.success("Product deleted");
              router.push("/products");
            }}
          >
            ลบสินค้า
          </Button>
        )}
      </div>
      <Separator className="bg-gray-300 my-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* ชื่อสินค้า */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อสินค้า</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ชื่อสินค้า"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* คีย์เวิร์ดสินค้า */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>คีย์เวิร์ด</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="เพิ่มคีย์เวิร์ดสินค้า"
                    value={field.value}
                    onChange={(tag) => field.onChange([...field.value, tag])}
                    onRemove={(tagToRemove) =>
                      field.onChange(field.value.filter((tag) => tag !== tagToRemove))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* รายละเอียดสินค้า */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>รายละเอียดสินค้า</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="รายละเอียดสินค้า"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* รูปภาพสินค้า */}
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>แนบรูปภาพ</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange(field.value.filter((image) => image !== url))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ราคาและจำนวนสินค้า */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ราคา (฿)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ราคา" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>จำนวน</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="จำนวน" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ปุ่มยืนยันและยกเลิก */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              <Check className="h-5 w-5" /> ยืนยัน
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/products")}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg"
            >
              <X className="h-5 w-5" /> ยกเลิก
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
