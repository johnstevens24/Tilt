
import { StyleSheet, Text, View, Button, Animated} from 'react-native';
import { useState, useEffect, Component } from 'react';
import { Accelerometer } from 'expo-sensors';

const Game = () =>  {
  const[{x,y,z}, setAccelerometerData] = useState({x:0, y:0, z:0})
  const [gameLayout, setGameLayout] = useState({ width: 0, height: 0 });
  const[angle, setAngle] = useState("unkown")
  const[ballX, setBallX] = useState(0)
  const[ballY, setBallY] = useState(0)
  const margin = 0.03
  const scale = 50
  const ballRadius = 50
  
  const onGameLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    setGameLayout({ width, height });
  };

  useEffect(() => {
    const subscription = Accelerometer.addListener(setAccelerometerData)
    Accelerometer.setUpdateInterval(100)
    //removes subscription when component unmounts. No need to listen needlessly
    return () => subscription.remove()
  },[])

  useEffect(() => {
    if(y > margin || y < -margin)
      {
        setBallY(ballY + y)
      }
    if(x > margin || x < -margin)
      {
        setBallX(ballX + x)
      }

    if(y > margin)
    {
      if(x > margin)
        setAngle("Down Right")
      else
      if(x < -margin)
        setAngle("Down Left")
      else
        setAngle("Down")
    }  
    else
    if(y < -margin)
    {
      if(x > margin)
        setAngle("Up Right")
      else
      if(x < -margin)
        setAngle("Up Left")
      else
        setAngle("Up")
    }
    else
    {
      if(x > margin)
        setAngle("Right")
      else
      if(x < -margin)
        setAngle("Left")
      else
        setAngle("Flat")
    }
  }, [x,y])

  return(<View onLayout={onGameLayout}>
    {/* <Text>x: {x}</Text>
    <Text>y: {y}</Text> */}
    {/* <Text>Tilt angle: {angle}</Text> */}
    {/* <Text>X: {ballX}</Text>
    <Text>X: {ballY}</Text> */}
    <AnimatedBall x={x} y={y} margin={margin} scale={scale} width={160} height={563}/>
    </View>)
}

export default Game;



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
          
      
      // if(x < -margin || x > margin)
      // {
      //   if(!(newX + x*scale < -width) && !(newX + x*scale > width))
      //     newX += x*scale;
      //   else
      //     {
      //       //place it at the very edge
      //       if(this.position.x._value < 0)
      //         newX = -width + 25
      //     }
      // }

      // if(y < -margin || y > margin)
      // {
      //   if(!(newY + -y*scale < -height) && !(newY + -y*scale > height))
      //     newY += -y*scale;
      //   else
      //     {
      //       //place it at the very edge
      //     }
      // }
        

      // Check boundaries
      // if (newX > 1 - margin) newX = 1 - margin;
      // if (newX < -1 + margin) newX = -1 + margin;
      // if (newY > 1 - margin) newY = 1 - margin;
      // if (newY < -1 + margin) newY = -1 + margin;

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