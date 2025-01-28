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
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import { Check, X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
});

interface CustomerFormProps {
  initialData?: CustomerType | null;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      media: [],
    },
  });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/customers/${initialData._id}`
        : "/api/customers";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Customer ${initialData ? "updated" : "created"}`);
        router.push("/customers");
      }
    } catch (err) {
      console.log("[customers_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-12 bg-white rounded-lg shadow-lg max-w-5xl w-full">
        {initialData ? (
          <div className="flex items-center justify-between mb-6">
            <p className="text-heading3-bold text-gray-800">รายละเอียดข้อมูลลูกค้า</p>
            <Button
              type="button"
              className="bg-red-500 text-white hover:bg-red-600 px-3 py-3"
              onClick={async () => {
                await fetch(`/api/customers/${initialData._id}`, {
                  method: "DELETE",
                });
                toast.success("Customer deleted");
                router.push("/customers");
              }}
            >
              ลบข้อมูลลูกค้า
            </Button>
          </div>
        ) : (
          <p className="text-heading3-bold text-gray-800 mb-6">
            เพิ่มข้อมูลลูกค้า
          </p>
        )}
        <Separator className="mb-8" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ชื่อลูกค้า"
                      {...field}
                      onKeyDown={handleKeyPress}
                      className="border-gray-300 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียด</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="รายละเอียดลูกค้า"
                      {...field}
                      rows={5}
                      onKeyDown={handleKeyPress}
                      className="border-gray-300 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เพิ่มรูปภาพ</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={(url) =>
                        field.onChange([...field.value, url])
                      }
                      onRemove={(url) =>
                        field.onChange(
                          field.value.filter((image) => image !== url)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 px-8 py-4"
              >
                <Check className="h-5 w-5" /> ยืนยัน
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/customers")}
                className="bg-gray-500 text-white hover:bg-gray-600 flex items-center gap-2 px-8 py-4"
              >
                <X className="h-5 w-5" /> ยกเลิก
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CustomerForm;
