import React, { Component } from 'react'
import {
  Animated, Dimensions, LayoutAnimation, PanResponder, StyleSheet, UIManager, View
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_OUT_DURATION = 250
const SWIPE_THRESHOLD = Dimensions.get('window').width / 4

class Deck extends Component {
  static defaultProps = {
    data: [],
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
    renderCard: () => {}
  }

  constructor(props) {
    super(props)

    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
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

  componentDidUpdate() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    LayoutAnimation.spring()
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
    const { index, position } = this.state
    const { data, onSwipeLeft, onSwipeRight } = this.props
    const item = data[index]
    if (direction === 'right') {
      onSwipeRight(item)
    } else {
      onSwipeLeft(item)
    }
    position.setValue({ x: 0, y: 0 })
    this.setState(prevState => ({ index: prevState.index + 1 }))
  }

  renderCards = () => {
    const { index, panResponder } = this.state
    const { data, renderCard, renderNoMoreCards } = this.props
    const { getCardStyle } = this
    if (index >= data.length) {
      return renderNoMoreCards()
    }
    return data.map((item, indx) => {
      if (indx < index) {
        return null
      }
      if (indx === index) {
        return (
          <Animated.View
            key={item.id}
            style={[getCardStyle(), styles.cardStyle, { zIndex: indx * -1 }]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        )
      }
      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, { zIndex: indx * -1, top: 10 * (indx - index) }]
        }
        >
          {renderCard(item)}
        </Animated.View>
      )
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

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
})

export default Deck
