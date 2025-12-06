import { useRef, useState } from "react";
import "./styles.css";
import { Links } from "./utils.jsx";
import ReactCardFlip from "react-card-flip";
import Loader from "./loader.jsx";
import useLoadImages from "./Hooks/setLoadImg.js";

const INITIAL_CARDS = Object.entries(Links).map(([name, url], index) => ({
  id: index + 1,
  name,
  image: url,
  isFlipped: false,
}));

export default function Game() {
  const memory = useRef([]);
  const isGameOverRef = useRef(false);
  const [cards, setCards] = useState([...INITIAL_CARDS]);
  const [score, setScore] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Extract image URLs for preloading
  const imageUrls = INITIAL_CARDS.map(card => card.image);
  
  // Use the improved hook with image URLs
  const { loading: isLoading, progress } = useLoadImages(imageUrls);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (event) => {
    const clickedCard = event.currentTarget.dataset.cardName;
    if (isGameOverRef.current || isWin || isFlipping) return;

    setIsFlipping(true);
    setTimeout(() => {
      if (!memory.current.includes(clickedCard)) {
        memory.current.push(clickedCard);
        setCards((prevCards) => shuffleArray(prevCards));
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          if (newScore === cards.length) {
            setIsWin(true);
          }
          return newScore;
        });
      } else {
        isGameOverRef.current = true;
        // Replaced alert with in-UI game over message handled by render logic
      }
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
    }, 500);
  };

  const restartGame = () => {
    isGameOverRef.current = false;
    setIsWin(false);
    setCards([...INITIAL_CARDS]);
    setScore(0);
    memory.current = [];
  };

  // Show loader with progress while images are loading
  if (isLoading) {
    return <Loader progress={progress} />;
  }

  return (
    <div className="game-container">
      <div className="game-header">
         <h1 className="game-title">
            {isWin ? "🎉 YOU WON! 🎉" : isGameOverRef.current ? "GAME OVER" : `SCORE: ${score}`}
         </h1>
      </div>

      {(isWin || isGameOverRef.current) && (
        <div className="game-over-controls">
            {isGameOverRef.current && <p className="final-score">Final Score: {score}</p>}
            <button onClick={restartGame} className="primary-button">
            Restart Game
            </button>
        </div>
      )}

      <div className={`card-container ${isWin || isGameOverRef.current ? 'disabled' : ''}`}>
        {cards.map((card) => (
          <ReactCardFlip
            key={card.id}
            flipDirection="horizontal"
            isFlipped={isFlipping}
          >
            <div
              className="card"
              data-card-name={card.name}
              onClick={handleCardClick}
            >
              <img 
                src={card.image} 
                alt={card.name} 
                className="card-image"
                loading="eager"
              />
            </div>
            <div className="card-back-container">
              {/* Back of card content here */}
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </div>
  );
}
