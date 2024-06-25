import React from 'react';
import axios from 'axios';


function IdeaForm() {

    const [ideaInfo, setIdeaInfo] = React.useState({
        title: "",
        userId: "",
        description: "",
        private: true,
        category: "General",
        goal: "",
        motivation: "",
        file: ""
    });

    function handleChange(e) {
        let { name, value, type, files } = e.target;
        if (type === 'file') { value = files[0] };

        setIdeaInfo({
            ...ideaInfo,
            [name]: value
        });
    };

    async function handleCreateIdea(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', ideaInfo.title);
        formData.append('description', ideaInfo.description);
        formData.append('private', ideaInfo.private);
        formData.append('category', ideaInfo.category);
        formData.append('goal', ideaInfo.goal);
        formData.append('motivation', ideaInfo.motivation);
        formData.append('file', ideaInfo.file);

        try {
            await axios.post('http://localhost:5000/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            alert('Nova ideia registrada com sucesso!');
            window.location.reload();

        } catch (error) {
            console.error('Addintion error', error);
            alert('Ocorreu um erro ao tentar registrar nova ideia :/');
        }
    };


    return (
        <div className='idea-form'>
            <h2>Criar uma nova ideia</h2>
            <form>
                <label>[Título]:</label>
                <input type="text" name="title" className='idea-title' onChange={handleChange} placeholder="" />

                <label>[Objetivo]:</label>
                <textarea id="message" name="goal" className='goal' onChange={handleChange} placeholder="Como a aplicação vai beneficiar seus usuários?"></textarea>

                <label>[Motivação]:</label>
                <textarea id="message" name="motivation" className='motivation' onChange={handleChange} placeholder="O que inspirou/qual necessidade desencadeou a ideia da aplicação?" ></textarea>

                <label>[Descrição]:</label>
                <textarea id="message" name="description" className='description' onChange={handleChange} placeholder="Quais funcionalidades, benefícios, planos, requisitos, …?"></textarea>
                
                <input type="file" name="file" className='cover-image' accept="image/*" onChange={handleChange} />

                <div className='options'>
                    <label>Categoria</label>
                    <select name="category" onChange={handleChange}>
                        <option value="General">General</option>
                        <option value="Technology">Tecnologia</option>
                        <option value="Health">Saúde</option>
                        <option value="Education">Educação</option>
                        <option value="Environment">Meio Ambiente</option>
                    </select>

                    <label>
                        <input type="radio" name="private" value={true} defaultChecked onChange={handleChange} /> Privado
                    </label>
                    <label>
                        <input type="radio" name="private" value={false} onChange={handleChange} /> Público
                    </label>
                </div>

                <button type="submit" onClick={handleCreateIdea} >Salvar</button>
            </form>
        </div>
    );
};

export default IdeaForm;