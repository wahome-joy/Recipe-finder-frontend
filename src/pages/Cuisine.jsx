import styled from "styled-components";
import { motion } from "framer-motion"; //  Import motion
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    const [loading, setLoading] = useState(true);
    let params = useParams();

    useEffect(() => {
        const getCuisine = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5376/api/foods/${params.category}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const recipes = await response.json();
                setCuisine(Array.isArray(recipes) ? recipes : []);
            } catch (error) {
                console.error("Error fetching cuisine data:", error);
            } finally {
                setLoading(false);
            }
        };

        getCuisine();
    }, [params.category]);

    return (
        <Grid
            as={motion.div} // Use motion.div inside styled-components
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? (
                <p>Loading...</p>
            ) : cuisine.length > 0 ? (
                cuisine.map((item) => (
                    <Card key={item.id}>
                        <Link to={`/recipe/${item.id}`}>
                            <img src={item.image_url} alt={item.name} />
                            <h4>{item.name}</h4>
                        </Link>
                    </Card>
                ))
            ) : (
                <p>No recipes found for this category.</p>
            )}
        </Grid>
    );
}

// Ensured Grid is a styled `motion.div`
const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
    margin-top: 20px
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2em;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    img:hover {
        transform: scale(1.05);
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    }

    a {
        text-decoration: none;
    }

    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Cuisine;