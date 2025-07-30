import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  height: 90vh;
  width: 95vw;
  background-color: #111;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    height: 99vh;
    width: 95vw;
    margin: 0;
    margin-top: 0.5rem;
    padding: 0;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #ccc;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DateText = styled(motion.p)`
  font-size: 1rem;
  color: #888;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Btn = styled(motion.button)`
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 25px;
  border: none;
  cursor: pointer;

  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.4);
  }
`;

// Functional Component
const Hero = ({ onScrollClick }) => {
  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to SoulSpace
      </Title>
      <Tagline
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        ✨ Try selecting a mood and writing your thoughts today <br/> Reflect & grow 💭
      </Tagline>
      <DateText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        >
        {new Date().toDateString()}
      </DateText>
      <Btn
        onClick={onScrollClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Start Journaling ↓
      </Btn>
    </Container>
  );
};

export default Hero;
