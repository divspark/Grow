import React, { useState } from 'react';
import RecipeList from '../../components/consumer/RecipeList';

const SmartBite = () => {
    const [category, setCategory] = useState('');
    const [disease, setDisease] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { category };
        if (category === 'health') {
            data.disease = disease;
        } else if (category === 'nutrition') {
            data.age = age;
            data.weight = weight;
            data.height = height;
            data.gender = gender;
        }

        const response = await fetch('http://127.0.0.1:5000/advisory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        setResult(result);
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
                            <option value="random">Random</option>
                        </select>
                    </div>

                    {category === 'health' && (
                        <div>
                            <label htmlFor="disease">Enter your disease:</label>
                            <input type="text" id="disease" value={disease} onChange={(e) => setDisease(e.target.value)} />
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

                    <button type="submit">Get Advice</button>
                </form>

                {result && (
                    <div>
                        <h2>Result</h2>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                )}
            </section>
                <RecipeList />
        </div>
    );
};

export default SmartBite;
