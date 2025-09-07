// Create worker
const worker = new Worker("worker.js");

// DOM elements
const textInput = document.getElementById("textInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusDiv = document.getElementById("status");
const resultsList = document.getElementById("results");

// Send text to worker
analyzeBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (!text) {
    statusDiv.textContent = "⚠️ Please enter some text first!";
    return;
  }

  resultsList.innerHTML = "";
  statusDiv.textContent = "⏳ Analyzing text in background...";

  worker.postMessage(text); // Send text to worker
});

// Receive result from worker
worker.onmessage = function (event) {
  const { wordCount, charCount, mostFrequentWord } = event.data;

  statusDiv.textContent = "✅ Analysis complete!";

  resultsList.innerHTML = `
    <li><strong>Word Count:</strong> ${wordCount}</li>
    <li><strong>Character Count:</strong> ${charCount}</li>
    <li><strong>Most Frequent Word:</strong> ${mostFrequentWord.word} (appeared ${mostFrequentWord.count} times)</li>
  `;
};
