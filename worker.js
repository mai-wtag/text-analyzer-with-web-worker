// Worker logic
onmessage = function (event) {
  const text = event.data;

  // Character count (excluding spaces)
  const charCount = text.replace(/\s+/g, "").length;

  // Word count
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCount = words.length;

  // Frequency map
  const freqMap = {};
  words.forEach(word => {
    freqMap[word] = (freqMap[word] || 0) + 1;
  });

  // Find most frequent word
  let mostFrequentWord = { word: "N/A", count: 0 };
  for (const [word, count] of Object.entries(freqMap)) {
    if (count > mostFrequentWord.count) {
      mostFrequentWord = { word, count };
    }
  }

  // Send results back
  postMessage({ wordCount, charCount, mostFrequentWord });
};
