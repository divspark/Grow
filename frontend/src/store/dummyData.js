const dummyFoodList = [
    {
      _id: 1,
      name: "Apple",
      price: 1.5,
      image: "https://example.com/apple.jpg",
      stock: 10
    },
    {
      _id: 2,
      name: "Banana",
      price: 0.5,
      image: "https://example.com/banana.jpg",
      stock: 15
    },
    {
      _id: 3,
      name: "Orange",
      price: 1,
      image: "https://example.com/orange.jpg",
      stock: 20
    }
  ];
  
  const dummyCartItems = {
    1: 2, // Apple: Quantity 2
    3: 1 // Orange: Quantity 1
  };
  
  export { dummyFoodList, dummyCartItems };
  