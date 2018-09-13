import React from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { AddNewCard } from '../actions'
import { updateDeck } from '../utils/api'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import thunk from '../node_modules/redux-thunk';

class AddCard extends React.Component {

	state= {
		question: '',
answer:[],

	}

  static navigationOptions = ({ navigation }) => {
  	return {
  		title: 'Add Card'
  	}
  }

  handleQuestion = (question) => {
  	this.setState({
  		question,
  	})
  }

  handleAnswer1 = (answer1) => {
	  let ans=this.state.answer.slice();
	  ans[0]=answer1,
	  this.setState({
	  answer:ans,
	  })
  }
  handleAnswer2 = (answer2) => {
	let ans=this.state.answer.slice();
	ans[1]=answer2,
	this.setState({
		answer:ans,
	})
}
handleAnswer3 = (answer3) => {
	let ans=this.state.answer.slice();
	ans[2]=answer3,
	this.setState({
		answer:ans,
	})
}
handleAnswer4 = (answer4) => {
	let ans=this.state.answer.slice();
	ans[3]=answer4,
	this.setState({
		answer:ans,
	})
}
handleAnswer5 = (answer5) => {
	let ans=this.state.answer.slice();
	ans[4]=answer5,
	console.log(this.state)
	this.setState({
		answer:ans,
	})
}
  sbmtCard = (title, question, answer) => {
  	if(question === '' || answer === '') {
  		alert("Please Enter Question and Answer");
  	} else {
	  	const newCard = {
	  		title,
	  		question,
	  		answer,
	  	}
	  	let newDeck = ''
	  	let key = ''
	  	this.props.deckData.map((deck,index) => {
	  		if(deck.title === title) {
	  			newDeck = {title: deck.title, questions: deck.questions.concat({question,answer})};
		  		key = index;
	  		}
	  	});
	  	// add new deck to store
	  	this.props.dispatch(AddNewCard(newCard));
	  	// save to AsyncStorage
	  	updateDeck({title, newDeck});
	  	// reset form
	  	this.setState({ question: '', answer: '' });
	  	this.qInput.clearText();
	  	this.aInput.clearText();
	  	// go back to Deck
	  	Keyboard.dismiss();
	  	this.props.navigation.goBack();
	  }
  } 

	render() {
		const { question } = this.state;
		const { answer } = this.state;
		const { title } = 'noe need';
		return (
			<View style={styles.container}>
				<View style={{marginTop: 40}}>
					<View style={styles.formView}>
						<FormLabel labelStyle={{fontSize:20}}>Title for the Note</FormLabel>
						<FormInput placeholder="Title" ref={input => this.qInput = input} onChangeText={this.handleQuestion}/>
					</View>
					<View style={styles.formView}>
						<FormLabel labelStyle={{fontSize:20}}>Enter the Points</FormLabel>
						<FormInput placeholder="Notes" multiline={false}  maxLength={40} ref={input => this.aInput = input} onChangeText={this.handleAnswer1}/>
						<FormInput placeholder="Notes" multiline={false}  maxLength={40} ref={input => this.aInput = input} onChangeText={this.handleAnswer2}/>
						<FormInput placeholder="Notes" multiline={false}  maxLength={40} ref={input => this.aInput = input} onChangeText={this.handleAnswer3}/>
						<FormInput placeholder="Notes" multiline={false}  maxLength={40} ref={input => this.aInput = input} onChangeText={this.handleAnswer4}/>
						<FormInput placeholder="Notes" multiline={false}  maxLength={40} ref={input => this.aInput = input} onChangeText={this.handleAnswer5}/>
					</View>
				</View>
        <Button 
        	onPress={() => this.sbmtCard(title, question, this.state.answer1,this.state.answer2,this.state.answer3,this.state.answer4,this.state.answer5)}
					title={"Add"}
					backgroundColor="#03A9F4"
					icon={{name: 'add'}} 
					style={{marginTop: 20}}
        >
        </Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: 'white',
	},
	formView: {
		alignItems: 'center',
	},
})

function mapStateToProps(state) {
  return {
    deckData: state.decks.deckData
  }
}

export default connect(mapStateToProps)(AddCard)