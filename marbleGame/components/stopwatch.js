import { useState, useEffect, useRef, Component, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert} from 'react-native';

const Stopwatch = forwardRef((props, ref) => {
    const [time, setTime] = useState(0)
    const timerRef = useRef(null)
    
    useEffect(() => {
        if(time!=0)
            timerRef.current = setTimeout(() => { setTime(time+1) }, 1000);
    }, [time])

    const start = () => {
        timerRef.current = setTimeout(() => { setTime(time+1) }, 1000);
    }

    const stop = () => {
        clearTimeout(timerRef.current);
    }

    //gets the current time of the stopwatch
    const getTime = () => {
        return time
    }

    const reset = () => {
        setTime(0)
    }

    useImperativeHandle(ref, () => ({
        start,
        stop,
        getTime,
        reset
    }));
    
    return(
        <Text>{time > 60 ? parseInt(time/60) + "m " + time%60 + "s" : time + "s"}</Text>
    )
    
})

export default Stopwatch;