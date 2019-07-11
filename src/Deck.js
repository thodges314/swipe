import React, { Component } from 'react'
import {
  Animated, Dimensions, PanResponder, View
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_OUT_DURATION = 250
const SWIPE_THRESHOLD = Dimensions.get('window').width / 4

class Deck extends Component {
  constructor(props) {
    super(props)

    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => { position.setValue({ x: gesture.dx, y: gesture.dy }) },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right')
        } else if (gesture.dx < -1 * SWIPE_THRESHOLD) {
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      }
    })

    this.state = { index: 0, panResponder, position }
  }


  forceSwipe = (direction) => {
    const { onSwipeComplete } = this
    const { position } = this.state
    const x = (direction === 'right') ? SCREEN_WIDTH : -1 * SCREEN_WIDTH
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => onSwipeComplete(direction))
  }

  getCardStyle = () => {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return (
      {
        ...position.getLayout(),
        transform: [{ rotate }]
      }
    )
  }


  onSwipeComplete = (direction) => {
    const { index } = this.state
    const { data, onSwipeLeft, onSwipeRight } = this.props
    const item = data[index]
    if (direction === 'right') {
      onSwipeRight(item)
    } else {
      onSwipeLeft(item)
    }
  }

  renderCards = () => {
    const { panResponder } = this.state
    const { data, renderCard } = this.props
    const { getCardStyle } = this
    return data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={getCardStyle()}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        )
      }
      return renderCard(item)
    })
  }


  resetPosition = () => {
    const { position } = this.state
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start()
  }

  render() {
    const { renderCards } = this
    return (
      <View>
        {renderCards()}
      </View>
    )
  }
}

export default Deck
