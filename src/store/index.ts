import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import sendItemsReducer from './slices/sendItemsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    sendItems: sendItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
