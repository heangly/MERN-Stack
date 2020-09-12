import React, {useState} from 'react';
import '../styles/SearchForm.css';

const SearchForm = ({getRecipe}) =>{
  const [foodName, setFoodName] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    getRecipe(foodName);
    setFoodName('');
  }

  const handleChange = (evt) => {
    setFoodName(evt.target.value);
  }

  return(
    <form className='SearchForm' onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder='Enter name of the food'
        required
        name='foodName'
        value={foodName}  
        onChange={handleChange}
      />
      <div className="SearchForm-btnContainer">
        <button>
          <i className="fas fa-search"></i> Search
        </button>
      </div>
    </form>
  )
  
}

export default SearchForm;