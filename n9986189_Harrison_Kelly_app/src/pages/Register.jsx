import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container} from "reactstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_URL = "No longer valid"

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        try{
            fetch(`${API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email , password: password })
            })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("email", res.email);
                localStorage.setItem("password", res.password);
                navigate("/Login")
            })
        } catch(err){
            console.log(err)
        }
    }

    return (
        <section className="login_page">
            <Container className="register-page-container">
                <h1>Register</h1>
                <Form className="register-login" onSubmit={handleSubmit}>
                    <Form.Group className="register-parent-formgroup">
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
                            Register
                            </Button>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </Container>
        </section>  
    );


}