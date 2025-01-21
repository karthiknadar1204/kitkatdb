const math = require("mathjs");


function cosineSimilarity(vector1, vector2) {
    const dotProduct = math.dot(vector1, vector2);
    const magnitudeA = math.norm(vector1);
    const magnitudeB = math.norm(vector2);
    return dotProduct / (magnitudeA * magnitudeB);
}

module.exports = { cosineSimilarity };
