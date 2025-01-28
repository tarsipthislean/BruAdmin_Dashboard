import mongoose from "mongoose";

let isConnected: boolean = false;

// ฟังก์ชันสำหรับเชื่อมต่อกับฐานข้อมูล MongoDB
export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "bru-admin",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};
