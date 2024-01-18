import React from "react";
import { Link} from "react-router-dom";

//Creating the navigation links for website
const NavBarUser = () =>{
    return(
        
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                    <Link to="/volcanolist">Volcano List</Link>
                    <Link to="/Login">Login</Link>
                    <Link to="/Register">Register</Link>
                 </li>
            </ul>
        </nav>
    );

}

export default NavBarUser;
