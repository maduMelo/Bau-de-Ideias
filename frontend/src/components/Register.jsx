// src/components/Register.js
import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Register = () => {
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

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/register', userInfo);
            alert('User registered successfully!');
            navigate('/login');
        } catch (error) {
            console.error('Registration error', error);
            alert('Error registering user.');
        }
    };

    return (
        <div id='register-page'>
            <form onSubmit={handleRegister}>
                <h2>Cadastro</h2>

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
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Register;
