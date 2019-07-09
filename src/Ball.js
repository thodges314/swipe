import React from 'react'
import { StyleSheet, View } from 'react-native'

const Ball = () => {
  const { ball } = styles
  return (
    <View style={ball} />
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
