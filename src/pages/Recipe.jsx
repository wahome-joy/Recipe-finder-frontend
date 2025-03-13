import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from "react";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState(null);
    const [activeTab, setActiveTab] = useState("ingredients");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5376/api/foods/${params.id}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const detailData = await response.json();
                setDetails(detailData);
                console.log("Fetched Recipe Details:", detailData);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };

        if (params.id) {
            fetchDetails();
        }
    }, [params.id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <DetailWrapper>
            <div>
                <h2>{details.name}</h2>
                <img src={details.image_url} alt={details.name} />
            </div>
            <Info>
                
                <Button
                    className={activeTab === "ingredients" ? "active" : ""}
                    onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </Button>

                <Button
                    className={activeTab === "instructions" ? "active" : ""}
                    onClick={() => setActiveTab("instructions")}
                >
                    Instructions
                </Button>

                {/* Instructions Tab */}
                {activeTab === "instructions" && details.instructions && (
                    <div>
                        <h3>Instructions:</h3>
                        {details.instructions.length > 0 ? (
                            details.instructions.map((stepObj, index) => (
                                <ul key={index}>
                                    {Object.values(stepObj).map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                    ))}
                                </ul>
                            ))
                        ) : (
                            <p>No instructions available.</p>
                        )}
                    </div>
                )}

                {/* Ingredients Tab */}
                {activeTab === "ingredients" && details.ingredients && (
                    <div>
                        <h3>Ingredients:</h3>
                        <ul>
                            {details.ingredients.length > 0 ? (
                                details.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))
                            ) : (
                                <p>No ingredients available.</p>
                            )}
                        </ul>
                    </div>
                )}
            </Info>
        </DetailWrapper>
    );
}

// Styled Components
const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: #fff;
    }
    
    h2 {
        margin-bottom: 2rem;
    }

    img {
        width: 400px;
        height: auto;
        border-radius: 10px;
        margin-bottom: 1rem;
        box-shadow: 0 0 20px
    }
   

    li {
        font-size: 1.2rem;
        line-height: 2rem;
        margin: 7px

    }

    ul {
        margin-top: 1rem;
        padding: 0;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #f8f8f8;
    }
`

const Info = styled.div`
    margin-top: 2rem;
    text-align: left;
    width: 60%;
`;

export default Recipe;