import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import { auth } from "@clerk/nextjs";

// POST: สร้างสินค้าใหม่
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    await connectToDB();
    const { title, description, media, sum, tags, price } = await req.json();
    if (!title || !description || !media || sum === undefined || !price) {
      return new NextResponse("ข้อมูลไม่เพียงพอในการสร้างสินค้า", { status: 400 });
    }

    const newProduct = await Product.create({ title, description, media, sum, tags, price });
    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// GET: ดึงข้อมูลสินค้าพร้อมแบ่งหน้า
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const products = await Product.find().sort({ createdAt: "desc" }).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({ products, totalPages }, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";