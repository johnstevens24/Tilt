import { useState, useEffect, useRef, Component, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert} from 'react-native';

const Stopwatch = forwardRef((props, ref) => {
    const [time, setTime] = useState(0)
    const [stopTimer, setStopTimer] = useState(false)
    
    useEffect(() => {
        if(!stopTimer && time!=0)
            setTimeout(() => {
                if(!stopTimer)
                    setTime(time+1)
            }, 1000);
    }, [time])


    const start = () => {
        setTimeout(() => {
            if(!stopTimer)
                setTime(1)
          }, 1000);
    }

    const stop = () => {
        setStopTimer(true)
    }

    //gets the current time of the stopwatch
    const getTime = () => {
        return time
    }

    const reset = () => {
        setTime(0)
        setStopTimer(false)
    }

    useImperativeHandle(ref, () => ({
        start,
        stop,
        getTime,
        reset
    }));
    
    return(
        <Text>{time} s</Text>
    )
    
})

export default Stopwatch;