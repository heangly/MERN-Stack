import React from 'react';
import {v4 as uuid} from 'uuid';
import '../styles/RecipeDetail.css';

const RecipeDetail = ({ingredientLines, healthLabels}) =>{
  return(
    <div className='RecipeDetail'>
      <div className="RecipeDetail-ingredient">
        <h3>Ingredients:</h3>
          {ingredientLines.map(ingre => (
            <li key={uuid()}>
              <i className="far fa-circle"></i> {ingre}
            </li>
          ))}
      </div>

      <div className="RecipeDetail-health'">
        <h3>Health Lables:</h3>
          {healthLabels.map(health => (
            <li key={uuid()}>
              <i className="far fa-circle"></i> {health}
            </li>
          ))}
      </div>

    </div>
  )
  
}

export default RecipeDetail;