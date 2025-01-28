// กำหนดประเภทบทบาทของผู้ใช้และขยาย global interface สำหรับจัดการ session JWT
export {} 

export type Roles = 'admin' | 'employee'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: 'admin' | 'employee' // กำหนดบทบาทผู้ใช้เป็น 'admin' หรือ 'employee'
    }
  }
}
