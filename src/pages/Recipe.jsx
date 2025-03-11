import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from 'react';

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState(null); // Initialize as null
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        try {
            const data = await fetch(
                `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
            );
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            const detailData = await data.json();
            setDetails(detailData);
        } catch (error) {
            console.error("Error fetching recipe details:", error);
            // Handle the error appropriately, e.g., show an error message
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchDetails();
        }
    }, [params.id]);

    if (!details) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title} />
            </div>
            <Info>
                <Button
                    className={activeTab === 'instructions' ? 'active' : ''}
                    onClick={() => setActiveTab("instructions")}
                >
                    Instructions
                </Button>
                <Button
                    className={activeTab === 'ingredients' ? 'active' : ''}
                    onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </Button>
                {activeTab === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                        <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                    </div>
                )}
                {activeTab === 'ingredients' && details.extendedIngredients && ( // Check if extendedIngredients exists
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}

// Styled components remain the same

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: #fff;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`
const Info = styled.div`
margin-left: 10rem;
`

export default Recipe;