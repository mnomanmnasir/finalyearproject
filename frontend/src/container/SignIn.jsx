import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { BsFillEyeFill, BsFillEyeSlashFill, BsPersonFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../App';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../container/AuthContext';
import Cookies from 'js-cookie';
import video from '../assests/video.mp4'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import Helmet from './Helmet'



const SignIn = () => {

    const buttonStyle = {
        width: '600px',
        backgroundImage: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 50%, #FFA07A 90%)',
        borderImage: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 50%, #FFA07A 90%)',
        borderImageSlice: '1',
        color: 'white',
        fontWeight: 'bold',
    };


    const [typingEffect] = useTypewriter({
        words: ['Inventory Management', 'Order Management', 'Automation and Robotics', 'Effective Inventory', 'Integration Capabilities', 'Real Time Tracking'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 40,
    });
    const [text, setText] = useState('');
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
    const [passwordShown, setPasswordShown] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [welcomeAnimationComplete, setWelcomeAnimationComplete] = useState(false);
    const [textAnimationComplete, setTextAnimationComplete] = useState(false);

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
        <Helmet title='Sign In'>
        <Container fluid className="p-0">
            <Row className="m-0">
                <Col md={8} className="d-flex align-items-center p-0 mb-0 bg-black position-relative">
                    {/* <Card> */}
                    <video
                        style={{ width: '100%', height: '641px', objectFit: 'cover', opacity: 0.2 }} controls={false} autoPlay // Add autoPlay attribute to start the video automatically
                        loop
                        muted>
                        <source src={video} />
                    </video>
                    <div className="typewriter-container text-left  position-absolute top-0 start-0" style={{ position: 'absolute', zIndex: 1, fontFamily: 'Protest Guerrilla, sans-serif', fontSize: '24px', margin: '100px', marginLeft: '100px', fontWeight: 'bold', color: 'white', fontStyle: 'italic' }}>
                        <h3 style={{fontWeight: 'bold'}}>
                            Welcome To Warehouse Management System
                        </h3>
                        <span>
                            - {typingEffect}
                        </span>
                        <Cursor cursorStyle='|' />
                    </div>
                </Col>
                <Col md={4} className="text-center d-flex align-items-center mb-0">
                    {/* <Card style={{ width: '700px', marginLeft: '-12px', height: '620px' }} className='p-5'> */}
                    <Card.Body style={{ width: '700px', marginLeft: '-12px', height: '620px', fontFamily: 'Protest Guerrilla, sans-serif', fontStyle: 'italic', fontWeight: 'bold' }} className='p-5'>
                        <Card.Title className="mt-5 fs-3">ADMIN LOGIN</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 mt-5">
                                <Form.Label >USERNAME</Form.Label>
                                <Form.Control
                                    className="rounded"
                                    type="text"
                                    name="username"
                                    value={loginInfo.username}
                                    onChange={handleInputChange}
                                    required
                                    icon={BsPersonFill}
                                />
                                {/* <BsPersonFill style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px' }} /> */}
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

                            <Button variant="dark" type="submit" className="mt-5 align-center w-25 rounded-pill text-center"
                            >
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                    {/* </Card> */}
                    <ToastContainer position="top-right" autoClose={5000} />
                </Col>
            </Row>

        </Container >
        </Helmet>
    );
};

export default SignIn;


