// กำหนด type สำหรับ CollectionType
type CollectionType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  createAt: Date;
  updateAt: Date;
};

// กำหนด type สำหรับ ProductType
type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  sum: number;
  tags: [string];
  price: number;
  createAt: Date;
  updateAt: Date;
};

// กำหนด type สำหรับ CustomerType
type CustomerType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  createAt: Date;
  updateAt: Date;
};
