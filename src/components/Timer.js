import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {

  const buttonStyle = {
    backgroundColor: 'purple',
    color: 'white',
   // padding: '10px 20px',
    fontSize: '10px',
    textAlign: 'center',
    justifyContent: 'center',
     alignItems: 'center',
    width:'50px',
    height:'20px',
    // Add other styles as needed
  };

  // const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);

  const getHours = () => {
    return ('0' + Math.floor(secondsElapsed / 3600)).slice(-2);
  };

  const getMinutes = () => {
    return ('0' + Math.floor((secondsElapsed % 3600) / 60)).slice(-2);
  };

  const getSeconds = () => {
    return ('0' + (secondsElapsed % 60)).slice(-2);
  };

  const startTimer = () => {
    if (!timeInterval) {
      setTimeInterval(setInterval(() => {
        setSecondsElapsed(prevSeconds => prevSeconds + 1);
      }, 1000));
    }
  };

  const pauseTimer = () => {
    clearInterval(timeInterval);
    setTimeInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timeInterval);
    setTimeInterval(null);
    setSecondsElapsed(0);
  };

  useEffect(() => {
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timeInterval);
    };
  }, [timeInterval]);

  return (
    <div  style={{
    
     
    }} className="countdown-timer">
      <h1>{getHours()}:{getMinutes()}:{getSeconds()}</h1>
      <button  style={buttonStyle} onClick={startTimer}>S</button>
      <button  style={buttonStyle} onClick={pauseTimer}>P</button>
      <button  style={buttonStyle} onClick={resetTimer}>R</button>
    </div>
  );
};

// export default CountdownTimer;
