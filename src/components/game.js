

import React, { useState, useEffect } from 'react';

function QuizApp() {
  const initialWordsData = [
    { english: 'Hello', french: 'Bonjour' },
    { english: 'Goodbye', french: 'Au revoir' },
    { english: 'Yes', french: 'Oui' },
    { english: 'No', french: 'Non' },
    // Add more words as needed
  ];

  const [wordsData, setWordsData] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(initialWordsData.length).fill(''));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Shuffle the wordsData array when component mounts
    shuffleWords();
  }, []);

  const shuffleWords = () => {
    const shuffledWords = [...initialWordsData].sort(() => Math.random() - 0.5);
    setWordsData(shuffledWords);
  };

  const handleAnswerSubmit = () => {
    let newScore = 0;
    for (let i = 0; i < wordsData.length; i++) {
      const correctAnswer = wordsData[i].french.toLowerCase();
      const userAnswer = userAnswers[i]?.toLowerCase();
      if (userAnswer === correctAnswer) {
        newScore++;
      }
    }
    setScore(newScore);
    setShowScore(true);
  };

  const handleChange = (e, index) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = e.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleReset = () => {
    setUserAnswers(Array(wordsData.length).fill(''));
    setShowScore(false);
    setScore(0);
    shuffleWords(); // Reshuffle wordsData when resetting
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Result</h2>
          <p>You scored {score} out of {wordsData.length}</p>
          <button onClick={handleReset}>Retake Quiz</button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap question-section">
            <div className="column">
              <h3>English</h3>
              {wordsData.map((word, index) => (
                <div key={index} className="question">
                  {word.english}
                </div>
              ))}
            </div>
            <div className="column">
              <h3>French</h3>
              {wordsData.map((word, index) => (
                <div key={index} className="question">
                  <input
                    type="text"
                    value={userAnswers[index]}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Enter French translation"
                    // aria-label={`French translation for ${wordsData[index].english}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleAnswerSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default QuizApp;
