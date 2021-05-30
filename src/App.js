import { useEffect, useRef, useState } from 'react';
import './App.css';

let text = `fly home where entire tonight want heavy cannot read property style of undefined class program console game let you about tonight random color background border display integer code because function object keyboard `;

function App() {
  const letterRef = useRef({});
  const inputRef = useRef();
  const [testText, setTestText] = useState([]);
  const [time, setTime] = useState(60);
  const interval = useRef(null);
  const [isTimerOn, setIsTimerOn] = useState(false);

  let userLetters = [],
    index = 0,
    isCorrect = false;

  useEffect(() => {
    if (time < 1) {
      setIsTimerOn(false);
      return;
    }
    let id = null;
    if (isTimerOn) {
      id = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }
    return () => clearInterval(id);
  }, [time, isTimerOn]);
  const countDown = () => {
    if (time > 0) {
      console.log(time);
      setTime((c) => c - 1);
    } else {
      inputRef.current.disabled = true;
      clearInterval(interval.current);
    }
  };
  const startTimer = () => {
    interval.current = setInterval(countDown, 1000);
  };

  const generateText = () => {
    let randomText = text.split(' ').sort(() => Math.random() - 0.5);
    setTestText(randomText);
  };

  useEffect(() => {
    generateText();
    console.log(letters);
  }, []);

  const restartTest = () => {
    generateText();
    inputRef.current.value = '';
    for (let index = 0; index < letters.length; index++) {
      letterRef.current[index].style.borderLeft = 'none';
      letterRef.current[index].style.color = '#6b778d';
    }
  };

  let letters = testText.join(' ').split('');
  const handleTextChange = (e) => {
    if (time === 60) {
      setIsTimerOn(true);
    }
    userLetters = e.target.value.split('');
    // end of words
    console.log(letters);
    if (userLetters.length === letters.length) {
      console.log('restart');
      return restartTest();
    }
    //backspace pressed
    if (userLetters.length === 0) {
      index = 0;
    } else {
      index = userLetters.length;
    }
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      letterRef.current[index + 1].style.borderLeft = 'none';
      letterRef.current[index].style.borderLeft = '1px solid #896821';
      letterRef.current[index].style.color = '#6b778d';
    } else {
      console.log(index);
      letterRef.current[index].style.borderLeft = '1px solid #896821';
      letterRef.current[index - 1].style.borderLeft = 'none';
      isCorrect = letters[index - 1] === userLetters[index - 1];
      if (isCorrect) letterRef.current[index - 1].style.color = '#34656d';
      else letterRef.current[index - 1].style.color = '#ff6768';
    }
  };

  return (
    <div className='main-container'>
      <div className='timer-container'>
        <p>{time}</p>
      </div>
      <div className='text-container'>
        <input
          id='userInput'
          ref={inputRef}
          onChange={(e) => handleTextChange(e)}
          autoFocus
        />
        <div className='text-field' onClick={() => inputRef.current.focus()}>
          {testText
            .join(' ')
            .split('')
            .map((char, index) => {
              return (
                <span key={index} ref={(el) => (letterRef.current[index] = el)}>
                  {char}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
