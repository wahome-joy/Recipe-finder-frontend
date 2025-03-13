import React, {useState} from "react";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import Navbar from "./components/Navbar";




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
        <Pages isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      </BrowserRouter>
    </div>
  );
}

export default App;