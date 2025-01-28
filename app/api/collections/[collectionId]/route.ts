import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// GET: ดึงข้อมูลคอลเลคชั่น
export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
    await connectToDB();
    const collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบคอลเล็กชัน" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(collection), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};

// POST: อัปเดตข้อมูลคอลเลคชั่น
export const POST = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }
    await connectToDB();
    const collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบคอลเล็กชัน" }), { status: 404 });
    }
    const { title, description, media } = await req.json();
    if (!title || !description || !media) {
      return new NextResponse("ข้อมูลไม่เพียงพอ", { status: 400 });
    }
    const updatedCollection = await Collection.findByIdAndUpdate(
      collection._id,
      { title, description, media },
      { new: true }
    );
    await updatedCollection.save();
    return NextResponse.json(updatedCollection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_POST]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};

// DELETE: ลบคอลเลคชั่น
export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }
    await connectToDB();
    const collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบคอลแลคชัน" }), { status: 404 });
    }
    await Collection.findByIdAndDelete(collection._id);
    return new NextResponse(JSON.stringify({ message: "ลบคอลเล็กชันแล้ว" }), { status: 200 });
  } catch (err) {
    console.log("[collectionId_DELETE]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
