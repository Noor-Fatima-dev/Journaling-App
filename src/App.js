import React , { useState , useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import TextPad from './Text_Pad';
import Emoji from './Emoji';
import Vibe from './Vibe';
import Advice from './Advice';
import HeroSection from './Hero';
import History from './History';

const moodColors = {
    Happy: "#FFB997",       
    Sad: "#06152e",       
    Angry: "#380202",     
    Calm: "#c9ffc9",    
    Scared: "#190926",     
    Tired: "#3b1b00",    
    Loved: "#f25555",     
    Thinking: "#D3BCC0",    
    Frustrated: "#02262c",   
    Default: "#D3D3D3",     
};



function App() {
    


    const emojiRef = useRef(null);
    const textPadRef = useRef(null);
    

    const [mood, setMood] = useState("Default");
    const [vibe, setVibe] = useState("None");
    const [userInput, setUserInput] = useState("");

    const scrollToEmoji = () => {
        emojiRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const [showHistory, setShowHistory] = useState(false);
 
    return (
        
        <div>
            {showHistory ? (
                <div>
                    <button 
                        onClick={() => setShowHistory(false)}
                        style={{
                                padding: "1rem",
                                color: "white",
                                backgroundColor: "red",
                                marginTop : "2rem",
                                marginLeft : "2rem",
                                borderRadius: "10px",
                                cursor: "pointer"
                            }} 
                        >Back</button> 
                    <History selectedMood={mood}  />
                </div>
            )
            
            :(    
                <div 
                    className='Home' 
                    style={{
                        backgroundColor: moodColors[mood],
                        transition: "background-color 0.5s ease",
                    }}
                    >
                        
                        <HeroSection onScrollClick={scrollToEmoji}/>
                        <div ref={textPadRef}  className='Palete'>
                            <TextPad setUserInput={setUserInput} userInput={userInput} selectedMood={mood}  />
                                <div ref={emojiRef} className='Right-Tab'>
                                    <Emoji btnPressed={textPadRef}  setMood={setMood} selectedMood={mood} />
                                    <Vibe setVibe={setVibe} selectedVibe={vibe} selectedMood={mood}/>
                                </div>
                        </div>
                        <Advice  userInput={userInput} selectedMood={mood} />
                        <button 
                            onClick={() => setShowHistory(true)}
                            style={{
                                    padding: "1rem",
                                    color: "black",
                                    backgroundColor: "darkGrey",
                                    marginTop : "2rem",
                                    marginBottom : "2rem",
                                    borderRadius: "10px",
                                    cursor: "pointer"
                                }} 
                            >History</button> 
                    </div>
                )}
        </div>   

        
    );

}

export default App;
