import React, { useEffect, useState } from 'react'


const SearchBar = (props) => {
    const [value , setValue] = useState("")
    const handleChange = (e)=>{
        setValue(e.target.value)
    }

    const handleSubmit = ()=>{
        props.getValue(value)
    }

  return (
    <div className='searchBar'>
        <div className="input">
            <input type="text" placeholder='Search' name='searchBar' value={value} onChange={handleChange}/>
        </div>
        <div className="icon" onClick={handleSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}

export default SearchBar