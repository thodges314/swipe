import React from 'react'
import { Animated, PanResponder, View } from 'react-native'

const Deck = ({ data, renderCard }) => {
  const renderCards = () => data.map(item => renderCard(item))
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => { console.log(gesture) },
    onPanResponderRelease: () => {}
  })

  return (
    <View {...panResponder.panHandlers}>
      {renderCards()}
    </View>
  )
}

export default Deck
