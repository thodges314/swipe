import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Deck from './src/Deck'

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
]

export default function App() {
  const renderCard = item => (
    <Card
      image={{ uri: item.uri }}
      key={item.id}
      title={item.text}
    >
      <Text style={{ marginBottom: 10 }}>I can customise the card more</Text>
      <Button
        backgroundColor="#03a9f4"
        icon={{ name: 'code' }}
        title="view now!!"
      />
    </Card>
  )

  const renderNoMoreCards = () => (
    <Card title="all done!">
      <Text style={{ marginBottom: 10 }}>There is no more content here!!</Text>
      <Button
        title="get more!"
        backgroundColor="#03a9f4"
      />
    </Card>
  )

  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        onSwipeLeft={() => console.log('swipe left')}
        onSwipeRight={() => console.log('swipe right')}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})
