import { useEffect, useRef, useState } from 'react';
import './App.css';

let text = `fly home where entire tonight want heavy cannot read property style of undefined class program console game let you about random color background border display integer code because function object keyboard more count cursor container react effect variable cycle method inside pass parameter runs timeout state update inside used then left empty need check know return else user hard light tutorial manage follow learn author editor scroll`;

function App() {
  const letterRef = useRef({});
  const inputRef = useRef();
  const [testText, setTestText] = useState([]);
  const [time, setTime] = useState(60);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [result, setResult] = useState(null);

  let userLetters = [],
    index = 0,
    isCorrect = false;

  useEffect(() => {
    if (time < 1) {
      setIsTimerOn(false);
      calculateResult();
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

  const generateText = () => {
    let randomText = text.split(' ').sort(() => Math.random() - 0.5);
    setTestText(randomText);
  };

  useEffect(() => {
    generateText();
  }, []);

  const calculateResult = () => {
    const userWords = inputRef.current.value.split(' ');
    var matchWords = 0;
    userWords.forEach((word, i) => {
      if (word === testText[i]) {
        matchWords++;
      }
    });
    setResult(matchWords);
  };

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
    if (userLetters.length === letters.length) {
      calculateResult();
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
      letterRef.current[index].style.borderLeft = '1px solid #896821';
      letterRef.current[index - 1].style.borderLeft = 'none';
      isCorrect = letters[index - 1] === userLetters[index - 1];
      if (isCorrect) letterRef.current[index - 1].style.color = '#34656d';
      else letterRef.current[index - 1].style.color = '#ff6768';
    }
  };

  return (
    <div className='main-container'>
      <div className='app-card'>
        <div className='metrics-container'>
          <div className='timer-container'>
            <p id='timer-count'>{time}s</p>
          </div>

          <div className='result-container'>
            {result && <p>score: {result}WPM</p>}
          </div>
          <button onClick={restartTest}>restart</button>
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
                  <span
                    key={index}
                    ref={(el) => (letterRef.current[index] = el)}
                  >
                    {char}
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
