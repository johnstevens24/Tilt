import { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';

class AnimatedBall extends Component {
  
    constructor(props) {
      super(props)
      this.position = new Animated.ValueXY({ x: 0, y: 0 })
      this.xVelocity = 0
      this.yVelocity = 0
    }
  
    reset() {
      this.position = new Animated.ValueXY({ x: 0, y: 0 });
      this.xVelocity = 0
      this.yVelocity = 0
    }
  
    componentDidUpdate(prevProps) {
      if(this.props.pause == false)
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
  
  export default AnimatedBall;
  
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