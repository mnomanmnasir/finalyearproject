// import React from 'react'
// import { useHistory} from react-router-dom


// const SignIn = () => {
//     return (
//         <>
//             <div>

//                 SignIn Page

//             </div>
//         </>
//     )
// }


// export default SignIn;
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../App';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../container/AuthContext';
import Cookies from 'js-cookie';

const SignIn = () => {
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
    const [passwordShown, setPasswordShown] = useState(false);
    
    const { login } = useAuth();

    const handleInputChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle login logic here
        try {
            const response = await Axios.post(baseUrl + '/auth/signin', {
                email: loginInfo.username,
                password: loginInfo.password
            });
            // if (response.data.roles.includes("ROLE_ADMIN") || response.data.roles.includes("ROLE_MODERATOR")) {
            if (login(response.data.accessToken)) {
                toast.success('Login successfull');
                console.error('Login Successfull');
                navigate('/');
            }
            Cookies.set("name", response.data.firstName + " " + response.data.lastName);
            Cookies.set("refreshToken", response.data.refreshToken);
            Cookies.set("role", response.data.roles[0]);
            // } else {
            //     console.error('Permission denied');
            // }

        } catch (error) {
            console.error('Error submitting data: ', error, error?.data);
            toast.error('Login Failed');
            console.log('Login Info:', loginInfo);
        }

    };

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '600px' }} className='p-5'>
                <Card.Body>
                    <Card.Title className="mb-4 fs-3" >ACCOUNT LOGIN</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 mt-5">
                            <Form.Label>USERNAME</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={loginInfo.username}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 ">
                            <Form.Label>PASSWORD</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    value={loginInfo.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputGroup.Text onClick={togglePasswordVisibility}>
                                    {passwordShown ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <div className='d-flex justify-content-between'>
                            <Form.Group className="">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between align-items-center ">
                                <Form.Text className="text-muted">
                                    Forgot Password?
                                </Form.Text>
                            </div>
                        </div>

                        <Button variant="secondary" type="submit" className="mt-5 align-center w-25 rounded-pill text-center">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <ToastContainer position="top-right" autoClose={5000} />
        </Container>
    );
};

export default SignIn;
