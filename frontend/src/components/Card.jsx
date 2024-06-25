import React from 'react';

function Card(props) {

    function openIdea() {
        props.setIdeaOpened(props.idea);
        props.setIsEditing(true);
    };

    return (
        <div id="card" onClick={openIdea}>
            <img src={props.idea.file} alt={props.idea.title} />
            
            <div className='texts'>
                <h4>{props.idea.title}</h4>

                <div className='category-tag'>{props.idea.category}</div>

                <p>{props.idea.goal}</p>
            </div>
            
            <button onClick={openIdea} >Open</button>
        </div>
    );
};

export default Card;



// https://conteudo.imguol.com.br/c/noticias/1c/2022/05/24/imagem-criada-no-imagen-prototipo-do-google-que-cria-imagens-baseadas-em-texto-neste-caso-um-cachorro-corgi-andando-de-bicicleta-na-times-square-usando-oculos-de-sol-e-chapeu-de-praia-1653397634334_v2_900x506.jpg