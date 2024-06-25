const User = require('../models/User');
const Idea = require('../models/Idea');
const { uploadImageOnS3, deleteImageOnS3 } = require('../db/s3');

const IdeaController = {
    getPersonalPage: async (req, res) => {
        try {
            const userId = req.user.id;

            // Checando se usuário existe
            const userExists = await User.findById(userId, '-password');
            if (!userExists) { return res.status(401).json({ message: 'User not found' }) }

            // Checando se usuário tem ideias
            const ideas = await Idea.find({ userId });
            if (!ideas) { return res.status(404).json({ message: 'No ideas found' }) };

            res.status(200).json(ideas);
        }
        catch (e) { res.status(500).json({ message: e.message }) };
    },

    createIdea: async (req, res) => {
        try {
            const userId = req.user.id;
            let { title, description, private, category, goal, motivation, file } = req.body;

            // Checando campos obrigatórios
            if (!title) { return res.status(422).json({ message: 'Title is required' }) };
            if (!description) { return res.status(422).json({ message: 'Description is required' }) };

            // Salvando a imagem de capa no S3
            const fileImg = req.file;
            file = fileImg ? await uploadImageOnS3(fileImg) : "https://madumelo.s3.us-east-2.amazonaws.com/corgi.jpg";

            // Criando Ideia no banco de dados
            const idea = new Idea({ title, userId, description, private, category, goal, motivation, file });
            await idea.save();

            res.status(201).json({ message: 'Idea created' })
        }
        catch (e) { res.status(500).json({ message: e.message }) };
    },

    updateIdea: async (req, res) => {
        try {
            const userId = req.user.id;
            const ideaId = req.params.id;
            const { title, description, private, category, goal, motivation, file } = req.body; 

            // Checando se ideia existe
            const ideaExists = await Idea.findById(ideaId);
            if (!ideaExists) { return res.status(404).json({ message: 'Idea not found' }) };

            // Checando se usuário é dono da ideia
            if (ideaExists.userId !== userId) { return res.status(401).json({ message: 'Action not allowed' }) };

            // Atualizando ideia
            await Idea.findByIdAndUpdate(ideaId, { title, description, private, category, goal, motivation, file });

            res.status(200).json({ message: 'Idea updated' })
        }
        catch (e) { res.status(500).json({ message: e.message })};
    },

    deleteIdea: async (req, res) => {
        try {
            const userId = req.user.id;
            const ideaId = req.params.id;

            // Checando se ideia existe
            const ideaExists = await Idea.findById(ideaId);
            if (!ideaExists) { return res.status(404).json({ message: 'Idea not found' }) };

            // Checando se usuário é dono da ideia
            if (ideaExists.userId !== userId) { return res.status(401).json({ message: 'Action not allowed' }) };

            // Deletando ideia do MongoDB
            const deletedIdea = await Idea.findByIdAndDelete(ideaId);

            // Deletar imagem de capa da ideia deletado do S3
            const filename = deletedIdea.file.split('/').pop();
            await deleteImageOnS3(filename);

            res.status(200).json({ message: 'Idea deleted' })
        }
        catch (e) { res.status(500).json({ message: e.message }) };
    }

};


module.exports = IdeaController;