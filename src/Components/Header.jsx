import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleClick = ()=>{
    navigate('/')
    window.location.reload();
  }
  return (
    <>
        <div className='header'>
            <p onClick={handleClick}>Food Recipe App</p>
        </div>
    </>
  )
}

export default Header