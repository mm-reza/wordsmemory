import React, { useState, useRef, useEffect } from 'react';

function MyQuiz() {
  const initialWordsData = {
    'Hello': 'Bonjour',
    'Goodbye': 'Au revoir',
    'Yes': 'Oui',
    'No': 'Non',
    // Add more words as needed
  };

  const [englishWords, setEnglishWords] = useState(Object.keys(initialWordsData));
  const [frenchWords, setFrenchWords] = useState(Object.values(initialWordsData));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    shuffleWords();
  }, []);

  const shuffleWords = () => {
    const shuffledEnglishWords = [...englishWords].sort(() => Math.random() - 0.5);
    const shuffledFrenchWords = [...frenchWords].sort(() => Math.random() - 0.5);
    setEnglishWords(shuffledEnglishWords);
    setFrenchWords(shuffledFrenchWords);
  };

  const dragIndex = useRef(null);
  const dragOverIndex = useRef(null);

  const handleDragStart = (e, frenchWord) => {
    dragIndex.current = frenchWords.indexOf(frenchWord);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dragOverIndex.current = frenchWords.indexOf(e.target.textContent);
  };

  const handleDrop = () => {
    const newFrenchWords = [...frenchWords];
    const temp = newFrenchWords[dragIndex.current];
    newFrenchWords[dragIndex.current] = newFrenchWords[dragOverIndex.current];
    newFrenchWords[dragOverIndex.current] = temp;
    setFrenchWords(newFrenchWords);
  };

  const handleSubmit = () => {
    let newScore = 0;
    for (let i = 0; i < englishWords.length; i++) {
      const englishWord = englishWords[i];
      const correctFrenchWord = initialWordsData[englishWord];
      const userFrenchWord = frenchWords[i];
      if (userFrenchWord === correctFrenchWord) {
        newScore++;
      }
    }
    setScore(newScore);
    setShowResult(true);
  };

  const handleRetake = () => {
    setShowResult(false);
    shuffleWords();
  };

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4">
      {showResult ? (
        <div>
          <h2>Quiz Result</h2>
          <p>You scored {score} out of {englishWords.length}.</p>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">English</th>
                <th className="border border-gray-400 p-2">French</th>
              </tr>
            </thead>
            <tbody>
              {englishWords.map((word, index) => (
                <tr key={index} className={frenchWords[index] === initialWordsData[word] ? 'bg-green-200' : 'bg-red-200'}>
                  <td className="">{word}</td>
                  <td className="">{frenchWords[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleRetake}>Retake Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section" style={{ display: 'flex', flexDirection: 'row', gap: '5rem' }}>
            <div className="m-20">
              <h3>English</h3>
              {englishWords.map((word, index) => (
                <div key={index}>
                  <p>{word}</p>
                </div>
              ))}
            </div>
            <div className="p-5">
              <h3>French</h3>
              {frenchWords.map((word, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, word)}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <p>{word}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </main>
  );
}

export default MyQuiz;
