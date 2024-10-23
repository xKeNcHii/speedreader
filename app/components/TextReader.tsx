// app/components/TextReader.tsx

"use client";

import { useState, useEffect, useRef } from "react";

const TextReader = () => {
  const [text, setText] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(300); // Words per minute
  const [pause, setPause] = useState<boolean>(false); // For pause/resume functionality
  const displayRef = useRef<HTMLDivElement | null>(null);

  // Calculate delay based on WPM
  const delay = 60000 / wpm; // Convert WPM to milliseconds per word

  useEffect(() => {
    if (isReading && currentWordIndex < words.length && !pause) {
      const timer = setTimeout(() => {
        setCurrentWordIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (currentWordIndex >= words.length) {
      // Stop reading when we reach the end of the words
      setIsReading(false);
    }
  }, [isReading, currentWordIndex, words, delay, pause]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Split words using a regex that keeps punctuation
    const newWords = newText
      .trim()
      .split(/(\s+)/) // Split by whitespace while retaining whitespace in the array
      .filter((word) => word.trim() !== ""); // Filter out empty strings

    setWords(newWords);

    // Reset only if not currently reading
    if (!isReading) {
      setCurrentWordIndex(0);
    }
  };

  const handleStartReading = () => {
    if (words.length > 0) {
      setCurrentWordIndex(0); // Reset index to 0 when starting
      setIsReading(true);
      setPause(false); // Ensure pause is reset when starting
    }
  };

  const handlePauseResume = () => {
    setPause((prev) => !prev); // Toggle pause/resume
  };

  const handleStopReading = () => {
    setIsReading(false);
    setCurrentWordIndex(0); // Reset the word index when stopping
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-4 resize-none"
        rows={6}
        placeholder="Type or paste your text here..."
        value={text}
        onChange={handleTextChange}
        style={{ fontSize: '1.25rem' }} // Responsive font size for textarea
      />

      <div className="flex justify-between mb-4 w-full max-w-md">
        <button
          onClick={handleStartReading}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md w-full mr-2"
        >
          Start Reading
        </button>
        <button
          onClick={handleStopReading}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-md w-full ml-2"
        >
          Stop
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 w-full max-w-md">
        <button
          onClick={handlePauseResume}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out shadow-md w-full mr-2"
        >
          {pause ? "Resume" : "Pause"}
        </button>
        <label htmlFor="wpm" className="text-secondary">WPM:</label>
        <input
          type="range"
          id="wpm"
          min="100"
          max="600"
          step="10"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-1/2"
        />
        <span className="text-secondary">{wpm}</span>
      </div>

      <div
        ref={displayRef}
        className="text-center font-bold text-primary flex items-center justify-center flex-grow p-4"
        style={{
          width: '100%',             // Set width to fill the container
          height: '200px',           // Fixed height for the reading area
          maxWidth: '100%',          // Ensure it doesn't exceed the container width
          overflow: 'hidden',        // Hide overflow content
          whiteSpace: 'nowrap',      // Prevent wrapping to the next line
          fontSize: '5vw',           // Responsive font size based on viewport width
        }}
      >
        {isReading && currentWordIndex < words.length ? words[currentWordIndex] : " "}
      </div>

      <div className="mt-4 w-full max-w-md">
        <label htmlFor="speed" className="block mb-2 text-secondary">Reading Speed (WPM):</label>
        <input
          type="number"
          id="speed"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default TextReader;
