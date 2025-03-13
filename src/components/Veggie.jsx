import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggie() {

  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5376/api/foods/Vegetarian");
      const data = await response.json();
      console.log("API Response:", data);

      if (!data || typeof data !== "object") {
        console.error("Invalid API response:", data);
        setVeggie([]); // Avoid crash
        return;
      }  
  
      if (Array.isArray(data)) {
        setVeggie(data); // Directly set data without using localStorage
      } else {
        console.error("Unexpected API response format:", data);
        setVeggie([]); // Prevent UI issues if response is invalid
      }
    } catch (error) {
      console.error("Error fetching vegetarian recipes:", error);
      setVeggie([]); // Prevent crashes by ensuring veggie is always an array
    }
  };
  
  return (
    <div>
      <Wrapper>
        <h3>Our Vegeterian Picks</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: true,
          drag: "free",
          gap: "5rem"
        }}>
          {veggie?.length > 0 ? (
          veggie.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
              {recipe.id && (
                <Link to={`/recipe/${recipe.id}`}>
                    <p>{recipe.name}</p>
                    <img src={recipe.image_url} alt={recipe.name} />
                    <Gradient />
                </Link>
              )}
              </Card>
            </SplideSlide>
          ))
        ) : (
          <p>No vegetarian recipes available.</p>
        )}

        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
margin: 4rem 0rem;
`
const Card = styled.div`
min-height: 25rem;
border-radius: 2rem;
overflow: hidden;
position: relative;

img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`
export default Veggie