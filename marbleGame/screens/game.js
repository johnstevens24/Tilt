
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import { Accelerometer } from 'expo-sensors';
import Map1 from '../components/maps/map1';
import Map2 from '../components/maps/map2';
import Stopwatch from '../components/stopwatch';
import AnimatedBall from '../components/ball';


export default function Game({navigation, route}) {
  const{mapID} = route.params
  const [{x,y,z}, setAccelerometerData] = useState({x:0, y:0, z:0})
  const width = Dimensions.get('window').width/2 - 25; //25 for the radius of the ball
  const height = Dimensions.get('window').height*.9-50;
  const [margin, setMargin] = useState(0.03) //the size of the deadzone for the x and y values on the accelerometer
  const [hardMode, setHardMode] = useState(false)
  const [pause, setPause] = useState(true)
  const [scale, setScale] = useState(50)//the x and y values from the accelerometer are multiplied by this
  const [startText, setStartText] = useState("")
  const [startButtonText, setStartButtonText] = useState("Start")
  const [started, setStarted] = useState(false)

  const mapRef = useRef(null)
  const ballRef = useRef(null)
  const stopwatchRef = useRef(null)

  useEffect(() => {
    if(hardMode)
      {
        setMargin(0) //removes deazone
        setScale(100) //makes the ball accelerate faster
      }
    else
      {
        setMargin(0.03)
        setScale(50)
      }
  }, [hardMode])

  useEffect(() => {
    const subscription = Accelerometer.addListener(setAccelerometerData)
    Accelerometer.setUpdateInterval(100)
    console.log(mapID)
    //removes subscription when component unmounts. No need to listen needlessly
    return () => subscription.remove()
  },[])

  const handleCollision = (x, y) => {
    if (mapRef.current) {
      //the ball's "center" is actuall at the very top of the ball. This recenters it for collision detection.
      y=y+25
      var onPlatform = false;

      //check if the ball is still on the track
      for (let i = 0; i < mapRef.current.rectangles.length; i++) {
        const rect = mapRef.current.rectangles[i];
        if (x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height) {
          onPlatform = true;
          break;
        }
      }

      //if it isn't
      if (!onPlatform) 
      {
        setPause(true)
        stopwatchRef.current.stop()
        setStartButtonText("Reset")
        Alert.alert("Womp womp you lost")
        setStarted(false)
        return
      }

      //check if the ball has made it to the end
      if (x >= mapRef.current.finishTile.left && x <= mapRef.current.finishTile.left + mapRef.current.finishTile.width && y >= mapRef.current.finishTile.top && y <= mapRef.current.finishTile.top + mapRef.current.finishTile.height) {
        //stop the ball
        setPause(true)
        stopwatchRef.current.stop()
        setStartButtonText("Reset")
        setStarted(false)

        //in a second, navigate to the new screen
        setTimeout(() => {
          navigation.navigate("ScoreScreen", {time: stopwatchRef.current.getTime()})
        }, 1000);
      }
    }
  };

  const start = () => {
    if(!started)
      {
        setStarted(true)
        stopwatchRef.current.reset()
        ballRef.current.reset()

        setStartText(3)
        setTimeout(() => {
          setStartText(2)
        }, 1000);
        setTimeout(() => {
          setStartText(1)
        }, 2000);
        setTimeout(() => {
          setStartText("GO!")
        }, 3000);
        setTimeout(() => {
          setStartText("")
          setPause(false)
          stopwatchRef.current.start()
        }, 4000);
      }
    
    
  }

  return(
        <SafeAreaView style={{flexDirection:'column', width:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center'}}>
          <View style={{flexDirection: 'row', width:'100%', height:'10%', alignItems:'center', justifyContent:'space-between', borderBottomWidth:'2px', padding:'1%'}}>
      
            <View style={{flexDirection: 'row', width:'45%', height:'80%', borderWidth:'1px', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:24}}><Stopwatch ref={stopwatchRef}/></Text>
            </View>
            
            <View style={{flexDirection: 'row', width:'50%', height:'100%', justifyContent:'space-evenly', alignItems:'center'}}>
              <TouchableOpacity onPress={() => {start()}} style={{width:'45%', height:'70%', backgroundColor:'#c4c4c4', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text>{startButtonText}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {hardMode ? setHardMode(false) : setHardMode(true)}} style={{width:'45%', height:'70%', backgroundColor: hardMode ? '#d62727' : '#c4c4c4', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text>Hard Mode</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          {mapID == 2 ? <Map2 ref={mapRef}/> : <Map1 ref={mapRef}/>}
          
          <AnimatedBall ref={ballRef} pause={pause} x={x} y={y} margin={margin} scale={scale} width={width} height={height} onCollision={handleCollision}/>
          <Text style={{ position: 'absolute', left: Dimensions.get('window').width/2, top: Dimensions.get('window').height/2, fontSize:40}}>{startText}</Text>  
        </SafeAreaView>
    )
}
