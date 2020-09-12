import React, {useState} from 'react';
import RecipeBox from './RecipeBox';
import axios from 'axios';
import SearchForm from './SearchForm';
import {v4 as uuid} from 'uuid';
import '../styles/Recipes.css'

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [foundRecipe, setFoundRecipe] = useState(true);

  const getRecipe = async (foodName) => {
    let recipeData = [];
    const url = `/server/search?foodName=${foodName}`;
    const response =  await axios.get(url);

    if (response.data.length){
      response.data.forEach(data => {
        const {label,ingredientLines,healthLabels, image} =  data.recipe;
        recipeData.push({label,ingredientLines,healthLabels, image});
      });
      setRecipes(recipeData);
      setFoundRecipe(true);
    }else{
      setFoundRecipe(false);
    }
  }

  return(
    <div className='Recipes-container'>
      <h1 className='Recipes-heading'><i className="fas fa-utensils"></i> Recipe Finder</h1>
      <SearchForm getRecipe={getRecipe}/>
      {foundRecipe ?
        <div className="Recipes-list">
          {recipes.map(recipe =>
              <RecipeBox 
                id = {uuid()}
                key = {uuid()}
                label={recipe.label}
                ingredientLines={recipe.ingredientLines}
                healthLabels={recipe.healthLabels}
                image={recipe.image}
              />
          )}
        </div>
        :
        <h1 className='Recipes-notFound'><i className="far fa-times-circle"></i> Recipe Not Found !</h1>
      }
    </div>
  )
}

export default Recipes;