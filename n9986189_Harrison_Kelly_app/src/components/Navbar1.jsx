import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {Nav, Navbar, Form, Button, ButtonGroup} from "reactstrap";


//Creating the navigation links for website
const NavBar = () =>{
    const navigate = useNavigate();
    const logout =() =>{
        return (
            localStorage.removeItem("token"),
            navigate("/"),
            window.location.reload()
        );
    }

    return(
        
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                    <Link to="/volcanolist">Volcano List</Link>
                    <Link to="/" onClick={logout}>Logout</Link>
                 </li>
            </ul>
        </nav>
    );

}

export default NavBar;