// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import "./AiwithText.css";

// export const AiwithText = () => {
//   const genAI = new GoogleGenerativeAI(
//     "AIzaSyDaVQhWemPqNb_Di8PphWX0_OX34Byeeho"
//   );

//   const [search, setSearch] = useState("");
//   const [aiResponse, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   /**
//    * Generative AI Call to fetch text insights
//    */
//   async function aiRun() {
//     setLoading(true);
//     setResponse("");
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt = `random meals related to ${search} with name as Name field with working images and display it named as Image field not dummy and price in INR as Price field and recipe url named as Recipe working link give only these 4 fields numbered as 1,2,3,4 and display data in form of json inside a array and do not write any comments like json etc. and all fields are diplayed in separate line with their field name`;
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text();
//     setResponse(text);
//     setLoading(false);
//   }

//   const handleChangeSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleClick = () => {
//     aiRun();
//   };

//   return (
//     <div>
//       <div style={{ display: "flex" }}>
//         <input
//           placeholder="Search Food with Category using Generative AI"
//           onChange={(e) => handleChangeSearch(e)}
//         />
//         <button style={{ marginLeft: "20px" }} onClick={() => handleClick()}>
//           Search
//         </button>
//       </div>

//       {loading === true && aiResponse === "" ? (
//         <p style={{ margin: "30px 50px 0 50px" }}>Loading ...</p>
//       ) : (
//         <div style={{ margin: "30px 0" }}>
//           {aiResponse.split("\n").map((item, index) => (
//             <p key={index}>{item}</p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AiwithText;


import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./AiwithText.css";

export const AiwithText = () => {
  const genAI = new GoogleGenerativeAI("AIzaSyDaVQhWemPqNb_Di8PphWX0_OX34Byeeho");

  const [search, setSearch] = useState("");
  const [aiResponse, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Generative AI Call to fetch text insights
   */
  async function aiRun() {
    setLoading(true);
    setResponse([]);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `random meals related to ${search} with name as Name field with working images and display it named as Image field not dummy and price in INR as Price field and recipe url named as Recipe and fetch recipe from edamam link give only these 4 fields numbered as 1,2,3,4 and display data in form of json inside a array and do not write any comments like json etc. and all fields are displayed in separate line with their field name`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
    setResponse(JSON.parse(text));
    setLoading(false);
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    aiRun();
  };

  return (
    <div>
     <div style={{ display: "flex" }}>
        <input
          placeholder="Search Food with Category using Generative AI"
          onChange={(e) => handleChangeSearch(e)}
        />
        <button className="ai-btn" style={{ marginLeft: "20px" }} onClick={() => handleClick()}>
          Search
        </button>
      </div>
    {/* <div className="container">
      <div className="search-container">
        <input
          placeholder="Search Food with Category using Generative AI"
          onChange={handleChangeSearch}
        />
        <button onClick={handleClick} style={{ marginLeft: "20px" }}>
          Search
        </button>
      </div> */}

      {loading ? (
        <p className="loading">Loading ...</p>
      ) : (
        <div className="cards-container-ai">
          {Array.isArray(aiResponse) && aiResponse.map((item, index) => (
            <div key={index} className="card">
              <img src={item.Image} alt={item.Name} className="card-image" />
              <h3 className="card-title">{item.Name}</h3>
              <p className="card-price">Price: ₹{item.Price}</p>
              <a href={item.Recipe} className="card-recipe" target="_blank" rel="noopener noreferrer">Recipe</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AiwithText;
