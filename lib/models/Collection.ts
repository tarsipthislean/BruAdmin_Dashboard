import mongoose from 'mongoose';

// ฟังก์ชันกำหนด schema สำหรับ collection 
const CollectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

// ฟังก์ชันตรวจสอบและสร้างโมเดล Collection ถ้ายังไม่มี
const Collection = mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);

// ฟังก์ชันส่งออกโมเดล Collection เพื่อใช้งานในส่วนอื่น
export default Collection;
