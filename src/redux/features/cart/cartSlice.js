import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  shippingFee: 2,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const isExist = state.products.find((p) => p._id === product._id);

      if (!isExist) {
        if (product.quantity <= 0) return;
        
        state.products.push({ 
          ...product, 
          quantity: 1,
          maxQuantity: product.quantity, // حفظ الكمية الأصلية للمنتج
          url: `/product/${product._id}`
        });
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
    },
    updateQuantity: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          if (action.payload.type === 'increment') {
            // التحقق من أن الكمية الجديدة لا تتجاوز الكمية المتاحة
            if (product.quantity < product.maxQuantity) {
              product.quantity += 1;
            }
          } else if (action.payload.type === 'decrement' && product.quantity > 1) {
            product.quantity -= 1;
          }
        }
        return product;
      });

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload.id);
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.shippingFee = 2;
    }
  },
});

export const setSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

export const setTotalPrice = (state) =>
  state.products.reduce((total, product) => total + (product.quantity * product.price), 0);

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;