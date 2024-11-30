import React from 'react'
import { useNavigate } from "react-router";

const Card = (props) => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate('/recipe')
    props.getCode(props.recipe.idMeal)

  }

  return (
    
    <div>
        <div className='card'>
            <div className="img"><img className='img2' src={props.recipe.strMealThumb} alt="" width="100%" height="100%" /></div>
            <h6>{props.recipe.strMeal}</h6>
            <p>{props.category?`Category: ${props.category}`:`Category: ${props.recipe.strCategory}`}</p>
            <button onClick={handleClick}>Recipe</button>
        </div>
    </div>
  )
}

export default Card