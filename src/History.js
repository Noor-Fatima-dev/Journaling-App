import React, { useState, useEffect } from "react";
import styled from "styled-components";


const HistoryContainer = styled.div`
padding: 2rem;
max-width: 700px;
margin: auto;
`;

const EntryBox = styled.div`
background: #f7f8fa;
border-radius: 12px;
padding: 1.2rem;
margin-bottom: 1.5rem;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
position: relative;
transition: transform 0.2s ease;

&:hover {
  transform: scale(1.01);
  }
  `;
  
  const EntryDate = styled.div`
  font-weight: bold;
  color: #444;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  `;
  
  const EntryText = styled.p`
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  `;
  
  const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
  `;
  
  const DeleteBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4f;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #d9363e;
    }
    `;
    
    function History() {
      const [entries, setEntries] = useState([]);
      
      useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("JournalEntries")) || [];
        setEntries(saved);


      }, []);
      
      const deleteEntry = (indexToRemove) => {
        const newEntries = [...entries];
        newEntries.splice(indexToRemove, 1);
        setEntries(newEntries);
        localStorage.setItem("JournalEntries", JSON.stringify(newEntries));
      };
   
      return (
    <HistoryContainer>
      <Heading>Journal History</Heading>
      {entries.length === 0 ? (
        <p style={{ textAlign: "center" }}>No entries yet.</p>
      ) : (
        entries.map((entry, idx) => {
          const data = typeof entry === "string" ? JSON.parse(entry) : entry;
          return (
            <EntryBox key={idx}>
              <EntryDate>{data.Date}</EntryDate>
              <EntryText>{data.Journal}</EntryText>
              <DeleteBtn onClick={() => deleteEntry(idx)}>Delete</DeleteBtn>
            </EntryBox>
          );
        })
      )}
    </HistoryContainer>
  );
}

export default History;
