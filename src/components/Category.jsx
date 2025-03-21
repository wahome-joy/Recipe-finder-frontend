import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
    return (
        <List>
            <SLink to={"/cuisine/African"}>
                <FaPizzaSlice />
                <h4>African</h4>
            </SLink>
            <SLink to={"/cuisine/Dessert"}>
                <FaHamburger />
                <h4>Dessert</h4>
            </SLink>
            <SLink to={"/cuisine/Vegetarian"}>
                <GiNoodles />
                <h4>Vegetarian</h4>
            </SLink>
            <SLink to={"/cuisine/Japanese"}>
                <GiChopsticks />
                <h4>Japanese</h4>
            </SLink>
        </List>
    )
}


const List = styled.div`
display: flex;
justify-content: center ;
margin: 2rem 0rem;
`
const SLink = styled(NavLink)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 50%;
margin: 0rem 1rem;
text-decoration: none;
background: linear-gradient(35deg, #494949, #313131);
width: 6rem;
height: 6rem;
cursor: pointer;
transform: scale(0.8);

h4{
    color: white;
    font-size: 0.8rem;
}

svg{
    color:#fff;
    font-size: 1.5rem;
}

&.active{
    background: linear-gradient(to right, #f27121, #e94057);

    svg{
        color: white;
    }

    h4{
        color: white;
    }
}

`;
export default Category