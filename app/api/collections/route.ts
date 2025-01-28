import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import { auth } from "@clerk/nextjs";

// POST: สร้างคอลเลคชั่นใหม่
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    await connectToDB();
    const { title, description, media } = await req.json();

    if (!title || !description || !media) {
      return new NextResponse("ไม่มีข้อมูลที่จะสร้างคอลเลกชัน", { status: 400 });
    }

    const newCollection = await Collection.create({ title, description, media });
    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    console.log("[collections_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// GET: ดึงข้อมูลคอลเลคชั่นพร้อมแบ่งหน้า
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const collections = await Collection.find()
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);

    const totalCollections = await Collection.countDocuments();
    const totalPages = Math.ceil(totalCollections / limit);

    return NextResponse.json({ collections, totalCollections, totalPages }, { status: 200 });
  } catch (err) {
    console.log("[collections_GET]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
