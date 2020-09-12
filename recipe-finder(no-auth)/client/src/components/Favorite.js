import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import FavoriteDetail from './FavoriteDetail';
import '../styles/Favorite.css'

const Favorite = () => {
  const [favoriteItem, setFavoriteItem] = useState([]);

  const getFavorite = async () => {
    const response = await axios.get(`/server/favorite`)
    setFavoriteItem(response.data);
  };

  const deleteFavorite = async (recipeName) => {
    await axios.delete(`/server/favorite/${recipeName}`);
    const newItems = favoriteItem.filter(item => item.recipeName !== recipeName);
    setFavoriteItem(newItems);
  }
  

  useEffect(() => {
    getFavorite();
  }, [favoriteItem.recipeName]);

  return(
    <div>
      <h1 className='Favorite-heading'> <i className="far fa-heart"></i> Favorite</h1>
      <div className='Favorite-container'>
        {favoriteItem.map(item => (
          <FavoriteDetail 
            key={uuid()}
            item={item}
            deleteFavorite={deleteFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorite;