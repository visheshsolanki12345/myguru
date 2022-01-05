import { Typography } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';

const Timer = ({initialMinute,history}) => {
    
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });



    
    return (
        <>
        { minutes === 0 && seconds === 0
            ? ''
            :<> 
            {
            }
            <Typography variant='h4' style={{color:'red'}}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Typography> </>
        }
        </>
    )
}

export default Timer;