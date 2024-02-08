import React, { useState, useEffect } from 'react';

const Typewritter = ({ text, delay, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        // Reset the typing animation when it completes
        setCurrentText('');
        setCurrentIndex(0);
        // Call onComplete callback to signal animation completion
        onComplete && onComplete();
        // Stop the interval
        clearInterval(typingInterval);
      }
    }, delay);

    // Cleanup the interval on component unmount
    return () => clearInterval(typingInterval);
  }, [currentIndex, delay, text, onComplete]);

  return <span>{currentText}</span>;
};

export default Typewritter;
