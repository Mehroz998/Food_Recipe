// ShoppingCartSlider.jsx
import React, { useEffect, useState} from "react";
import Slider from "react-slick";
import Card from "./Card"
import ClipLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "darkorange",
  borderWidth:"5px",
};

const ShoppingCartSlider = ({category,getCode2}) => {
  const [recipes, setRecipes] = useState([]); // To store recipes for the category
  const [loading, setLoading] = useState(true);
  const settings = {
    infinite: false, // Enable infinite scroll only if there are enough recipes
    speed: 500,
    swipeToSlide: true,
    slidesToShow: Math.min(recipes.length, 8), // Show only the number of available cards or max 8
    slidesToScroll: 1,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
          infinite: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ],
  };
 

  // Fetch recipes for the given category
  const fetchData = async () => {
    try {
      let get = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      let res = await get.json();
      setRecipes(res.meals); // Store recipes
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const getCode = (value)=>{
    getCode2(value);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{margin:"20px",color:"darkorange"}}>{category}</h3>
      {loading ? (
        <ClipLoader
        color="orange"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier= "1"
      />
      ) : (
        <Slider {...settings}>
          {recipes.map((recipe) => (
            <Card key={recipe.idMeal} recipe={recipe} category={category} getCode={getCode}/> // Pass recipe data to Card
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ShoppingCartSlider;
