export interface Booking {
  name: string;
  lastName: string;
  email: string;
  phone: number;
  entry_date: string;
  leaving_date: string;
  guests: number;
}

export interface ImageInterface {
  path: string;
  filename: string;
  size: number;
  uri: string;
}

export interface SeoDataInterface {
  keywords: string[];
  description: string;
}

export interface ApplicationInterface {
  name: string;
  phone: number;
  category?: string;
  city?: string;
  state: string;
  createdAt: Date;
  _id: string;
}

export interface NewsInterface {
  description: string;
  title: string;
  images: ImageInterface[];
  createdAt: Date;
  _id: string;
}
export interface ProductInterface {
  rooms: number;
  price: {
    currency: string;
    amount: number;
  };
  numReviews: number;
  rating: number;
  category: string;
  user: string;
  bookings: Booking[];
  reviews: ReviewInterface[];
  description: string;
  images: ImageInterface[];
  comforts: {
    special?: Array<string>;
    additional?: string;
  };
  operation_type: string;
  state: string;
  user_details: {
    fullname: string;
    email: string;
    phone: number;
  };
  address: {
    city: string;
    district: string;
    street: string;
    details: string;
  };
  contact: {
    username: string;
    phone: number;
  };
  name: string;
  createdAt: Date;
  _id: string;
}

export interface PaginatedProducts {
  products: ProductInterface[];
  pages: number;
  page: number;
  count: number;
  pageSize: number;
}

export interface ReviewInterface {
  name?: string;
  _id?: string;
  city: string;
  createdAt: Date;
  rating: number;
  comment: string;
}

export type ProductFilters = {
  category?: string;
  city?: string;
  comforts_special?: string[];
  price_min?: string;
  price_max?: string;
  operation_type?: string;
  entry_date?: string;
  leaving_date?: string;
  rooms?: string;
  sort_by?: string;
  sort_order?: string;
  pageId?: string;
  currency?: string;
};

export interface SearchParams {
  category?: string;
  city?: string;
  operation_type?: string;
  rooms?: string;
  entry_date?: string;
  leaving_date?: string;
}

export interface CategoryInterface {
  _id: string;
  name: string;
}

export interface UserInterface {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  favorites?: Array<string>;
  products: Array<string>;
  accessToken: string;
  phone?: number;
  gender?: string;
  address?: string;
}

export interface UserCredentials {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserEditCredentials {
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface OrderInterface {
  userId: string;
  product: ProductInterface;
  paymentId: string;
  booking_info?: Booking;
  paymentResult?: PaymentResult;
  profit: {
    currency: string;
    amount: number;
  };
  state: string;
  isPaid: boolean;
  paid_at: Date;
  archived_at: Date;
  canceled_at: Date;
  _id?: string;
}

export interface PaymentResult {
  _id: string;
}
