import React from 'react';
import {v4 as uuid} from 'uuid';
import '../styles/FavoriteDetail.css';

const FavoriteDetail = props => {
  const {recipeName, description, image} = props.item;
  const [ingredients, health] = description;

  const handleDelete = () => {
    props.deleteFavorite(recipeName);
  }

  return(
    <div className='FavoriteDetail'>
      <div className='image-container'>  
        <img src={image} alt={recipeName}/>
        <button onClick={handleDelete}> <i className="far fa-trash-alt"></i> Delete</button>
      </div>
   
      <div className='FavoriteDetail-right'>
        <h3 className='title'>{recipeName}</h3>
        <h4 className='sub-title'>Ingredients:</h4>
        <div className='info-container'>
          <div className='info'>
            {ingredients.map(ingre => (
            <p key={uuid()}><i className="far fa-circle"></i> {ingre}</p>
            ))}
          </div>

          <h4 className='sub-title'>Health Labels:</h4>
          <div className='info'>
            {health.map(h => (
            <p key={uuid()}><i className="far fa-circle"></i> {h}</p>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default FavoriteDetail;