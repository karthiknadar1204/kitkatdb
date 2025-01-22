function tokenizeSentences(sentences) {
    const vocabulary = new Set();
    sentences.forEach((sentence) => {
        sentence.toLowerCase().split(/\W+/).forEach((word) => vocabulary.add(word));
    });
    const wordToIndex = Array.from(vocabulary).reduce((acc, word, idx) => {
        acc[word] = idx;
        return acc;
    }, {});
    console.log(wordToIndex);
    return wordToIndex;
}

function vectorizeSentence(sentence, wordToIndex) {
    const vector = new Array(Object.keys(wordToIndex).length).fill(0);

    sentence.toLowerCase().split(/\W+/).forEach((word) => {
        if (word in wordToIndex) vector[wordToIndex[word]] += 1;
    });
    
    console.log(vector);
    return vector;
}

module.exports = { tokenizeSentences, vectorizeSentence };
