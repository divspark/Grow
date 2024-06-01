import { create } from 'zustand';
import axios from 'axios';

// const PRODUCT_API_URL = 'http://localhost:5000/api/v1/product';
// const BACKEND_API_URL = 'http://localhost:5000/api/v1/product/new';
const PRODUCT_API_URL = 'https://grow-backend-pi.vercel.app/product';
const BACKEND_API_URL = 'https://grow-backend-pi.vercel.app/product/new';

const useStore = create((set, get) => ({
    cartItems: [],
    foodList: [],
    inputData: [],

    addToCart: async (productId) => {
        try {
            const response = await axios.get(`${PRODUCT_API_URL}/${productId}`);
            const product = response.data;
            const existingProductIndex = get().cartItems.findIndex((item) => item._id === productId);

            if (existingProductIndex !== -1) {
                const updatedCartItems = [...get().cartItems];
                updatedCartItems[existingProductIndex].quantity += 1;
                set({ cartItems: updatedCartItems });
            } else {
                const updatedCartItems = [...get().cartItems, { ...product, quantity: 1 }];
                set({ cartItems: updatedCartItems });
            }

            console.log(`Product ${product.name} added to cart`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    },

    removeFromCart: (productId) => set((state) => {
        const newCartItems = [...state.cartItems];
        const existingProductIndex = newCartItems.findIndex((item) => item._id === productId);
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
            console.error('Failed to fetch food list:', error);
        }
    },

    addInputData: (data) => {
        console.log('Input data:', data);
        set((state) => ({ inputData: [...state.inputData, data] }));
    },

    sendInputDataToBackend: async (data) => {
        try {
            const token = 'Dabbemein4098'; // Replace this with your actual token

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

            console.log('Input data sent to the backend:', response.data);
        } catch (error) {
            console.error('Error sending input data to the backend:', error);
        }
    },
}));

export default useStore;

// import { create } from 'zustand';
// import axios from 'axios';

// const PRODUCT_API_URL = 'http://localhost:5000/api/v1/product';
// const BACKEND_API_URL = 'http://localhost:5000/api/v1/product/new';

// const useStore = create((set, get) => ({
//     cartItems: [],
//     foodList: [],
//     inputData: [],

//     addToCart: async (productId) => {
//         try {
//             const response = await axios.get(`${PRODUCT_API_URL}/${productId}`);
//             const product = response.data;
//             const existingProductIndex = get().cartItems.findIndex((item) => item._id === productId);

//             if (existingProductIndex !== -1) {
//                 const updatedCartItems = [...get().cartItems];
//                 updatedCartItems[existingProductIndex].quantity += 1;
//                 set({ cartItems: updatedCartItems });
//             } else {
//                 const updatedCartItems = [...get().cartItems, { ...product, quantity: 1 }];
//                 set({ cartItems: updatedCartItems });
//             }

//             console.log(`Product ${product.name} added to cart`);
//         } catch (error) {
//             console.error('Error adding product to cart:', error);
//         }
//     },

//     removeFromCart: (productId) => set((state) => {
//         const newCartItems = [...state.cartItems];
//         const existingProductIndex = newCartItems.findIndex((item) => item._id === productId);
//         if (existingProductIndex !== -1) {
//             newCartItems[existingProductIndex].quantity -= 1;
//             if (newCartItems[existingProductIndex].quantity === 0) {
//                 newCartItems.splice(existingProductIndex, 1);
//             }
//         }
//         return { cartItems: newCartItems };
//     }),

//     getTotalCartAmount: () => {
//         const { cartItems } = get();
//         let total = 0;
//         cartItems.forEach((item) => {
//             total += item.price * item.quantity;
//         });
//         return total;
//     },

//     setFoodList: (foodList) => set({ foodList }),

//     fetchFoodList: async () => {
//         try {
//             const response = await axios.get(PRODUCT_API_URL);
//             set({ foodList: response.data });
//         } catch (error) {
//             console.error('Failed to fetch food list:', error);
//         }
//     },

//     addInputData: (data) => {
//         console.log('Input data:', data);
//         set((state) => ({ inputData: [...state.inputData, data] }));
//     },

//     sendInputDataToBackend: async (data) => {
//         try {
//             const formattedData = {
//                 "name": data.name,
//                 "photo": data.photo,
//                 "price": parseFloat(data.price),
//                 "stock": parseInt(data.stock, 10),
//             };

//             const response = await axios.post(BACKEND_API_URL, formattedData);
//             console.log('Input data sent to the backend:', response.data);
//         } catch (error) {
//             console.error('Error sending input data to the backend:', error);
//         }
//     },
// }));

// export default useStore;


// // import { create } from 'zustand';
// // import axios from 'axios';

// // // Example backend URL endpoint
// // const PRODUCT_API_URL = 'http://localhost:5000/api/v1/product';
// // const BACKEND_API_URL = 'http://localhost:5000/api/v1/product/new';

// // const useStore = create((set, get) => ({
// //   cartItems: [], // Initialize as an empty array
// //   foodList: [], // Empty initially
// //   inputData: [],

// //   // addToCart: async (productId) => {
// //   //   try {
// //   //     // Fetch the product details from the backend API
// //   //     const response = await axios.get(`${PRODUCT_API_URL}/${productId}`);
// //   //     const product = response.data; // Assuming the response data contains the product details

// //   //     // Check if the product already exists in the cart
// //   //     const existingProductIndex = get().cartItems.findIndex((item) => item.productId === productId);

// //   //     if (existingProductIndex !== -1) {
// //   //       // If the product already exists, increment its quantity
// //   //       const updatedCartItems = [...get().cartItems];
// //   //       updatedCartItems[existingProductIndex].quantity += 1;
// //   //       set({ cartItems: updatedCartItems });
// //   //     } else {
// //   //       // If the product doesn't exist, add it to the cart
// //   //       const updatedCartItems = [...get().cartItems, { ...product, quantity: 1 }];
// //   //       set({ cartItems: updatedCartItems });
// //   //     }

// //   //     // Log the action
// //   //     console.log(`Product ${product.name} added to cart`);
// //   //   } catch (error) {
// //   //     console.error('Error adding product to cart:', error);
// //   //   }
// //   // },

// //   addToCart: async (productId) => {
// //     try {
// //       // Fetch the product details from the backend API
// //       const response = await axios.get(`${PRODUCT_API_URL}/${productId}`);
// //       const product = response.data; // Assuming the response data contains the product details

// //       // Check if the product already exists in the cart
// //       const existingProductIndex = get().cartItems.findIndex((item) => item._id === productId);

// //       if (existingProductIndex !== -1) {
// //         // If the product already exists, increment its quantity
// //         const updatedCartItems = [...get().cartItems];
// //         updatedCartItems[existingProductIndex].quantity += 1;
// //         set({ cartItems: updatedCartItems });
// //       } else {
// //         // If the product doesn't exist, add it to the cart
// //         const updatedCartItems = [...get().cartItems, { ...product, quantity: 1 }];
// //         set({ cartItems: updatedCartItems });
// //       }

// //       // Log the action
// //       console.log(`Product ${product.name} added to cart`);
// //     } catch (error) {
// //       console.error('Error adding product to cart:', error);
// //     }
// //   },

// //   // removeFromCart: (productId) => set((state) => {
// //   //   const newCartItems = [...state.cartItems]; // Convert cartItems to an array
// //   //   const existingProductIndex = get().cartItems.findIndex((item) => item.productId === productId);
// //   //   if (existingProductIndex !== -1) {
// //   //     newCartItems[existingProductIndex].quantity -= 1;
// //   //     if (newCartItems[existingProductIndex].quantity === 0) {
// //   //       newCartItems.splice(existingProductIndex, 1); // Remove the item if quantity becomes 0
// //   //     }
// //   //   }
// //   //   return { cartItems: newCartItems };
// //   // }),

// //   removeFromCart: (productId) => set((state) => {
// //     const newCartItems = [...state.cartItems]; // Convert cartItems to an array
// //     const existingProductIndex = newCartItems.findIndex((item) => item._id === productId);
// //     if (existingProductIndex !== -1) {
// //       newCartItems[existingProductIndex].quantity -= 1;
// //       if (newCartItems[existingProductIndex].quantity === 0) {
// //         newCartItems.splice(existingProductIndex, 1); // Remove the item if quantity becomes 0
// //       }
// //     }
// //     return { cartItems: newCartItems };
// //   }),
// //   getTotalCartAmount: () => {
// //     const { cartItems } = get(); // No need for foodList
// //     let total = 0;
// //     cartItems.forEach((item) => {
// //       total += item.price * item.quantity;
// //     });
// //     return total;
// //   },

// //   setFoodList: (foodList) => set({ foodList }),

// //   // Fetch food list from backend
// //   fetchFoodList: async () => {
// //     try {
// //       const response = await axios.get(PRODUCT_API_URL);
// //       set({ foodList: response.data });
// //     } catch (error) {
// //       console.error('Failed to fetch food list:', error);
// //     }
// //   },
// //   addInputData: (data) => {
// //     // Function to add input data to the inputData array
// //     console.log('Input data:', data);
// //     set((state) => ({ inputData: [...state.inputData, data] }));
// //   },
  
// //   sendInputDataToBackend: async (data) => {
// //       try {
// //         // Send input data to the backend
// //         const formattedData = {
// //           "name": `${data.name}`,
// //           "photo": `${data.photo}`,
// //           "price": parseFloat(data.price), // Convert price to a number if needed
// //           "stock": parseInt(data.stock), // Convert stock to a number if needed
// //         };
    
// //         // Send input data to the backend
// //         console.log('Input data:', formattedData);
// //         //console.log('Input data:', data);
// //         // const response = await axios.post(BACKEND_API_URL, data);
// //         const response = await axios.post(`${BACKEND_API_URL}`, formattedData);
// //         console.log('Input data sent to the backend:', response.data);
// //       } catch (error) {
// //         console.error('Error sending input data to the backend:', error);
// //       }
// //     },
// // }));



// // export default useStore;
