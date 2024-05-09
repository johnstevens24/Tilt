
import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import { Accelerometer } from 'expo-sensors';
import Map1 from '../components/map1';


export default function Game({navigation}) {
  const[{x,y,z}, setAccelerometerData] = useState({x:0, y:0, z:0})
  const width = Dimensions.get('window').width/2 - 25; //25 for the radius of the ball
  const height = Dimensions.get('window').height*.9-50;
  const [margin, setMargin] = useState(0.03) //the size of the deadzone for the x and y values on the accelerometer
  const [hardMode, setHardMode] = useState(false)
  const [scale, setScale] = useState(50)//the x and y values from the accelerometer are multiplied by this
  const mapRef = useRef(null);

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
    //removes subscription when component unmounts. No need to listen needlessly
    return () => subscription.remove()
  },[])

  const handleCollision = (x, y) => {
    if (mapRef.current) {
      const onPlatform = mapRef.current.checkCollision(x, y);
      if (onPlatform == false) {
        Alert.alert("Title","hi?")
      }
    }
  };

  return(<View style={{flexDirection:'column', width:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center'}}>
          <View style={{flexDirection: 'row', width:'100%', height:'10%', alignItems:'center', justifyContent:'space-between', borderBottomWidth:'2px', padding:'1%'}}>
      
            <View style={{flexDirection: 'row', width:'45%', height:'80%', borderWidth:'1px', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:24}}>01:00:34</Text>
            </View>
            
            <View style={{flexDirection: 'row', width:'50%', height:'100%', justifyContent:'space-evenly', alignItems:'center'}}>
              <TouchableOpacity style={{width:'45%', height:'70%', backgroundColor:'#c4c4c4', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {hardMode ? setHardMode(false) : setHardMode(true)}} style={{width:'45%', height:'70%', backgroundColor: hardMode ? '#d62727' : '#c4c4c4', borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text>Hard Mode</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <Map1 ref={mapRef}/>
          <AnimatedBall x={x} y={y} margin={margin} scale={scale} width={width} height={height} onCollision={handleCollision}/>
          
          
    </View>)
}




class AnimatedBall extends Component {
  
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY({ x: 0, y: 0 });
    this.xVelocity = 0;
    this.yVelocity = 0;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) {
      const { x, y, margin, scale, width, height } = this.props;
      if(x > margin || x < -margin)
          this.xVelocity += x*scale
      else
        this.xVelocity = this.xVelocity*.90
      if(y > margin || y < -margin)
        this.yVelocity += -y*scale
      else
        this.yVelocity = this.yVelocity*.90

      let newX = this.position.x._value + this.xVelocity
      let newY = this.position.y._value + this.yVelocity

      if(newX > width)
        {
          newX = width
          this.xVelocity=0
        }
      else
      if(newX < -width)
        {
          newX = -width
          this.xVelocity=0
        }
      
      if(newY < 0)
        {
          newY = 0
          this.yVelocity=0
        }
      else
      if(newY > height)
        {
          newY = height
          this.yVelocity=0
        }
      
      //check collision with map objects
      this.props.onCollision(newX,newY)

      Animated.spring(this.position, {
        toValue: { x: newX, y: newY },
        useNativeDriver: false,
      }).start();
    }
  }

  render() {
    return (
      <Animated.View style={[styles.ball, this.position.getLayout()]} />
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
});