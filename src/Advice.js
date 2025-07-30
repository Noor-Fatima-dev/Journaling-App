

//AIzaSyCsTWfnc4xBrAskFt3KRhFzfwbcAWnlZsI

import React, { useRef, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";



// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdviceButton = styled.button`
  height: 3rem;
  width: 90rem;
  border-radius: 10px;
  margin: 1rem 0;
  font-size: 1rem;
  cursor: pointer;

  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${({ mood }) =>
    mood === "Happy" || mood === "Default" || mood === "Calm" || mood === "Thinking" ? "black" : "white"};

  @media (max-width: 1024px) {
    width: 90vw;
  }
`;

const ReplyBox = styled.div`
  width: 88rem;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;

  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${({ mood }) =>
    mood === "Happy" || mood === "Default" || mood === "Calm" || mood === "Thinking" ? "black" : "white"};
  line-height: 1.6;

  @media (max-width: 1024px) {
    width: 90vw;
  }
`;

// Main Functional Component

function Advice({ userInput , selectedMood }) {
  const [responseText, setResponseText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const replyRef = useRef(null);
  const apiKey =  "AIzaSyCsTWfnc4xBrAskFt3KRhFzfwbcAWnlZsI";

  const callGemini = async () => {

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const prompt = `
      I am building a journaling app.

      You are a warm and friendly advisor, not an AI. Your job is to give short, friendly, 
      and encouraging advice based on the user's journal entry.
      And remember you will give only a one time reply, not a conversation.

      The user has just written a personal journal entry. Please respond in a very kind, 
      emotionally intelligent, and calming tone. Give a detailed, a lengthy(3 to 4 small paragraphs with emojies) ,  thoughtful and friendly advice as 
      if you are their best friend who understands them deeply. Offer gentle emotional 
      support and remind them to be kind to themselves. Your goal is to leave the user 
      feeling heard, relaxed, and peaceful — especially before they go to sleep. Use 
      soft, poetic or comforting language where appropriate.
      

      But if user entry is not given then just say "Please write your feelings in journal.... I am here to help."

      Here’s what the user wrote:

      "${userInput}"
    `;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    setResponseText(reply || "No reply received.");
    setShowReply(true);
    replyRef.current?.scrollIntoView({ behavior: 'smooth' });


  };

  return (
    <Container>
      <AdviceButton onClick={callGemini} mood={selectedMood} >Talk to AI</AdviceButton>
      {showReply && (
        <ReplyBox ref={replyRef} mood={selectedMood}>
          <ReactMarkdown>{responseText}</ReactMarkdown>
        </ReplyBox>
      )}
    </Container>
  );
}

export default Advice;
