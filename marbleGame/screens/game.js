
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import { Accelerometer } from 'expo-sensors';
import * as SQLite from 'expo-sqlite';
import { BlurView } from 'expo-blur';
import Styles from "../styleSheets/gameScreen";
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
  const [started, setStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const mapRef = useRef(null)
  const ballRef = useRef(null)
  const stopwatchRef = useRef(null)
  const [db, setDB] = useState(null)

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
    setUpDB()
    const subscription = Accelerometer.addListener(setAccelerometerData)
    Accelerometer.setUpdateInterval(100)
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
        // setPause(true)
        // stopwatchRef.current.stop()
        // setGameOver(true)
        // setStarted(false)
        // return
      }

      //check if the ball has made it to the end
      if (x >= mapRef.current.finishTile.left && x <= mapRef.current.finishTile.left + mapRef.current.finishTile.width && y >= mapRef.current.finishTile.top && y <= mapRef.current.finishTile.top + mapRef.current.finishTile.height) {
        mapComplete()
      }
    }
  };

  const start = () => {
    if(!started)
      {
        setStarted(true)
        // stopwatchRef.current.reset()
        // ballRef.current.reset()

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

  const tryAgain = () => {
    setGameOver(false)
    setStarted(false)
    stopwatchRef.current.reset()
    ballRef.current.reset()
  }

  async function mapComplete() {
    setPause(true)
    stopwatchRef.current.stop()
    setStarted(false)
    let personalBest = false

    try{
        //see if the user already has a time for this map
        const prevTime = await db.getAllAsync('SELECT * FROM scores WHERE scores.user_id = $1', [globalThis.id]);

        if(prevTime.length === 0)
        {
          //add a time for the user since its the first time they've finished this map
          await db.runAsync("INSERT INTO scores (user_id, map_id, time) values ($1, $2, $3)", [globalThis.id, mapID, stopwatchRef.current.getTime()])
          personalBest = true
        }
        else
        if(prevTime[0]["time"] > stopwatchRef.current.getTime())
        {
          //if the new time is faster, replace the old one
          await db.runAsync("UPDATE scores SET time = $3 WHERE user_id = $1 AND map_id = $2", [globalThis.id, mapID, stopwatchRef.current.getTime()]);
          personalBest = true
        }

        //in a second, navigate to the new screen
        setTimeout(() => {
          navigation.navigate("ScoreScreen", {time: stopwatchRef.current.getTime(), personalBest: personalBest})
        }, 1000);
    } catch (error) {
        Alert.alert("There was an error adding your score to the database")
        console.log("Error: " + error)
    }
}

  async function setUpDB() {
    try{
        setDB(await SQLite.openDatabaseAsync('tilt.db'))
    } catch (error) {
        console.log("There was an issue accessing the database: " + error)
    }
  }


return(
        <SafeAreaView style={{flexDirection:'column', width:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center'}}>
          {/* top row */}
          <View style={Styles.Banner}>
            {/* stopwatch */}
            <View style={Styles.StopWatch}>
              <Text style={{fontSize:24}}><Stopwatch ref={stopwatchRef}/></Text>
            </View>
            {/* button row */}
            <View style={{flexDirection: 'row', width:'60%', height:'100%', justifyContent:'space-evenly', alignItems:'center'}}>
              {/* start button */}
              <TouchableOpacity onPress={() => {start()}} style={{width:'30%', height:'70%', backgroundColor:'#a9a9a9', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text>Start</Text>
              </TouchableOpacity>
              {/* hard mode button */}
              <TouchableOpacity onPress={() => {hardMode ? setHardMode(false) : setHardMode(true)}} style={{width:'30%', height:'70%', backgroundColor: hardMode ? '#d62727' : '#a9a9a9', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text>Hard Mode</Text>
              </TouchableOpacity>
              {/* back button */}
              <TouchableOpacity onPress={() => {navigation.goBack()}} style={{width:'30%', height:'70%', backgroundColor: '#a9a9a9', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text>Back</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          
          {gameOver ? 
            <View style={Styles.GameOverBox}>
              {/* Game over message */}
              <View>
                <Text style={{fontSize:30, color:'white'}}>You Lost</Text>
              </View>
              {/* Game over buttons */}
              <View style={{height:'40%', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <TouchableOpacity style={Styles.GameOverButton} onPress={() => {}}>
                  <Text>Exit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={Styles.GameOverButton} onPress={() => {tryAgain()}}>
                  <Text>Try Again</Text>
                </TouchableOpacity>
              </View>

            </View>
            : 
            <View/>
          }
          
            {mapID == 2 ? <Map2 ref={mapRef}/> : <Map1 ref={mapRef}/>}
            <AnimatedBall ref={ballRef} pause={pause} x={x} y={y} margin={margin} scale={scale} width={width} height={height} onCollision={handleCollision}/>
          
          

          <Text style={{ position: 'absolute', left: Dimensions.get('window').width/2, top: Dimensions.get('window').height/2, fontSize:40}}>{startText}</Text>  
        </SafeAreaView>
    )
}
