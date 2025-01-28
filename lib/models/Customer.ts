import mongoose from 'mongoose';

// ฟังก์ชันกำหนด schema สำหรับ customer
const CustomerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

// ฟังก์ชันตรวจสอบและสร้างโมเดล Customer ถ้ายังไม่มี
const Customer = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

// ฟังก์ชันส่งออกโมเดล Customer เพื่อใช้งานในส่วนอื่น
export default Customer;
