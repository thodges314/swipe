import React from 'react'
import {
  Animated, Dimensions, PanResponder, View
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

const Deck = ({ data, renderCard }) => {
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
    onPanResponderRelease: () => { resetPosition() }
  })
  const position = new Animated.ValueXY()

  return (
    <View>
      {renderCards()}
    </View>
  )
}

export default Deck
