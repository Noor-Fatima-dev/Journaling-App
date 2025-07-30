import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const VibeWrapper = styled.div`
  height: 4.7rem;
  width: 27rem;
  border-bottom-right-radius: 50px;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
  
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    width: 80vw;
    height: auto;
    justify-content: space-around;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }
`;

const VibeButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: ${({ isSelected }) =>
    isSelected ? 'rgba(255,255,255,0.2)' : 'transparent'};
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  color: ${({ mood }) =>
    mood === 'Happy' || mood === 'Default' || mood === 'Calm' || mood === 'Thinking' ? 'black' : 'white'};

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.3rem 0.8rem;
  }
`;

const VibeIcon = styled.span`
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const VibeLabel = styled.span`
  margin-top: 0.5rem;
  font-size: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

function Vibe({ setVibe, selectedVibe, selectedMood }) {
  const vibes = [
    {
      name: 'Rain',
      icon: '🌧',
      svg: '/effects/rain.svg',
      sound: '/Files/rain.wav',
    },
    {
      name: 'Sunlight',
      icon: '☀️',
      svg: '/effects/sun.svg',
      sound: '/Files/sunlight.wav',
    },
    {
      name: 'Forest',
      icon: '🌲',
      svg: '/effects/forest.svg',
      sound: '/Files/forest.wav',
    },
    {
      name: 'Wind',
      icon: '🍃',
      svg: '/effects/wind.svg',
      sound: '/Files/wind.wav',
    },
  ];

  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioSrc]);

  return (
    <VibeWrapper>
      {vibes.map((v) => (
        <VibeButton
          key={v.name}
          onClick={() => {
            if (selectedVibe === v.name) {
              audioRef.current.pause();
              setAudioSrc(null);
              setVibe(null);
            } else {
              setAudioSrc(v.sound);
              setVibe(v.name);
            }
          }}
          isSelected={selectedVibe === v.name}
          mood={selectedMood}
        >
          <VibeIcon>{v.icon}</VibeIcon>
          <VibeLabel>{v.name}</VibeLabel>
        </VibeButton>
      ))}

      <audio ref={audioRef} src={audioSrc} autoPlay loop muted={false} />
    </VibeWrapper>
  );
}

export default Vibe;
