import React from "react";
import axios from "axios";

function Idea(props) {

    function handleChange(e) {
        const { name, value } = e.target;
        props.setIdea({
            ...props.idea,
            [name]: value
        });
    };

    function stopEditing(e) {
        e.preventDefault();
        props.setIsEditing(false);
    };

    // Atualizar uma Ideia específica escolhida pelo usuário
    async function handleUpdateIdea(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/profile/${props.idea._id}`, props.idea, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Idea atualizada com sucesso!');
            window.location.reload();
        } catch (error) {
            console.error('Updating error', error);
            alert('Ocorreu um erro ao tentar atualizar a ideia :/');
        }
    };

    // Deletar uma Ideia específica escolhida pelo usuário
    async function handleDeleteIdea(e) {
        e.preventDefault();

        const userConfirmed = window.confirm("Tem certeza que deseja deletar a ideia?");
        if (!userConfirmed) return;

        try {
            await axios.delete(`http://localhost:5000/profile/${props.idea._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Idea deletada com sucesso!');
            window.location.reload();
            
        } catch (error) {
            console.error('Deletion error', error);
            alert('Ocorre um erro ao tentar deletar a ideia :/');
        }
    };
    //‹⟨↲↰↩◁

    return (
        <div className='idea'>
            <div className="top-part">
                <button onClick={stopEditing}>↩ Voltar</button>
                <h2>{ props.idea.title }</h2> 
            </div>
           
            <form>
                <label>[Objetivo]:</label>
                <textarea id="message" name="goal" className='goal' onChange={handleChange} value={props.idea.goal} placeholder="Como a aplicação vai beneficiar seus usuários?"></textarea>

                <label>[Motivação]:</label>
                <textarea id="message" name="motivation" className='motivation' onChange={handleChange} value={props.idea.motivation} placeholder="O que inspirou/qual necessidade desencadeou a ideia da aplicação?" ></textarea>

                <label>[Descrição]:</label>
                <textarea id="message" name="description" className='description' onChange={handleChange} value={props.idea.description} placeholder="Quais funcionalidades, benefícios, planos, requisitos, …?"></textarea>

                <div className='options'>
                    <label>Categoria</label>
                    <select name="category" onChange={handleChange}>
                        <option value="General">General</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Environment">Environment</option>
                    </select>

                    <label>
                        <input type="radio" name="private" value={true} onChange={handleChange} defaultChecked /> Privado
                    </label>
                    <label>
                        <input type="radio" name="private" value={false} onChange={handleChange} /> Público
                    </label>
                </div>

                <div className="buttons">
                    <button type="submit" onClick={handleDeleteIdea} >Deletar Idea</button>
                    <button type="submit" onClick={handleUpdateIdea} >Salvar</button>
                </div>
                
            </form>
        </div>
    );
};

export default Idea;