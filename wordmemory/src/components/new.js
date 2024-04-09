import React, { useState, useRef, useEffect } from 'react';

function Quiz() {
  const initialWordsData = [
    { english: 'Hello', french: 'Bonjour' },
    { english: 'Goodbye', french: 'Au revoir' },
    { english: 'Yes', french: 'Oui' },
    { english: 'No', french: 'Non' },
    // Add more words as needed
  ];

  const [englishWords, setEnglishWords] = useState(initialWordsData.map(word => word.english));
  const [frenchWords, setFrenchWords] = useState(initialWordsData.map(word => word.french));
  const [userAnswers, setUserAnswers] = useState({});
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

  const handleSort = () => {
    const newFrenchWords = [...frenchWords];
    const temp = newFrenchWords[dragIndex.current];
    newFrenchWords[dragIndex.current] = newFrenchWords[dragOverIndex.current];
    newFrenchWords[dragOverIndex.current] = temp;
    setFrenchWords(newFrenchWords);
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
    for (let i = 0; i < initialWordsData.length; i++) {
      const correctAnswer = initialWordsData[i].french;
      const userAnswer = frenchWords[i];
      if (userAnswer === correctAnswer) {
        newScore++;
      }
    }
    setScore(newScore);
    setShowResult(true);
  };

  const handleRetake = () => {
    setShowResult(false);
    setUserAnswers({});
    shuffleWords();
  };

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4">
      {showResult ? (
        <div>
          <h2>Quiz Result</h2>
          <p>You scored {score} out of {initialWordsData.length}.</p>
          <button onClick={handleRetake}>Retake Quiz</button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap question-section">
            <div className="column">
              <h3>English</h3>
              {englishWords.map((word, index) => (
                <div key={index} className="question">
                  {word}
                </div>
              ))}
            </div>
            <div className="column">
              <h3>French</h3>
              {frenchWords.map((word, index) => (
                <div
                  key={index}
                  className="relative flex space-x-3 border rounded p-2 bg-gray-100"
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

export default Quiz;
