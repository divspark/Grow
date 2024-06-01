import React, { useState } from "react";
import useStore from "../../store/useStore";

const BasicInput = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(1000);
    const [stock, setStock] = useState(1);
    const [photoPrev, setPhotoPrev] = useState("");
    const [photo, setPhoto] = useState(null);

    const sendInputDataToBackend = useStore(state => state.sendInputDataToBackend);
    const addInputData = useStore(state => state.addInputData);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        const parsedPrice = parseFloat(value);
        setPrice(parsedPrice);
    };

    const handleStockChange = (event) => {
        const value = event.target.value;
        const parsedStock = parseInt(value, 10);
        setStock(parsedStock);
    };

    const changeImageHandler = (e) => {
        const file = e.target.files?.[0];

        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoPrev(reader.result);
                    setPhoto(file);
                }
            };
        } else {
            setPhotoPrev("");
            setPhoto(null);
        }
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            // const response = await fetch("http://localhost:5000/api/v1/upload/new", {
            //     method: "POST",
            //     body: formData,
            // });
            const config = {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
              };
            const response = await fetch("https://grow-backend-pi.vercel.app/upload/new",config, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setPhoto(data.filePath);
                console.log("File path:", data.filePath);
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { name, price, stock, photo };
        sendInputDataToBackend(data);
        addInputData(data);
        setName("");
        setPrice(1000);
        setStock(1);
        setPhotoPrev("");
        setPhoto(null);
    };

    return (
        <main className="product-management">
            <article>
                <form onSubmit={handleSubmit}>
                    <h2>New Product</h2>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            name="name"
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            name="price"
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div>
                        <label>Stock</label>
                        <input
                            type="number"
                            placeholder="Stock"
                            value={stock}
                            name="stock"
                            onChange={handleStockChange}
                        />
                    </div>

                    <div>
                        <label>Photo</label>
                        <input type="file" onChange={changeImageHandler} name="file" />
                    </div>

                    {photoPrev && <img src={photoPrev} alt="NewImage" />}
                    <div>
                        <label>Upload Image</label>
                        <input type="file" onChange={uploadImage} name="file" />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </article>
        </main>
    );
};

export default BasicInput;

// import React, { useState } from "react";
// import useStore from "../../store/useStore";

// const BasicInput = () => {
//     const [name, setName] = useState("");
//     const [price, setPrice] = useState(1000);
//     const [stock, setStock] = useState(1);
//     const [photoPrev, setPhotoPrev] = useState("");
//     const [photo, setPhoto] = useState(null);

//     const sendInputDataToBackend = useStore(state => state.sendInputDataToBackend);
//     const addInputData = useStore(state => state.addInputData);

//     const handleNameChange = (event) => {
//       setName(event.target.value);
//     };

//     // const handlePriceChange = (event) => {
//     //   setPrice(event.target.value);
//     // };

//     const handlePriceChange = (event) => {
//       const value = event.target.value; // Get the value from the input field
//       const parsedPrice = parseFloat(value); // Parse the value to a floating-point number
//       setPrice(parsedPrice); // Set the parsed price as the new state value
//     };

//     // const handleStockChange = (event) => {
//     //   setStock(event.target.value);
//     // };

//     const handleStockChange = (event) => {
//       const value = event.target.value; // Get the value from the input field
//       const parsedStock = parseFloat(value); // Parse the value to a floating-point number
//       setPrice(parsedStock); // Set the parsed price as the new state value
//     };

//     const changeImageHandler = (e) => {
//       const file = e.target.files?.[0];
  
//       const reader = new FileReader();
  
//       if (file) {
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//           if (typeof reader.result === "string") {
//             setPhotoPrev(reader.result);
//             setPhoto(file);
//           }
//         };
//       } else {
//         // Clear the selected file and preview if the user cancels file selection
//         setPhotoPrev("");
//         setPhoto(null);
//       }
//     };


//     const uploadImage = async (e) => {
//       const file = e.target.files[0];
//       const formData = new FormData();
//       formData.append("file", file);
  
//       try {
//         const response = await fetch("http://localhost:5000/api/v1/upload/new", {
//           method: "POST",
//           body: formData,
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setPhoto(data.filePath); // Assuming backend returns the file path
//           console.log("File path:", data.filePath);
//         } else {
//           console.error("Failed to upload image");
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     };

//     // const changeImageHandler = (e) => {
//     //   const file = e.target.files?.[0];
    
//     //   const reader = new FileReader();
    
//     //   if (file) {
//     //     reader.readAsDataURL(file);
//     //     reader.onloadend = () => {
//     //       if (typeof reader.result === "string") {
//     //         setPhotoPrev(reader.result);
//     //         setPhoto(file);
//     //       }
//     //     };
//     //   } else {
//     //     // Clear the selected file and preview if the user cancels file selection
//     //     setPhotoPrev("");
//     //     setPhoto(null);
//     //   }
//     // };

//     // const handleSubmit = (event) => {
//     //   event.preventDefault();
//     //   // Add form submission logic here, including sending data to backend
//     //   console.log("Form submitted with data:", { name, price, stock, photo });
//     // };
    

//     const handleSubmit = (event) => {
//       event.preventDefault();
//       // Add the input data to the store
//       const data = { name, price, stock, photo };
//       sendInputDataToBackend(data);
//       addInputData(data);
//       // Reset form fields
//       setName("");
//       setPrice(1000);
//       setStock(1);
//       setPhotoPrev("");
//       setPhoto(null);
//     };

//     return (
//       <main className="product-management">
//         <article>
//           <form onSubmit={handleSubmit}>
//             <h2>New Product</h2>
//             <div>
//               <label>Name</label>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 name="name"
//                 onChange={handleNameChange}
//               />
//             </div>
//             <div>
//               <label>Price</label>
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={price}
//                 name="price"
//                 onChange={handlePriceChange}
//               />
//             </div>
//             <div>
//               <label>Stock</label>
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 value={stock}
//                 name="stock"
//                 onChange={handleStockChange}
//               />
//             </div>

//             <div>
//               <label>Photo</label>
//               <input type="file" onChange={changeImageHandler} name="file"/>
//             </div>

//             {photoPrev && <img src={photoPrev} alt="NewImage"  />}
//             <div>
//             <label>Upload Image</label>
//             <input type="file" onChange={uploadImage} name="file"/>
//           </div>
//             <button type="submit">Create</button>
//           </form>
//         </article>
//       </main>
//     );
// }

// export default BasicInput;
