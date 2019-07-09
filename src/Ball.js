import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

const Ball = () => {
  const { ball } = styles
  const position = new Animated.ValueXY(0, 0)
  Animated.spring(position, {
    toValue: { x: 200, y: 500 }
  }).start()
  return (
    <Animated.View style={position.getLayout()}>
      <View style={ball} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black'
  }
})

export default Ball
