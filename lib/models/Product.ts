import mongoose from "mongoose";

// ฟังก์ชันกำหนด schema สำหรับ product
const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  sum: { 
    type: Number,
    min: 0,
    required: true
  },
  tags: [String],
  price: { 
    type: mongoose.Schema.Types.Decimal128,
    get: (v: mongoose.Schema.Types.Decimal128) => parseFloat(v.toString())
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

// ฟังก์ชันตรวจสอบและสร้างโมเดล Product ถ้ายังไม่มี
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// ฟังก์ชันส่งออกโมเดล Product เพื่อใช้งานในส่วนอื่น
export default Product;
