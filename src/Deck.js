import React from 'react'
import { Animated, PanResponder, View } from 'react-native'

const Deck = ({ data, renderCard }) => {
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-500, 0, 500],
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
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => { position.setValue({ x: gesture.dx, y: gesture.dy }) },
    onPanResponderRelease: () => {}
  })
  const position = new Animated.ValueXY()

  return (
    <View>
      {renderCards()}
    </View>
  )
}

export default Deck
