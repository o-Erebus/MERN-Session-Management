import React, {useEffect, useState} from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import axios from "axios";
import {useNavigate} from "react-router";
import useAuthCheck from "../hooks/useAuthCheck";
import authService from "../services/authService";

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {loggedIn,setLoggedIn,username,setUsername} = useAuthCheck(navigate);

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (username !== '' && password !== '') {
            try {
                await authService.login(username, password)
                    .then(res => {
                        console.log(res.data);
                        setLoggedIn(true);
                        navigate('/welcome');
                    })
                    .catch(err => console.error(err));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div style={{
            height:'100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            background: 'linear-gradient(to bottom, darkgray, lightblue)', // Blue gradient

        }}>
            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
        </div>
    );
};

export default LoginPage;
