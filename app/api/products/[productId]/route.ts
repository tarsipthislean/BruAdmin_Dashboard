import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// GET: ดึงข้อมูลสินค้าตาม productId
export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    await connectToDB();
    const product = await Product.findById(params.productId);
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบสินค้า" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.log("[productId_GET]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// POST: อัปเดตข้อมูลสินค้า
export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    await connectToDB();
    const product = await Product.findById(params.productId);
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบสินค้า" }), { status: 404 });
    }

    const { title, description, media, sum, tags, price } = await req.json();
    if (!title || !description || !media || sum === undefined || !price) {
      return new NextResponse("ข้อมูลไม่เพียงพอ", { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { title, description, media, sum, tags, price },
      { new: true }
    );
    await updatedProduct.save();
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("[productId_POST]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// DELETE: ลบสินค้าตาม productId
export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    await connectToDB();
    const product = await Product.findById(params.productId);
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบสินค้า" }), { status: 404 });
    }

    await Product.findByIdAndDelete(product._id);
    return new NextResponse(JSON.stringify({ message: "ลบสินค้า" }), { status: 200 });
  } catch (err) {
    console.log("[productId_DELETE]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
