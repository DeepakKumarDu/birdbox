import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SendProduct, Order, SendItemFilters } from '../../types';
import { MOCK_SEND_PRODUCTS } from '../../data/mockData';

interface SendItemsState {
  products: SendProduct[];
  orders: Order[];
  filters: SendItemFilters;
  // Selected item state
  selectedProduct: SendProduct | null;
  selectedColor: string;
  selectedSize: string;
  // Modal state
  detailModalOpen: boolean;
  recipientModalOpen: boolean;
  successModalOpen: boolean;
  // Recipient form (preserved when going back)
  recipientForm: {
    recipientEmail: string;
    recipientName: string;
    recipientCompany: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const initialState: SendItemsState = {
  products: MOCK_SEND_PRODUCTS,
  orders: [],
  filters: {
    categories: [],
    vendors: [],
    priceRange: [0, 500],
    searchTerm: '',
    sortBy: 'default',
  },
  selectedProduct: null,
  selectedColor: '',
  selectedSize: '',
  detailModalOpen: false,
  recipientModalOpen: false,
  successModalOpen: false,
  recipientForm: {
    recipientEmail: '',
    recipientName: '',
    recipientCompany: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
  },
};

const sendItemsSlice = createSlice({
  name: 'sendItems',
  initialState,
  reducers: {
    // Filter actions
    toggleCategory(state, action: PayloadAction<string>) {
      const idx = state.filters.categories.indexOf(action.payload);
      if (idx >= 0) {
        state.filters.categories.splice(idx, 1);
      } else {
        state.filters.categories.push(action.payload);
      }
    },
    toggleVendor(state, action: PayloadAction<string>) {
      const idx = state.filters.vendors.indexOf(action.payload);
      if (idx >= 0) {
        state.filters.vendors.splice(idx, 1);
      } else {
        state.filters.vendors.push(action.payload);
      }
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.filters.priceRange = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.filters.searchTerm = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.filters.sortBy = action.payload;
    },
    clearAllFilters(state) {
      state.filters = {
        categories: [],
        vendors: [],
        priceRange: [0, 500],
        searchTerm: '',
        sortBy: 'default',
      };
    },
    // Product selection
    openDetailModal(state, action: PayloadAction<SendProduct>) {
      state.selectedProduct = action.payload;
      state.selectedColor = '';
      state.selectedSize = '';
      state.detailModalOpen = true;
    },
    closeDetailModal(state) {
      state.detailModalOpen = false;
    },
    setSelectedColor(state, action: PayloadAction<string>) {
      state.selectedColor = action.payload;
    },
    setSelectedSize(state, action: PayloadAction<string>) {
      state.selectedSize = action.payload;
    },
    // Recipient modal
    openRecipientModal(state) {
      state.detailModalOpen = false;
      state.recipientModalOpen = true;
    },
    closeRecipientModal(state) {
      state.recipientModalOpen = false;
      // Go back to detail modal with state preserved
      state.detailModalOpen = true;
    },
    updateRecipientForm(
      state,
      action: PayloadAction<Partial<SendItemsState['recipientForm']>>
    ) {
      state.recipientForm = { ...state.recipientForm, ...action.payload };
    },
    // Order submission
    confirmOrder(state) {
      if (!state.selectedProduct) return;
      const order: Order = {
        id: String(Date.now()),
        product: state.selectedProduct,
        selectedColor: state.selectedColor,
        selectedSize: state.selectedSize,
        ...state.recipientForm,
        createdAt: new Date().toISOString(),
      };
      state.orders.push(order);
      state.recipientModalOpen = false;
      state.successModalOpen = true;
      // Reset selection state
      state.selectedProduct = null;
      state.selectedColor = '';
      state.selectedSize = '';
      state.recipientForm = initialState.recipientForm;
    },
    closeSuccessModal(state) {
      state.successModalOpen = false;
    },
  },
});

export const {
  toggleCategory,
  toggleVendor,
  setPriceRange,
  setSearchTerm,
  setSortBy,
  clearAllFilters,
  openDetailModal,
  closeDetailModal,
  setSelectedColor,
  setSelectedSize,
  openRecipientModal,
  closeRecipientModal,
  updateRecipientForm,
  confirmOrder,
  closeSuccessModal,
} = sendItemsSlice.actions;

export default sendItemsSlice.reducer;
