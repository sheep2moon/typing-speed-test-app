import { useEffect, useRef, useState } from 'react';
import './App.css';
import githubIcon from './img/github-icon.png';

const english = `fly home where entire tonight want clean cannot read property style of undefined class program console game let you about random color background border display integer code type function object keyboard more count cursor container react effect variable cycle method inside pass parameter runs timeout state update inside used then left empty need check know return else user hard light tutorial manage follow learn author editor scroll`;

const polish =
  'nie mnie ciebie kot jest oko spodnie ognisko telewizor dziecko świeca samochód prawo muzyka słowo czas strach dalej kwiat państwo unik portfel powoli szybko kilogram litr sikor mapa znak dłonie ucieka zegar lekarz moneta krem woda marzenie owca czegoś kupisz głowa książka cisza hałas bateria stary noc brat tak co robisz sztuka on dziś wiem to albo czemu ';

let timerValue = 30;
let correctColor = '#ffbd69';
let incorrectColor = '#ff6363';
let isLastCorrect = false;

function App() {
  const letterRef = useRef({});
  const inputRef = useRef();
  const [testText, setTestText] = useState([]);
  const [time, setTime] = useState(timerValue);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [result, setResult] = useState(null);
  const [correctChar, setCorrectChar] = useState(0);
  const [isTextBlur, setIsTextBlur] = useState(false);
  const [text, setText] = useState(english);

  let userLetters = [],
    index = 0,
    isCorrect = false;

  useEffect(() => {
    if (time < 1) {
      setIsTimerOn(false);
      inputRef.current.disabled = true;
      setResult((correctChar / 5) * 2);
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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        restartTest();
      }
      if (e.key === 'Enter') {
        inputRef.current.focus();
      }
    });
  }, [text]);

  const restartTest = () => {
    generateText();
    userLetters = inputRef.current.value.split('');
    userLetters.forEach((char, index) => {
      letterRef.current[index + 1].style.borderLeft = 'none';
      letterRef.current[index].style.color = '#6b778d';
    });

    inputRef.current.value = '';

    letterRef.current[0].style.borderLeft = '2px solid #896821';
    setIsTimerOn(false);
    setTime(timerValue);
    setResult(null);
    setCorrectChar(0);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  let letters = testText.join(' ').split('');

  //typing
  const handleTextChange = (e) => {
    if (time === timerValue) {
      setIsTimerOn(true);
    }
    userLetters = e.target.value.split('');
    // end of words
    if (userLetters.length === letters.length) {
      return restartTest();
    }

    index = userLetters.length;

    //backspace pressed
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      letterRef.current[index + 1].style.borderLeft = 'none';
      letterRef.current[index].style.borderLeft = '2px solid #896821';
      letterRef.current[index].style.color = '#6b778d';
      if (isLastCorrect) {
        setCorrectChar(correctChar - 1);
      }
    } else {
      letterRef.current[index].style.borderLeft = '2px solid #896821';
      letterRef.current[index - 1].style.borderLeft = 'none';
      isCorrect = letters[index - 1] === userLetters[index - 1];

      if (isCorrect) {
        setCorrectChar(correctChar + 1);
        isLastCorrect = true;
        letterRef.current[index - 1].style.color = correctColor;
      } else {
        isLastCorrect = false;
        letterRef.current[index - 1].style.color = incorrectColor;
      }
    }
  };
  console.log(isTextBlur);
  return (
    <div className='main-container'>
      <div className='app-card'>
        <h1 id='title'>Meshnotype</h1>
        <div className='metrics-container'>
          <div className='timer-container'>
            <p id='timer-count'>{time}s</p>
          </div>
          <div className='language-container'>
            <button
              onClick={() => {
                setText(english);
                restartTest();
              }}
            >
              ENG
            </button>
            <button
              onClick={() => {
                setText(polish);
                restartTest();
              }}
            >
              PL
            </button>
          </div>
        </div>

        <div className='text-container'>
          <p id='correct-chars-info'>correct typed characters: {correctChar}</p>
          <input
            id='userInput'
            ref={inputRef}
            onChange={(e) => handleTextChange(e)}
            autoFocus
            autoComplete='off'
            onBlur={() => setIsTextBlur(true)}
            onFocus={() => {
              setIsTextBlur(false);
            }}
          />
          {isTextBlur && (
            <p className='text-field-focus-hint'>
              {!result
                ? 'click here or press enter to start typing.'
                : `${parseInt(result)} wpm`}
            </p>
          )}
          <div
            className={isTextBlur ? 'text-field text-field-blur' : 'text-field'}
            onClick={() => {
              if (result) {
                restartTest();
              } else {
                inputRef.current.focus();
              }
            }}
          >
            {testText
              .join(' ')
              .split('')
              .map((char, index) => {
                return (
                  <span
                    key={index}
                    ref={(el) => (letterRef.current[index] = el)}
                    style={
                      index === 0 ? { borderLeft: '2px solid #896821' } : {}
                    }
                  >
                    {char}
                  </span>
                );
              })}
          </div>
        </div>

        <div className='bottom-info'>
          <p>
            press <span>Tab</span> to restart
          </p>
          <button id='restart-button' onClick={restartTest}>
            restart
          </button>
        </div>
      </div>

      <footer>
        <p>created by konrad iwan</p>
        <a href='https://github.com/sheep2moon'>
          <img src={githubIcon} alt='' />
        </a>
      </footer>
    </div>
  );
}

export default App;
