import React from 'react'
import '../App.css';
import Header from './Header';
import SearchBar from './SearchBar';
import ShoppingCartSlider from './ShoppingCartSlider';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, CSSProperties } from 'react';
import ClipLoader from "react-spinners/PulseLoader";
import Card from './Card';

const override= {
    display: "block",
    margin: "0 auto",
    borderColor: "darkorange",
    borderWidth:"5px",
  };

const Main = ({getCode3}) => { 
    const [categories , setCategories] = useState([])
    const [loading, setLoading] = useState(true); // Add loading state
    const [value , setValue] = useState('')
    const [recipe,setRecipe] = useState([])
    const category = async () => {
        try {
          let get = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
          let res = await get.json();
          setCategories(res.categories);
          setLoading(false); // Data fetched, stop loading
        } catch (error) {
          console.error("Error fetching categories:", error);
          setLoading(false); // Stop loading even if there's an error
        }
      };
      useEffect(()=>{
        category()
       },[])

       const getValue = async (value)=>{
        setValue(value)
        const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        const res = await get.json()
        setLoading(false);
        setRecipe(res.meals)
      }
    

      const getCode2 = (value)=>{
        getCode3(value)
      }

      const getCode = (value)=>{
        getCode3(value)
      }
  return (
    <>
    <Header />
    <SearchBar getValue={getValue}/>
      {value?(
        <div className="search-results">
          {loading ? ( // Show a loader when loading
            <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <ClipLoader
                  color="orange"
                  loading={loading}
                  cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  speedMultiplier= "1"
                />
            </div>
        
      ) :(recipe?(recipe.map((e)=>(
            <Card recipe={e} getCode={getCode}/>
          ))):<h2>Recipe Not Found</h2>)}
        </div>
      ):
      (loading ? ( // Show a loader when loading
        <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <ClipLoader
              color="orange"
              loading={loading}
              cssOverride={override}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
              speedMultiplier= "1"
            />
        </div>
        
      ) : (
        categories?.map((e) => (
          <ShoppingCartSlider key={e.idCategory} category={e.strCategory} getCode2={getCode2}/>
        ))
      ))}
  </>
  )
}

export default Main