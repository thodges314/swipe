import React from 'react'
import {
  Animated, Dimensions, PanResponder, View
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_OUT_DURATION = 250
const SWIPE_THRESHOLD = Dimensions.get('window').width / 4

const Deck = ({ data, renderCard }) => {
  const forceSwipe = (direction) => {
    const toXValue = (direction === 'right') ? SCREEN_WIDTH : -1 * SCREEN_WIDTH
    Animated.timing(position, {
      toValue: { x: toXValue, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start()
  }
  const getCardStyle = () => {
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
  const renderCards = () => data.map((item, index) => {
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
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start()
  }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => { position.setValue({ x: gesture.dx, y: gesture.dy }) },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right')
      } else if (gesture.dx < -1 * SWIPE_THRESHOLD) {
        forceSwipe('left')
      } else {
        resetPosition()
      }
    }
  })
  const position = new Animated.ValueXY()

  return (
    <View>
      {renderCards()}
    </View>
  )
}

export default Deck
