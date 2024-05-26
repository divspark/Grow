import React, { useState } from 'react';
import RecipeList from '../../components/consumer/RecipeList';

const SmartBite = () => {
    const [category, setCategory] = useState('');
    const [disease, setDisease] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');
    const [query, setQuery] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const calculateCalories = () => {
        // Calculate average daily calories needed based on age, weight, height, and gender
        // Example formula (this can be adjusted based on actual calculation)
        const baseCalories = gender === 'male' ? 66.5 : 65.5;
        const ageFactor = age * 6.8;
        const weightFactor = weight * 13.75;
        const heightFactor = height * 5.003;
        const caloriesNeeded = baseCalories + weightFactor + heightFactor - ageFactor;
        return caloriesNeeded;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { category };
        if (category === 'health') {
            setSubmitted(true); // Set submitted to true when the form is submitted for health
        } else if (category === 'nutrition') {
            data.age = age;
            data.weight = weight;
            data.height = height;
            data.gender = gender;
        } else if (category === 'Random Recipe') {
            setSubmitted(true); // Set submitted to true when the form is submitted for random recipe
        }
    };

    return (
        <div className='advisory-container' >
            <section className="advisory">
                <h1>Advisory App</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="category">Choose a category:</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select</option>
                            <option value="health">Health</option>
                            <option value="nutrition">Nutrition</option>
                            <option value="Random Recipe">Random Recipe</option>
                        </select>
                    </div>

                    {category === 'health' && (
                        <div>
                            <input
                                type="text"
                                value={disease} // Use disease state for health input
                                onChange={(e) => setDisease(e.target.value)} // Update disease state
                                placeholder="Enter your allergy"
                            />
                        </div>
                    )}

                    {category === 'nutrition' && (
                        <div>
                            <label htmlFor="age">Age:</label>
                            <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                            <label htmlFor="weight">Weight (kg):</label>
                            <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            <label htmlFor="height">Height (cm):</label>
                            <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                            <label htmlFor="gender">Gender:</label>
                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    )}
                    {category === 'Random Recipe' && (
                        <div>
                            <input
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                placeholder="Enter any vegetable"
                            />
                            {/* Pass the query state */}
                        </div>
                    )}

                    <button type="submit">Get Advice</button>
                </form>
            </section>

            {(submitted && (category === 'Random Recipe' || category === 'health' || category === 'nutrition')) && (
                <div className="recipe-container">
                    <RecipeList query={query || disease || calculateCalories()} /> {/* Pass query or disease based on category */}
                </div>
            )}
        </div>
    );
};

export default SmartBite;

// import React, { useState } from 'react';
// import RecipeList from '../../components/consumer/RecipeList';

// const SmartBite = () => {
//     const [category, setCategory] = useState('');
//     const [disease, setDisease] = useState('');
//     const [age, setAge] = useState('');
//     const [weight, setWeight] = useState('');
//     const [height, setHeight] = useState('');
//     const [gender, setGender] = useState('');
//     const [result, setResult] = useState('');
//     const [query, setQuery] = useState('');
//     const [submitted, setSubmitted] = useState(false);

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let data = { category };
//         if (category === 'health') {
//             e.preventDefault();
//         // Your form submission logic
//             setSubmitted(true); 
//         } else if (category === 'nutrition') {
//             data.age = age;
//             data.weight = weight;
//             data.height = height;
//             data.gender = gender;
//         } else if (category === 'Random Recipe') {
//             e.preventDefault();
//         // Your form submission logic
//             setSubmitted(true); 
//         }

//         // const response = await fetch('http://127.0.0.1:3000/advisory', {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         //     body: JSON.stringify(data),
//         // });

//         // const result = await response.json();
//         // setResult(result);
//     };
//     return (
//         <div className='advisory-container' >
//             <section className="advisory">
//                 <h1>Advisory App</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="category">Choose a category:</label>
//                         <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
//                             <option value="">Select</option>
//                             <option value="health">Health</option>
//                             <option value="nutrition">Nutrition</option>
//                             <option value="Random Recipe">Random Recipe</option>
//                         </select>
//                     </div>

//                     {category === 'health' && (
//                         <div>
//                             <input
//                             type="text"
//                             value={query}
//                             onChange={handleInputChange}
//                             placeholder="Enter any vegetable"
//                             />
//                         </div>
//                     )}

//                     {category === 'nutrition' && (
//                         <div>
//                             <label htmlFor="age">Age:</label>
//                             <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
//                             <label htmlFor="weight">Weight (kg):</label>
//                             <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
//                             <label htmlFor="height">Height (cm):</label>
//                             <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
//                             <label htmlFor="gender">Gender:</label>
//                             <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
//                                 <option value="">Select</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                             </select>
//                         </div>
//                     )}
//                     {category === 'Random Recipe' && (
//             <div>
//               <input
//                 type="text"
//                 value={query}
//                 onChange={handleInputChange}
//                 placeholder="Enter any vegetable"
//               />
//                {/* Pass the query state */}
//             </div>
//           )}

//                     <button type="submit">Get Advice</button>
//                 </form>

//                 {/* {result && (
//                     <div>
//                         <h2>Result</h2>
//                         <pre>{JSON.stringify(result, null, 2)}</pre>
//                     </div>
//                 )} */}
//             </section>
            
//             {category === 'Random Recipe' && ( 
//             <div className="recipe-container">
//                 <RecipeList query={query} />
//             </div>)
            
//             }
//             {
//             category === 'Health' && ( 
//             <div className="recipe-container">
//                 <RecipeList query={disease} />
//             </div>)
//             }
//         </div>
//     );
// };

// export default SmartBite;