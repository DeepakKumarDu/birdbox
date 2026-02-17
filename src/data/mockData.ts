import { Product, SendProduct } from '../types';

// ==================== PRODUCT LIST MOCK DATA ====================
export const MOCK_PRODUCTS: Product[] = Array.from({ length: 45 }, (_, i) => ({
  id: `1234567${i}`,
  name: 'Product Name',
  price: parseFloat((Math.random() * 30 + 5).toFixed(2)),
  category: ['Electronics', 'Clothing', 'Food', 'Sports', 'Home'][i % 5],
  processingTime: `${Math.floor(Math.random() * 5) + 1} Days`,
  description: 'High-quality product with excellent features and durability.',
  status: (i % 3 === 0 ? 'Inactive' : 'Active') as 'Active' | 'Inactive',
  image: '',
}));

// ==================== SEND ITEMS MOCK DATA ====================
const COLORS = ['#7B2FBE', '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#EC4899'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const MOCK_SEND_PRODUCTS: SendProduct[] = Array.from({ length: 8 }, (_, i) => ({
  id: `send-${i}`,
  name: 'Item Name',
  price: parseFloat((Math.random() * 200 + 50).toFixed(2)),
  vendor: ['Amazon', 'Shopify', 'eBay', 'Etsy'][i % 4],
  category: ['Shoes', 'Clothing', 'Electronics', 'Sports'][i % 4],
  image: '',
  colors: COLORS.slice(0, Math.floor(Math.random() * 4) + 2),
  sizes: SIZES.slice(0, Math.floor(Math.random() * 4) + 3),
  description:
    'Experience unmatched comfort and performance with our premium product. Engineered for everyday use, combining sleek design with superior quality to keep you satisfied all day long.',
  thumbnails: ['', '', ''],
}));

// ==================== FILTER OPTION LISTS ====================
export const CATEGORIES = ['Shoes', 'Clothing', 'Electronics', 'Sports'];
export const VENDORS = ['Amazon', 'Shopify', 'eBay', 'Etsy', 'Walmart'];
export const PRODUCT_CATEGORIES = ['Electronics', 'Clothing', 'Food', 'Sports', 'Home', 'Accessories'];
