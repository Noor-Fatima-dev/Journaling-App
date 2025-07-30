

import React from "react";
import styled from "styled-components";

const TextAreaWrapper = styled.div `
    position: relative;
    height: fit-content;
    width: fit-content;
`;

// Styled TextArea
const StyledTextarea = styled.textarea`
  height: 35rem;
  width: 60rem;
  padding: 3rem;
  padding-bottom: 7rem;
  margin-right: 1rem;
  resize: none;
  box-sizing: border-box;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  // Glassmorphism
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  // Border radius
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;

  // Font
  font-size: 1rem;
  font-family: inherit;

  // Responsive
  @media (max-width: 1024px) {
    width: 90vw;
    height: 30rem;
    padding: 2rem;
    margin: 0 auto;
    border-radius: 20px;
    margin-top: 1rem;
  }

  @media (max-width: 600px) {
    height: 25rem;
    font-size: 0.9rem;
    padding: 1.5rem;
  }
`;

const SaveBtn = styled.button`
  position: absolute;
  right: 2rem;
  bottom: 1rem;
  padding: 0.5rem 1rem;
  color: black;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  z-index: 2;
`;


function TextPad({ userInput, setUserInput, selectedMood }) {
  const getTextColor = () => {
    return selectedMood === "Happy" || selectedMood === "Default" || selectedMood === "Calm" || selectedMood === "Thinking"
      ? "black"
      : "white";
  };

  const saveEntry = (userInput , setUserInput) => {
    let EntryArr = JSON.parse(localStorage.getItem("JournalEntries")) || [];

    let date = new Date().toDateString();

    let arrObj = {
      Date: date,
      Journal: userInput
    };

  if (userInput.trim() === "") {
    alert("Enter Something First");
    return;
  }

  EntryArr.push(arrObj); 
  localStorage.setItem('JournalEntries', JSON.stringify(EntryArr));
  setUserInput("");
  };

  return (
    <TextAreaWrapper>
      <StyledTextarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Write your thoughts here..."
        style={{ color: getTextColor() }}
      />
      <SaveBtn onClick={() => saveEntry(userInput,setUserInput)}>Save</SaveBtn>
    </TextAreaWrapper>
  );
}

export default TextPad;
