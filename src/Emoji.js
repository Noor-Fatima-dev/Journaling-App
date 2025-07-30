import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components

const EmojiContainer = styled.div`
  height: 23rem;
  width: 25rem;
  padding: 2rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  justify-items: center;
  border-top-right-radius: 50px;
  
  // Glassmorphism
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    width: 80vw;
    height: fit-content;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    padding: 1rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
  `;
  
  const EmojiCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: 0.3s;
  background: ${({ selected }) =>
    selected ? "rgba(255,255,255,0.2)" : "transparent"};
  color: ${({ mood }) =>
    mood === "Happy" || mood === "Default" || mood === "Calm" || mood === "Thinking" ? "black" : "white"};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
      padding: 1rem;
    }
    `;
    
    const EmojiSymbol = styled.span`
    font-size: 2.2rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    `;
    
    const EmojiLabel = styled.span`
    margin-top: 0.5rem;
    font-size: 1rem;
    @media (max-width: 768px) {
      font-size: 0.6rem;
    }
`;

// Functional Component
function Emoji({btnPressed, setMood, selectedMood }) {
  const emojis = [
    { symbol: "😃", label: "Happy" },
    { symbol: "😢", label: "Sad" },
    { symbol: "😡", label: "Angry" },
    { symbol: "😌", label: "Calm" },
    { symbol: "😱", label: "Scared" },
    { symbol: "😴", label: "Tired" },
    { symbol: "😍", label: "Loved" },
    { symbol: "🤔", label: "Thinking" },
    { symbol: "😣", label: "Frustrated" },
  ];

  const [selectedEmoji, setSelectedEmoji] = useState(null);

  return (
    <EmojiContainer>
      {emojis.map((emoji, index) => (
        <EmojiCard
          key={index}
          onClick={() => {
            setSelectedEmoji(emoji.symbol);
            setMood(emoji.label);
            btnPressed.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          selected={selectedEmoji === emoji.symbol}
          mood={selectedMood}
        >
          <EmojiSymbol>{emoji.symbol}</EmojiSymbol>
          <EmojiLabel>{emoji.label}</EmojiLabel>
        </EmojiCard>
      ))}
    </EmojiContainer>
  );
}

export default Emoji;
