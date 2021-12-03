import React, {useState} from 'react';
import RecipeDetail from './RecipeDetail';
import axios from 'axios';
import '../styles/RecipeBox.css'

const RecipeBox = ({label, image, ingredientLines, healthLabels}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [favoriteColor, setFavoriteColor] = useState('black');

  const handleShowIngredient = () => {
    setShowDetail(!showDetail);
  }

  const addFavorite = async dataToSend => {
    if (favoriteColor === 'black'){
      const settings = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: dataToSend
      };
      const url = `/server/favorite`;
      const response = await axios.post(url, settings);
 
      if (response.status === 200){
        setFavoriteColor('red');
      }
    }
    else{
      const url = `/server/favorite/${dataToSend.recipeName}`;
      const response = await axios.delete(url);
      console.log(response)
      setFavoriteColor('black');
    }
  }

  return(
    <div className='RecipeBox'>
      <img src={image} alt={label}/>
      <h4>{label}</h4>
      {/* if the showDetail state is true, we show detail; otherwise no show */}
      <div className="RecipeBox-btn">
        <button className='RecipeBox-btn-ingredient' onClick={handleShowIngredient}> 
          <i className="far fa-question-circle"></i> Info
        </button>

        <button 
          className='RecipeBox-btn-like' 
          onClick={() => addFavorite({recipeName:label, image:image, description:[ingredientLines, healthLabels]})}>
            <div style={{color: favoriteColor}}>
              <i className="far fa-heart"> </i> Favorite
            </div>
        </button>
      </div> 

      <div className={showDetail ? 'RecipeInfo show' : 'RecipeInfo hide'}>
          <RecipeDetail
            ingredientLines={ingredientLines} 
            healthLabels={healthLabels}
          />
      </div>
    </div>
  )

}

export default RecipeBox;
