import React from 'react';

const RecipeCard = ({ name, image, url, ingredients, calories }) => {
  return (
    <div className="recipe-card">
      <div className="image-container">
        <img src={image} alt={name} />
      </div>
      <div className="recipe-details">
        <h2>{name}</h2>
        <a href={url} target="_blank" rel="noopener noreferrer">View Recipe</a>
        <p>Ingredients: {ingredients.join(', ')}</p>
        {/* <p>Nutrients: {nutrients}</p> */}
        <p>Calories: {calories}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
