// The code to setup the Card and Swipe animations is inspired by Stephen Grider's course on Udemy: React Native: Advanced Concepts.
import React from 'react'
import { 
	Text,
	StyleSheet, 
	View, 
	Animated, 
	PanResponder,
	Dimensions,
	LayoutAnimation,
	UIManager,
} from 'react-native'
import { connect } from 'react-redux'
import { Card, Button, Icon } from 'react-native-elements'
import { AddQuizResults } from '../actions'
import { updateDeck } from '../utils/api'
//import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class QuizCard extends React.Component {

	static defaultProps = {
		onSwipeRight: () => {},
		onSwipeLeft: () => {},
	}

	constructor(props) {
		super(props);

		const position = new Animated.ValueXY();

		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({x: gesture.dx, y: gesture.dy});
			},
			onPanResponderRelease: (event, gesture) => {
				if(gesture.dx > SWIPE_THRESHOLD) {
					this.forceSwipe('right');
				} else if (gesture.dx < -SWIPE_THRESHOLD) {
					this.forceSwipe('left');
				} else {
					this.resetPosition();
				}
			},
		})

		this.state = { 
			panResponder, 
			position, 
			counter: 0, 
			flip: false,
			noCorrect: 0,
		};
	}

	componentWillReceiveProps(nextProps, nextState) {
		if (nextProps.data !== this.props.data) {
			this.setState({ counter: 0 });
		}
	}
	componentDidMount()
	{
		this.animatedValue = new Animated.Value(0);
		this.value = 0;
		this.animatedValue.addListener(({ value }) => {
		  this.value = value;
		})
		this.frontInterpolate = this.animatedValue.interpolate({
		  inputRange: [0, 180],
		  outputRange: ['0deg', '180deg'],
		})
		this.backInterpolate = this.animatedValue.interpolate({
		  inputRange: [0, 180],
		  outputRange: ['180deg', '360deg']
		})
		this.frontOpacity = this.animatedValue.interpolate({
		  inputRange: [89, 90],
		  outputRange: [1, 0]
		})
		this.backOpacity = this.animatedValue.interpolate({
		  inputRange: [89, 90],
		  outputRange: [0, 1]
		})
	}

  flipCard() {
	if (this.value >= 90) {
		Animated.spring(this.animatedValue,{
		  toValue: 0,
		  friction: 8,
		  tension: 10
		}).start();
	  } else {
		Animated.spring(this.animatedValue,{
		  toValue: 180,
		  friction: 8,
		  tension: 10
		}).start();
	  }
  	return this.setState((prevState) => ({flip: !prevState.flip}));
  }

  onSwipeRight(title) {
  	this.setState((prevState) => ({ noCorrect: prevState.noCorrect + 1 }))
  }

	componentWillUpdate(prevProps, prevState) {
		// For Android
		UIManager.setLayoutAnimationEnabledExperimental &&
		UIManager.setLayoutAnimationEnabledExperimental(true);

		LayoutAnimation.spring();
	}

	forceSwipe(direction) {
		const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
		Animated.timing(this.state.position, {
			toValue: { x, y: 0 },
			duration: SWIPE_OUT_DURATION,
		}).start(() => this.onSwipeComplete(direction));
	}

	onSwipeComplete(direction) {
		const { data } = this.props;

		direction === 'right' ? this.onSwipeRight(data.title) : null;
		this.state.position.setValue({ x: 0, y: 0});
		this.setState((prevState) => ({counter: prevState.counter + 1}));
		this.setState({flip: false});
		if(this.state.counter >= this.props.data.questions.length) {
			const result = Math.round(this.state.noCorrect/this.props.data.questions.length * 100).toFixed(2);
			this.props.dispatch(AddQuizResults(this.props.data.title,result));
		}
	}

	resetPosition() {
		Animated.spring(this.state.position, {
			toValue: { x: 0, y: 0 }
		}).start();
	}

	getCardStyle() {
		const { position } = this.state;
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
			outputRange: ['-120deg', '0deg', '120deg']
		})

		return {
			...position.getLayout(),
			transform: [{ rotate }],
		};
	}

  renderCardContent(item, index, totalLength) {
	  console.log(item,"this is item")
	  const frontAnimatedStyle = {
		transform: [
		  { rotateY: this.frontInterpolate }
		]
	  }
	  const backAnimatedStyle = {
		transform: [
		  { rotateY: this.backInterpolate }
		]
	  }
  	return (
  		<Card
  			key={item}
  			title={`${String(index)}/${String(totalLength)}`}
  		>
  			<View style={styles.text}>
			  <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
  					
					  <Text style={styles.cardText}>{item.question}</Text>
					  </Animated.View>
					
					  <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}> { item.answer.map((value, index) => {
						return <Text style={styles.cardText}>{value}</Text>
					  })
					}
					  </Animated.View>
				  }
  				    
  				
				</View>
  			<Button
  				onPress={() => this.flipCard() }
  				title={this.state.flip === false ? 'See Answer' : 'See Question'}
  				backgroundColor="#03A9F4"
  			/>
  		</Card>
  	)
  }

  renderNoMoreCards(result) {
  	return (
  		<Card title="Finished Quiz!">
  			<Text style={styles.cardText}>
  				{`You Scored ${result}%!`}
  			</Text>
  			<Button
  				onPress={() => this.setState({ counter: 0, noCorrect: 0 }) }
  				title='Restart Quiz'
  				backgroundColor="#03A9F4"
  				icon={{name: 'refresh'}} 
  			/>
  		</Card>
  	)
  }

	renderCards() {
		if(this.state.counter >= this.props.data.questions.length) {
			const result = Math.round(this.state.noCorrect/this.props.data.questions.length * 100).toFixed(2);
			const title = this.props.data.title;
			const newDeck = {...this.props.data, perc:result};
			// update AsyncStorage
			updateDeck({title, newDeck});
			// setup new push notifications
		//	clearLocalNotification().then(setLocalNotification)
			return this.renderNoMoreCards(result);
		} else if(this.state.counter < this.props.data.questions.length) {
			return this.props.data.questions.map((item,index) => {
				if(index < this.state.counter) {
					return null;
				} else if(index === this.state.counter) {
					return (
						<Animated.View
						key={index}
						style={[this.getCardStyle(),styles.getCardStyle]}
						{...this.state.panResponder.panHandlers}
						>{this.renderCardContent(item,this.state.counter+1, this.props.data.questions.length)}
						</Animated.View>
					);
				}
				return (
					<Animated.View 
						key={index} 
						style={[styles.cardStyle, { top: 10 * (index - this.state.counter) }]}
					>
						{this.renderCardContent(item,this.state.counter+1, this.props.data.questions.length)}
					</Animated.View>
				)
			}).reverse();
		}
	}

	render() {
		
		return (
			<View style={styles.container}>
				<View style={styles.cardView}>
					{this.renderCards()}
				</View>
				<View style={styles.bottomView}>
					<View style={styles.iconLeft}>
						<Text style={styles.cardText}>Swipe Left</Text>
						<Icon 
							name='thumbs-o-down' 
							type= 'font-awesome' 
							onPress={() => alert('You Have To Swipe Left!')}
						/>
					</View>
					<View style={styles.iconRight}>
						<Text style={styles.cardText}>Swipe Right</Text>
						<Icon 
							name='thumbs-o-up' 
							type= 'font-awesome' 
							onPress={() => alert('You Have To Swipe Right!')}
						/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cardStyle: {
		position: 'absolute',
		width: SCREEN_WIDTH,
	},
  cardText: {
	marginBottom:30,
	textAlign: 'center',
	marginTop:20,
  },
  text:{
	  height:'68%',
  },
  cardView: {
	marginTop: 60,
	height:'80%',
  },
  bottomView: {
  	flexDirection: 'row',
  	flex: 1,
  	alignItems: 'flex-end'
  },
  iconRight: {
  	flex: 1,
  	marginBottom: 20,
    justifyContent: 'flex-end',
  },
  iconLeft: {
  	flex: 1,
  	marginBottom: 20,
    justifyContent: 'flex-start',
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
})

function mapStateToProps(state) {
  return {
    deckData: state.decks.deckData
  }
}

export default connect(mapStateToProps)(QuizCard)