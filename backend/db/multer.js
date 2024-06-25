const multer = require('multer');
const path = require('path');

// Configuração do armazenamento no disco
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Defina o diretório de destino dos uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Adiciona um timestamp ao nome do arquivo
    }
});

// Filtro de arquivo para aceitar apenas certos tipos de arquivos (opcional)
const fileFilter = (req, file, cb) => {
    // Aceita apenas imagens
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limite de tamanho de arquivo de 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;
