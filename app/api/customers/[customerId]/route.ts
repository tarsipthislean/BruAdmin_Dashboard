import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// GET: ดึงข้อมูลลูกค้า
export const GET = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
  try {
    await connectToDB();
    const customer = await Customer.findById(params.customerId);
    if (!customer) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบลูกค้า" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(customer), { status: 200 });
  } catch (err) {
    console.log("[customerId_GET]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// POST: อัปเดตข้อมูลลูกค้า
export const POST = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }
    await connectToDB();
    const customer = await Customer.findById(params.customerId);
    if (!customer) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบลูกค้า" }), { status: 404 });
    }
    const { title, description, media } = await req.json();
    if (!title || !description || !media) {
      return new NextResponse("ข้อมูลไม่เพียงพอ", { status: 400 });
    }
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customer._id,
      { title, description, media },
      { new: true }
    );
    await updatedCustomer.save();
    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (err) {
    console.log("[customerId_POST]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// DELETE: ลบลูกค้า
export const DELETE = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }
    await connectToDB();
    const customer = await Customer.findById(params.customerId);
    if (!customer) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบลูกค้า" }), { status: 404 });
    }
    await Customer.findByIdAndDelete(customer._id);
    return new NextResponse(JSON.stringify({ message: "ลบลูกค้า" }), { status: 200 });
  } catch (err) {
    console.log("[customerId_DELETE]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";