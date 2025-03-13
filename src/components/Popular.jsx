import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Popular() {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5376/api/foods/popular`);
            const data = await response.json();
    
            console.log("API Response:", data); // Debugging log
    
            // Ensure data is an array (modify based on actual API response)
            if (!data || !Array.isArray(data)) {
                console.error("Invalid API response:", data);
                setPopular([]); // Prevents UI crashes
                return;
            }
    
            setPopular(data); // Directly set the API data
        } catch (error) {
            console.error("Error fetching popular recipes:", error);
            setPopular([]); // Handles fetch failure
        }
    };
    
    

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "5rem"
                }}>
                    {popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={"/recipe/" + recipe.id}>
                                        <p>{recipe.name}</p>
                                        <img src={recipe.image_url} alt={recipe.name} />
                                        <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    );
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

export default Popular;