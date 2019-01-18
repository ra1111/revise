import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import QuizCard from '../QuizCard'
import { Card, Button } from 'react-native-elements'

class ExtQuiz extends React.Component {

  static navigationOptions = ({ navigation }) => {
  	return {
  		title: 'Notes'
  	}
  }
  getDeck() {
	  console.log(this.props,"PROPS");
	  let deck=this.props.navigation.getParam('deckData', 'example');
	  console.log(deck,"DWd")
	  if(deck!=='example')
	  {
return deck
	  }
	  else{
  	let tmp = this.props.deckData.filter(deck => deck.title === this.props.navigation.state.params.deck.title)[0]
  	if(tmp) {
  		return tmp
	  }
	}
  	return {title: '', questions:[]}
  }

	render() {
		const deck = this.getDeck();
		console.log(deck,"quiz deck")
		return(
			<View style={styles.container}>
				{deck.questions.length === 0 ? 
					(	<View style={styles.altContainer}>
							<Text style={styles.mainText}>Please Create Notes by Going to Add Notes</Text>
						</View>)
				: (
					<QuizCard
						data={deck}
						style={styles.cardView}
					/>
					)
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	altContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',	
	},
	mainText: {
		textAlign: 'center',
		fontSize: 36,
	},
	cardText: {
		marginBottom:10,
		textAlign: 'center',
	},
	cardView: {
		flex: 1,
		marginTop: 20,
	},
})

function mapStateToProps(state) {
  return {
    deckData: state.decks.deckData
  }
}

export default connect(mapStateToProps)(ExtQuiz)