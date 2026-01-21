import { ProductDocument } from 'src/products/schemas/product.schema';

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}
export interface PaginatedProducts {
  products: ProductDocument[];
  pages: number;
  page: number;
  count: number
  pageSize: number;
}

export interface Booking {
  name: string;
  lastName: string;
  email : string;
  phone: number;
  leaving_date: string;
  entry_date: string;
  guests: number;
}

export interface Image {
  path: string;
  filename: string;
  size: number;
  uri: string;
}

