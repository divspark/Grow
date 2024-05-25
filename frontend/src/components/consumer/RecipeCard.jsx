import React from 'react';

const RecipeCard = ({ recipe }) => {
    return (
        <div className='recipe-card'>
            
            <img src={recipe.image} alt={recipe.label} />
            <h2 className='recipe-name'>{recipe.name}</h2>
            <ul>
                {recipe.ingredientLines && Array.isArray(recipe.ingredientLines) && // Check if ingredientLines is defined and is an array
                    recipe.ingredientLines.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
            </ul>
            <p>Calories: {Math.round(recipe.calories)}</p>
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
        </div>
    );
};

export default RecipeCard;