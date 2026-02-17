// ==================== PRODUCT LIST TYPES ====================
export type ProductStatus = 'Active' | 'Inactive';
export type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'id_asc';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  processingTime: string;
  description: string;
  status: ProductStatus;
  image: string;
}

export interface AddProductForm {
  name: string;
  description: string;
  category: string;
  processingTime: string;
  price: string;
}

// ==================== SEND ITEMS TYPES ====================
export interface SendProduct {
  id: string;
  name: string;
  price: number;
  vendor: string;
  category: string;
  image: string;
  colors: string[];
  sizes: string[];
  description: string;
  thumbnails: string[];
}

export interface Order {
  id: string;
  product: SendProduct;
  selectedColor: string;
  selectedSize: string;
  recipientEmail: string;
  recipientName: string;
  recipientCompany: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: string;
}

export interface SendItemFilters {
  categories: string[];
  vendors: string[];
  priceRange: [number, number];
  searchTerm: string;
  sortBy: string;
}
