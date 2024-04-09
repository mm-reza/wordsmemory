import React, { useState, useRef, useEffect } from 'react';

function MyQuiz() {
  const initialWordsData = {
    'Forest': 'Forêt',
    'Slibling': 'Frère et sœur',
    'Cereal': 'Céréale',
    'Desk': 'Bureau',
    'Camel': 'Chameau',
    'Butter': 'Beurre',
    'Bicycle': 'Vélo',
    'Railroad': 'Chemin de fer',
    'Folder': 'Dossier',
    'Weekly': 'Hebdomadaire',
    'Hunger': 'Faim',
    'Limestone': 'Calcaire'
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
    e.dataTransfer.setData('text/plain', frenchWord);
    dragIndex.current = frenchWords.indexOf(frenchWord);
    // Add a class to the dragged element to change its background color
    e.target.classList.add('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dragOverIndex.current = frenchWords.indexOf(e.target.textContent);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedFrenchWord = e.dataTransfer.getData('text/plain');
    const newFrenchWords = [...frenchWords];
    const temp = newFrenchWords[dragIndex.current];
    newFrenchWords[dragIndex.current] = newFrenchWords[dragOverIndex.current];
    newFrenchWords[dragOverIndex.current] = temp;
    setFrenchWords(newFrenchWords);


      // Remove the class from the dragged element after dropping
  document.querySelectorAll('.dragging').forEach(element => {
    element.classList.remove('dragging');
  });
    
    
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
          <div className="question-section" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {englishWords.map((word, index) => (
              <div key={index} className={frenchWords[index] === initialWordsData[word] ? 'bg-green-600 flex justify-between p-2' : 'bg-red-600 flex justify-between p-2'}>
                <p>{word}</p>
                <p>{frenchWords[index]}</p>
              </div>
            ))}
          </div>
          <button onClick={handleRetake}>Retake Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section" style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <div className="p-5">
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
                  draggable="true"
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
