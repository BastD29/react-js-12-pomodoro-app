import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function TimerDisplay({
  timerMode,
  percentage,
  timeLeft,
  isActive,
  setIsActive,
  buttonText,
  setButtonText,
}) {

  const handleClick = () => {
    if (timeLeft === '0:00'){
      return null;
    }
    setIsActive(!isActive)
    setButtonText(buttonText === 'START' || buttonText === 'RESUME' ? 'PAUSE' : 'RESUME')
  }

  let timesUpMsg = timerMode === 'pomo'
                  ? 'time for a break'
                  : 'back to work!'

  let timeText = timeLeft === '0:00'
                  ? timesUpMsg
                  : timeLeft

  let textSize = timeLeft === '0:00'
                  ? '12px'
                  : '28px'

  return (
    <div 
      className='timer'
      onClick={handleClick}
    >
      <div className='timer__display'>
        <CircularProgressbarWithChildren
          value={percentage}
          text={timeText}
          strokeWidth={4}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: 'var(--accent-color)',
            textColor: 'var(--text)',
            textSize: textSize,
            fontFamily: 'var(--font-current)',
            trailColor: 'none',
          })}
        >
          <button
            className='display__start-pause'
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </CircularProgressbarWithChildren>
            
      </div>
    </div>
  )
}
