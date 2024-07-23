# Baú de Ideias

## Descrição
O **Baú de Ideias** é uma aplicação que serve como um repositório para os usuários anotarem ideias inovadoras para soluções digitais. A aplicação permite aos usuários adicionar, modificar, visualizar e deletar ideias. Cada ideia possui perguntas norteadoras que ajudam o usuário a desenvolver a sua ideia inicial.

## Funcionalidades Principais
- **CRUD de Ideias:** Adicionar, modificar, visualizar e deletar ideias.
- **Perguntas Norteadoras:** Instigam o usuário a desenvolver melhor sua ideia.
- **Upload de Imagens:** O usuário pode escolher uma imagem da sua galeria para utilizar como foto de capa para o card da ideia.
- **Autenticação e Autorização:** Acesso restrito às páginas de perfil, com autenticação baseada em JWT.

## Tecnologias Utilizadas
### Frontend
- **React**
- **Axios** para requisições HTTP
- **React Router DOM** para navegação entre páginas

### Backend
- **Node.js**
- **Express** para criação das rotas
- **Mongoose** para criação de schemas (User, Idea)
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **multer** para receber e armazenar as imagens
- **aws-sdk** para interagir com o bucket da AWS


### Banco de Dados
- **MongoDB** para armazenamento de informações textuais
- **AWS S3** para armazenamento de arquivos binários (imagens)


## API Endpoints
- **GET /**: Retorna as informações da página inicial.
- **POST /register**: Registra um novo usuário.
- **POST /login**: Autentica um usuário e retorna um token JWT.
- **GET /profile/**: Retorna todas as ideias do usuário autenticado.
- **POST /profile/**: Cria uma nova ideia.
- **PUT /profile/:id**: Atualiza uma ideia existente.
- **DELETE /profile/:id**: Deleta uma ideia.


## Estrutura de Pastas

### Frontend
```
frontend/
│── src/
│   │── components/
│   │── pages/
│   │── services/
|   |── styles/
│   │── App.js
│   │── index.js
│── public/
│── package.json
```

### Backend
```
backend/
│── controllers/
│── db/
│── models/
│── routes/
│── middleware/
│── uploads/
│── app.js
│── package.json
```


## Instalação e Configuração

### Requisitos do Sistema
- Node.js (versão 14.x ou superior)
- MongoDB
- Conta na AWS com um bucket S3 configurado

### Passos para Instalação
1. Clone o repositório:
    ```bash
    git clone https://github.com/maduMelo/Bau-de-Ideias.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd bau-de-ideias
    ```

3. Instale as dependências do backend:
    ```bash
    cd backend
    npm install
    ```

4. Instale as dependências do frontend:
    ```bash
    cd ../frontend
    npm install
    ```

### Configuração Inicial
1. Configure as variáveis de ambiente no backend (`backend/.env`):
    ```env
    MONGODB_URI=<sua-conexao-mongodb>
    JWT_SECRET=<sua-chave-secreta-jwt>
    AWS_ACCESS_KEY_ID=<sua-chave-de-acesso-aws>
    AWS_SECRET_ACCESS_KEY=<sua-chave-secreta-aws>
    S3_BUCKET_NAME=<nome-do-seu-bucket-s3>
    ```

2. Inicie o backend:
    ```bash
    cd backend
    npm start
    ```

3. Inicie o frontend:
    ```bash
    cd ../frontend
    npm start
    ```

## Deployment
### Hospedagem
O projeto pode ser hospedado em plataformas como Heroku, AWS, ou Netlify.

### Passos para Deployment
1. Configure as variáveis de ambiente na plataforma de hospedagem.
2. Faça o build do frontend:
    ```bash
    cd frontend
    npm run build
    ```
3. Faça o deploy do backend e frontend na plataforma escolhida.

## Contribuindo
Para contribuir com o projeto, siga os passos abaixo:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
    ```bash
    git checkout -b minha-feature
    ```
3. Faça commit das suas alterações:
    ```bash
    git commit -m 'Adicionei minha feature'
    ```
4. Faça push para a branch:
    ```bash
    git push origin minha-feature
    ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a licença MIT.