import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {

    Typography,
    CardContent, Box, Button
} from "@mui/material";

import { useNavigate } from 'react-router-dom';

import '../style/style.css'
import authService from "../services/authService";


const Home = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data after login
        authService.checkAuth()
            .then(res => {
                if (res.data.authenticated) {
                    setUsername(res.data.username);
                } else {
                    navigate('/'); // Redirect to login page if not authenticated
                }
            })
            .catch(err => console.error(err));
        // Add event listener for window close
        window.addEventListener('beforeunload', handleWindowClose);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        };

    }, [navigate]);

    const handleLogout = () => {
        authService.logout()
            .then(res => {
                navigate('/'); // Redirect to login page after logout
            })
            .catch(err => console.error(err));
    };

    const handleWindowClose = (event) => {
            // Constructing a URL for the logout endpoint
            const logoutEndpoint = 'http://localhost:5000/logout';

            // Creating a form data object with minimal data
            const formData = new FormData();
            formData.append('logout', 'true');

            // Sending a beacon with the logout data
            navigator.sendBeacon(logoutEndpoint, formData);

            console.log("Session cookie cleared");
    };


    return (
        <div style={{
            background: 'linear-gradient(to bottom, darkgray, lightblue)', // Blue gradient
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            height:'100vh'
        }}>
            <div style={{

                border: '1px solid', // Add a single-pixel gray border
                borderRadius: 5, // Apply subtle rounded corners
                padding: 20, // Provide some padding for the contents
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Add a subtle drop shadow
                maxWidth: 300, // Optional: Set a maximum width for responsiveness
            }}>
                <CardContent sx={{
                    textAlign:'center',
                }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome, {username}
                    </Typography>
                </CardContent>
                <CardContent sx={{
                    marginTop:3
                }}>
                    <Box border={1} sx={{
                        marginBottom:2,
                        padding: '8px',
                        borderRadius: '4px',
                        border: '0.5px solid gray',

                    }}>
                        <Typography variant="subtitle1" color="text.secondary" sx={{
                            textAlign:'center',
                        }}>
                            Creator Name: Neel
                        </Typography>
                    </Box>
                    <Box border={1} sx={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '0.5px solid gray',

                    }}>
                        <Typography variant="subtitle1" color="text.secondary" sx={{
                            textAlign:'center',
                        }}>
                            Github: <a href="https://github.com/o-Erebus">o-Erebus</a>
                        </Typography>
                    </Box>
                </CardContent>
                <CardContent sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:6,

                }}>
                    <Button fullWidth onClick={handleLogout} variant="contained">
                        Logout
                    </Button>
                </CardContent>

            </div>
        </div>
    );
};

export default Home;
