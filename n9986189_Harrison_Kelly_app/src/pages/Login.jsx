import {React, useState} from "react";
import { useNavigate} from "react-router-dom";
import { Container} from "reactstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_URL = "http://sefdb02.qut.edu.au:3001";


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        try{
            fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email , password: password })
            })
            .then(res => res.json())
            .then(res => {
                if(res.error === true){
                    alert("Either the user doesn't exist, or credentials are wrong.")

                }
                else{
                    localStorage.setItem("token", res.token);
                    navigate("/")
                    window.location.reload();
                }

            })
            
        } 
        catch(err){
            
        }
       
    }

    return (
        <section className="login_page">
            <Container className="login-container">
                <h1>Login</h1>
                <Form className="login-form" onSubmit={handleSubmit}>
                    <Form.Group className="login-parent-formgroup">
                        <Form.Group className="email-address-form">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event)=> {setEmail(event.target.value);}}/>
                        </Form.Group>
                        <Form.Group className="password-form">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  value={password} onChange={(event) => {setPassword(event.target.value);}}/>
                            <Button 
                            type="submit"
                            variant="primary"
                            color="primary">
                            Login
                            </Button>
                        </Form.Group>
                    </Form.Group>

                </Form> 
            </Container> 
        </section>  
    );


}



