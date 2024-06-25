import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = React.useState({
        username: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', userInfo);
            localStorage.setItem('token', response.data.token);
            navigate('/profile');
        } catch (error) {
            console.error('Login error', error);
            alert('Error logging in.');
        }
    };

    return (
        <div id='login-page'>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    name='username'
                    value={userInfo.username}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={userInfo.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
