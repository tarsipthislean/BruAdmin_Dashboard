import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Customer from "@/lib/models/Customer";
import { auth } from "@clerk/nextjs";

// POST: สร้างลูกค้าใหม่
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    await connectToDB();
    const { title, description, media } = await req.json();

    if (!title || !description || !media) {
      return new NextResponse("ข้อมูลไม่เพียงพอในการสร้างลูกค้า", { status: 400 });
    }

    const newCustomer = await Customer.create({ title, description, media });
    return NextResponse.json(newCustomer, { status: 200 });
  } catch (err) {
    console.log("[customer_POST]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// GET: ดึงข้อมูลลูกค้าพร้อมแบ่งหน้า
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const customers = await Customer.find()
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);

    const totalCustomers = await Customer.countDocuments();
    const totalPages = Math.ceil(totalCustomers / limit);

    return NextResponse.json({ customers, totalCustomers, totalPages }, { status: 200 });
  } catch (err) {
    console.log("[customer_GET]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";