import React from "react";
import { useState, useEffect } from "react";
import NavBarUser from "./Navbar";
import NavBar from "./Navbar1";

const Header = () => {
    const [userData, setUserData] = useState();
    useEffect(() => {
        setUserData(localStorage.getItem("token"));
    }, [localStorage.getItem("token")]);
    
    return(
        <header>
            <>
                {userData ? <NavBar/>  : <NavBarUser/>}
            </>
        </header>
    );
}

export default Header;