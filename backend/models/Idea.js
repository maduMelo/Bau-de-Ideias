const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: String, required: true },
    description: { type: String, default: "", required: true },
    private: { type: Boolean, default: true},
    category: { type: String, default: "General"},
    goal: { type: String, default: ""},
    motivation: { type: String, default: ""},
    file: { type: String, default: ""}
});

module.exports = mongoose.model('Idea', IdeaSchema);