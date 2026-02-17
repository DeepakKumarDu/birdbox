import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductStatus, SortOption } from '../../types';
import { MOCK_PRODUCTS } from '../../data/mockData';

interface ProductsState {
  products: Product[];
  // Filters
  searchTerm: string;
  statusFilter: 'All' | 'Active' | 'Inactive';
  categoryFilter: string;
  sortBy: SortOption;
  currentPage: number;
  pageSize: number;
  // Modal state
  addModalOpen: boolean;
  addModalSuccess: boolean;
}

const initialState: ProductsState = {
  products: MOCK_PRODUCTS,
  searchTerm: '',
  statusFilter: 'All',
  categoryFilter: 'All Categories',
  sortBy: 'id_asc',
  currentPage: 1,
  pageSize: 8,
  addModalOpen: false,
  addModalSuccess: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Filter actions
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setStatusFilter(state, action: PayloadAction<'All' | 'Active' | 'Inactive'>) {
      state.statusFilter = action.payload;
      state.currentPage = 1;
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload;
      state.currentPage = 1;
    },
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.currentPage = 1; // Reset to page 1 when size changes
    },
    // Modal actions
    openAddModal(state) {
      state.addModalOpen = true;
      state.addModalSuccess = false;
    },
    closeAddModal(state) {
      state.addModalOpen = false;
      state.addModalSuccess = false;
    },
    // Product CRUD
    addProduct(
      state,
      action: PayloadAction<Omit<Product, 'id' | 'image' | 'status'>>
    ) {
      const newProduct: Product = {
        ...action.payload,
        id: String(Date.now()).slice(-7),
        image: '',
        status: 'Active',
      };
      state.products.unshift(newProduct);
      state.addModalSuccess = true;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    toggleProductStatus(state, action: PayloadAction<string>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.status = product.status === 'Active' ? 'Inactive' : 'Active';
      }
    },
  },
});

export const {
  setSearchTerm,
  setStatusFilter,
  setCategoryFilter,
  setSortBy,
  setCurrentPage,
  setPageSize,
  openAddModal,
  closeAddModal,
  addProduct,
  deleteProduct,
  toggleProductStatus,
} = productsSlice.actions;

export default productsSlice.reducer;
