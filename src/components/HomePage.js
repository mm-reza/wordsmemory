
import React, { useState } from 'react';

import MyQuiz from './Quiz';

function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleGoButtonClick = () => {
    setShowQuiz(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!showQuiz ? (
          <div className="splash-container">
            <h1>Welcome to the Quiz</h1>
            <button className="go-button" onClick={handleGoButtonClick}>Go</button>
          </div>
        ) : (
          <MyQuiz />
        )}
      </header>
    </div>
  );
}

export default Home;