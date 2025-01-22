const fs = require("fs");
const { cosineSimilarity } = require("../utils/mathUtils");

class VectorStore {
    constructor() {
        this.vectorData = {}; 
        this.wordToIndex = {};
    }

    addVector(id, vector) {
        this.vectorData[id] = vector;
    }

    findSimilarVectors(queryVector, topK = 3) {
        const similarities = Object.entries(this.vectorData).map(([id, vector]) => ({
            id,
            similarity: cosineSimilarity(queryVector, vector),
        }));
        return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
    }

    saveToDisk(filePath) {
        const data = { vectorData: this.vectorData, wordToIndex: this.wordToIndex };
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    loadFromDisk(filePath) {
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            this.vectorData = data.vectorData || {};
            this.wordToIndex = data.wordToIndex || {};
        }
    }
}

module.exports = VectorStore;
