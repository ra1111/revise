import React from 'react'
import AddCard from './AddCard'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Button } from 'react-native-elements'
import { removeDeck,getDecks } from '../utils/api'
import { DeleteDeck,receiveDecks } from '../actions'
import * as firebase from 'firebase';
class DeckDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
  	return {
  		title:navigation.state.params.deck? navigation.state.params.deck.title:navigation.state.params.deckData.title
  	}
  }

  uploadDeck(decks)
  //IMPRODOKDVEHIEOUEH
  {
	  let deckData= JSON.parse(JSON.stringify(decks))
	  let user=firebase.auth().currentUser;
	
    let database = firebase.database();
	
	for (var key in deckData) {
		for (var key2 in deckData[key]) {
			let ans
			ans=deckData[key][key2].answer
			let ansObj=""
			for(var key3 in ans)
			{
				ansObj+=ans[key3]+" $, "
			

			}
			deckData[key][key2].answer=ansObj
			ansObj=""
			
		
		}
	}
	 let deckObj={}
let title=deckData.title
let questions=deckData.questions
	 deckObj[title]=questions
	 try
 {	 
	 database
	.ref('users/' + user.uid)
	.once('value')
	.then(snapshot => {
		let currentDeck=snapshot.val().decks;
		console.log(currentDeck,'current')
		if(currentDeck===0)
		{console.log(currentDeck,"current 0")
			
			database.ref('users/' + user.uid).update({
				decks:deckObj})
				deckObj={}
		}
		else{
			//update exsisiting deck
			//avoid duplicate deck
			//add new deck

			 currentDeck[title]=questions;
			database.ref('users/' + user.uid).update({
				decks:currentDeck})
				console.log(currentDeck,"current 1")
				currentDeck={}
		}
	
	})
	deckData={}
}
catch(ex)
{
	console.log(ex,"exception")
}	
  }


  getDeck() {

	  let deck=this.props.navigation.getParam('deckData', 'example');
	 console.log(deck)
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

  getQuizResults(deck) {
  	let results = this.props.quiz.results.filter(res => res.title === deck.title)[0]
  	if(results) {
  		return `Last Quiz Score: ${results.Score}%`
  	} else if(deck.perc) {
  		return `Last Quiz Score: ${deck.perc}%`
  	}
  	return "You Have Not Taken A Quiz Yet"
  }

  deleteDeck(deck) {
  	// remove from AsynStorage
  	removeDeck(deck.title);
  	// remove from state
  	this.props.dispatch(DeleteDeck(deck.title));
  	//go back
  	this.props.navigation.dispatch(NavigationActions.back());
  }

	render() {
		const deck = this.getDeck();
		return (
			<View style={styles.container}>
				<View style={styles.detailView}>
					<Text style={styles.title}>{deck.title}</Text>
					<Text style={styles.subtitle}>{deck.questions.length} Cards</Text>
					<View style={styles.btnView}>
						<Button 
							onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
							title={"Back To All Decks"}
							backgroundColor="#03A9F4"
							icon={{name: 'arrow-back'}} 
						>
						</Button>
						<Button 
							onPress={() => this.deleteDeck(deck)}
							title={"Delete Deck"}
							backgroundColor="#FF0000"
							icon={{name: 'delete'}}
							style={{marginTop: 20}}
						>
						</Button>
						<Button 
							onPress={() => this.uploadDeck(deck)}
							title={"Upload Deck"}
							backgroundColor="green"
							icon={{name: 'file-upload'}}
							style={{marginTop: 20}}
						>
						</Button>
						<Text style={styles.quizText}>{this.getQuizResults(deck)}</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	detailView: {
		flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
	},
	title: {
		fontSize: 48,
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 24,
		color: 'gray',
	},
	btnView: {
    padding: 20,
	},
	quizText: {
		marginTop: 20,
		textAlign: 'center',
		fontSize: 20,
	},
})

function mapStateToProps(state) {
  return {
    deckData: state.decks.deckData,
    quiz: state.quiz
  }
}

export default connect(mapStateToProps)(DeckDetail)