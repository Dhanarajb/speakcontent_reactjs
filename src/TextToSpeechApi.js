import React, { useState, useRef } from "react";
import "./TextToSpeechInput.css";

const DEBOUNCE_DELAY = 1000;

const TextToSpeechInput = () => {
  const [text, setText] = useState("");
  const [spokenTexts, setSpokenTexts] = useState([]);
  const debounceTimer = useRef(null);

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
      setSpokenTexts((prevSpokenTexts) => [...prevSpokenTexts, text]);
    } else {
      console.error("Speech synthesis not supported in this browser");
    }
  };

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setText(newText);

    // Clear any existing timer and set a new one
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      speakText(newText); // Speak when debounce delay is over
    }, DEBOUNCE_DELAY);
  };

  return (
    <div className="tts-container">
      <label htmlFor="speechInput" className="tts-label">
        Type text to speak:
      </label>
      <input
        type="text"
        id="speechInput"
        value={text}
        onChange={handleInputChange}
        placeholder="Type something..."
        className="tts-input"
      />
      <div className="spoken-texts">
        <h3>Spoken Texts:</h3>
        <ul>
          {spokenTexts.map((spokenText, index) => (
            <li key={index}>{spokenText}🔊</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextToSpeechInput;
