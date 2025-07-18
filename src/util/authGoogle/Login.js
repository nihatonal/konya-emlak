import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleButton from 'react-google-button'
// import Logout from './Logout';
const Login = () => {
    const [user, setUser] = useState(null);


    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (tokenResponse) => {
            try {
                // Exchange code for tokens and set refresh token via backend
                const response = await axios.post(
                    'http://localhost:5000/auth/google',
                    { code: tokenResponse.code },
                    { withCredentials: true } // Important for cookies
                );
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                setUser(response.data.user)
                console.log('Access token received and refresh token stored in cookie.');
            } catch (err) {
                console.error('Token exchange failed:', err.response?.data || err.message);
            }
        },
        onError: () => console.log('Login Failed'),
        access_type: 'offline',
        prompt: 'consent',
    });

    const Logout = () => {
        const handleLogout = async () => {
            try {
                await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });

                // Remove access token from localStorage
                localStorage.removeItem('access_token');
                localStorage.removeItem('userInfo');
                setUser(null)
                console.log('Logged out successfully');
                // alert('You have been logged out.');
            } catch (err) {
                console.error('Logout failed:', err.response?.data || err.message);
            }
        };

        return <button onClick={handleLogout}>Logout</button>;
    };

    useEffect(() => {
        const user = localStorage.getItem('userInfo');
        setUser(user)
    }, [])


    return (
        <div>
            {!user ?
                <GoogleButton
                    onClick={() => login()}
                    type="dark"
                    label='Google ile giriş yapın'
                />
                : <Logout />}
        </div>
    );
};

export default Login;
