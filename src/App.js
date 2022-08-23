import { useEffect, useState } from 'react';
import './App.css';

import Controls from './components/Controls';
import Header from './components/Header';
import TimerDisplay from './components/TimerDisplay';

function App() {
  const [timerMode, setTimerMode] = useState('pomo');
  const [pomoLength, setPomoLength] = useState(25);
  const [shortLength, setShortLength] = useState(3);
  const [longLength, setLongLength] = useState(15);
  const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60);
  // console.log(secondsLeft)
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState('START');

  useEffect(() => {
    if (isActive){
      const interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1)
      }, 1000)
      if (secondsLeft === 0){
        clearInterval(interval)
        setIsActive(false)
        setButtonText('')
      }
      return () => clearInterval(interval)
    }
  }, [isActive, secondsLeft])

  const calcPercentage = () => {
    if(timerMode === 'pomo') {
      return((secondsLeft / (pomoLength * 60)) * 100)
    }
    if(timerMode === 'short') {
      return((secondsLeft / (shortLength * 60)) * 100)
    }
    if(timerMode === 'long') {
      return((secondsLeft / (longLength * 60)) * 100)
    } 
  }

  const formatTimeLeft = (seconds) => {
    return (
      `${Math.floor(seconds / 60)}:${(seconds % 60 > 9) ? seconds % 60 : '0' + seconds % 60}`
    )
  }

  return (
    <div className="pomodoro-app">
      <Header title="pomodoro" />
      <Controls 
        timerMode={timerMode}
        setTimerMode={setTimerMode}
        setSecondsLeft={setSecondsLeft}
        pomoLength={pomoLength}
        shortLength={shortLength}
        longLength={longLength}
        setIsActive={setIsActive}
        buttonText={buttonText}
        setButtonText={setButtonText}
      />
      <TimerDisplay 
        timerMode={timerMode}
        percentage={calcPercentage()}
        timeLeft={formatTimeLeft(secondsLeft)}
        isActive={isActive}
        setIsActive={setIsActive}
        buttonText={buttonText}
        setButtonText={setButtonText}
      />
    </div>
  );
}

export default App;
