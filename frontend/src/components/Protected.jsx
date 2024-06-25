import React from 'react';
import axios from 'axios';

import { Navigate } from 'react-router-dom';

import Card from './Card';
import IdeaForm from './IdeaForm';
import Idea from './Idea';


const Protected = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = React.useState(null);

    const [isEditing, setIsEditing] = React.useState(false);
    const [ideaOpened, setIdeaOpened] = React.useState({
        title: '',
        goal: '',
        motivation: '',
        description: '',
        category: '',
        private: null,
    });

    const displayCards = () => {
        return data.map((idea, index) => {
            return (
                <Card key={index} idea={idea} setIsEditing={setIsEditing} setIdeaOpened={setIdeaOpened} />
            );
        });
    };

    // Obter as Ideias criadas por aquele usuário
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching protected data', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div id='profile-page'>
            <div>
                <h2>Minhas ideias</h2>
                <p>Role para baixo para ver todas as suas ideias incríveis!</p>

                <div id='cards-container'>
                    {!token && <Navigate to="/login" />}
                    {data ? displayCards() : <p>Loading...</p>}
                    
                </div>
            </div>

            { isEditing ? <Idea idea={ideaOpened} setIdea={setIdeaOpened} setIsEditing={setIsEditing} /> : <IdeaForm />}
        </div>
    );
};

export default Protected;