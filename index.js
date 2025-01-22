const VectorStore = require("./src/vectorStore");
const { tokenizeSentences, vectorizeSentence } = require("./src/services/vectorService");
const { vectorStorePath } = require("./config/paths");

(async () => {

    const vectorStore = new VectorStore();

    vectorStore.loadFromDisk(vectorStorePath);

    const sentences = ["I eat mango", "Mango is my favorite fruit", "Fruits are good for health"];

    if (!Object.keys(vectorStore.wordToIndex).length) {
        vectorStore.wordToIndex = tokenizeSentences(sentences);
        sentences.forEach((sentence, idx) => {
            const vector = vectorizeSentence(sentence, vectorStore.wordToIndex);
            vectorStore.addVector(`Sentence ${idx + 1}`, vector);
        });

        vectorStore.saveToDisk(vectorStorePath);
    }

    const query = "Mango is the best fruit";
    const queryVector = vectorizeSentence(query, vectorStore.wordToIndex);
    const results = vectorStore.findSimilarVectors(queryVector, 2);

    console.log("Query:", query);
    console.log("Similar Sentences:", results);
})();
