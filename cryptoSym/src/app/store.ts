import { configureStore } from '@reduxjs/toolkit';
import marketReducer from '../features/market/slices/marketSlice';
import portfolioReducer from '../features/portfolio/portfolioSlice';

export const store = configureStore({
  reducer: {
    market: marketReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
