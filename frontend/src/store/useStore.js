import { create } from "zustand";
import axios from "axios";

const PRODUCT_API_URL = "https://grow-backend-pi.vercel.app/product";
const BACKEND_API_URL = "https://grow-backend-pi.vercel.app/product/new";

const useStore = create((set, get) => ({
  cartItems: [],
  foodList: [],
  inputData: [],

  addToCart: async (productId) => {
    try {
      const response = await axios.get(`${PRODUCT_API_URL}/${productId}`);
      const product = response.data;
      const existingProductIndex = get().cartItems.findIndex(
        (item) => item._id === productId
      );

      if (existingProductIndex !== -1) {
        const updatedCartItems = [...get().cartItems];
        updatedCartItems[existingProductIndex].quantity += 1;
        set({ cartItems: updatedCartItems });
      } else {
        const updatedCartItems = [
          ...get().cartItems,
          { ...product, quantity: 1 },
        ];
        set({ cartItems: updatedCartItems });
      }

      console.log(`Product ${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  },

  removeFromCart: (productId) =>
    set((state) => {
      const newCartItems = [...state.cartItems];
      const existingProductIndex = newCartItems.findIndex(
        (item) => item._id === productId
      );
      if (existingProductIndex !== -1) {
        newCartItems[existingProductIndex].quantity -= 1;
        if (newCartItems[existingProductIndex].quantity === 0) {
          newCartItems.splice(existingProductIndex, 1);
        }
      }
      return { cartItems: newCartItems };
    }),

  getTotalCartAmount: () => {
    const { cartItems } = get();
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  },

  setFoodList: (foodList) => set({ foodList }),

  fetchFoodList: async () => {
    try {
      const response = await axios.get(PRODUCT_API_URL);
      set({ foodList: response.data });
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  },

  addInputData: (data) => {
    console.log("Input data:", data);
    set((state) => ({ inputData: [...state.inputData, data] }));
  },

  sendInputDataToBackend: async (data) => {
    try {
      const token = "Dabbemein4098"; // Replace this with your actual token

      const formattedData = {
        name: data.name,
        photo: data.photo,
        price: parseFloat(data.price),
        stock: parseInt(data.stock, 10),
      };

      const response = await axios.post(BACKEND_API_URL, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`, // Adjust based on backend requirements
        },
      });

      console.log("Input data sent to the backend:", response.data);
    } catch (error) {
      console.error("Error sending input data to the backend:", error);
    }
  },
}));

export default useStore;
