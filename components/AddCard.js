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
noteNumber:[],

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

handleAnswer=(answer)=>{
	
	let prev=answer.slice(0,-1);
	

	let ans=this.state.answer.slice();
	if(prev=='')
{
	ans.push(answer)
	console.log(ans,"first")

	
}
else{

	for(let i=0;i<ans.length;i++)
	{
		if (ans[i].match(prev))
		{
ans[i]=answer;
console.log(ans,"match");
		}
	}
	

}
	this.setState({
		answer:ans,
	})
console.log(this.state.answer);
}
addNote=()=>{
	let noteNumber=this.state.noteNumber;
	noteNumber.push(<FormInput placeholder="Notes" multiline={false}  maxLength={40} ref={input => this.aInput = input} onChangeText={this.handleAnswer}/>)
	this.setState({
		noteNumber

})
}
  sbmtCard = (title, question, answer) => {
  	if(question === '' || answer[0] === '') {
  		alert("Please Enter Question and Answer");
  	} else {	
	  	const newCard = {
	  		title,
	  		question,
		answer
	  	}
	  	let newDeck = ''
	  	let key = ''
		  this.props.deckData.map((deck,index) => {
			  console.log(deck,index,"TITLEVXUGS")
			if(deck.title === title) {
				console.log(deck,"TITLEMATCHES")
				newDeck = {title: deck.title, questions: deck.questions.concat({question,answer})};
				key = index;
			}
		});
		console.log(newDeck,"NEW DECK");
		  this.props.dispatch(AddNewCard(newCard));

	  	// save to AsyncStorage
	  	updateDeck({title, newDeck});
	  	// reset form
	  	this.setState({ question: '', answer: [] });
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
		const { title } = this.props.navigation.state.params.deck;
		return (
			<View style={styles.container}>
				<View style={{marginTop: 40}}>
					<View style={styles.formView}>
						<FormLabel labelStyle={{fontSize:20}}>Title for the Note</FormLabel>
						<FormInput placeholder="Title" ref={input => this.qInput = input} onChangeText={this.handleQuestion}/>
					</View>
					<View style={styles.formView}>
						<FormLabel labelStyle={{fontSize:20}}>Enter the Points</FormLabel>
						{this.state.noteNumber.map((value, index) => {
          return value
        })}
					</View>
				</View>
			
				<Button onPress={()=> this.addNote()
				}
				title={"Add"}
				backgroundColor="#03A9F4"
				size={20}
				icon={{name: 'add'}} 
				buttonStyle={styles.add}></Button>
			
        <Button 
        	onPress={() => this.sbmtCard(title, question, answer)}
					title={"Submit"}
					backgroundColor="#03A9F4"
					icon={{name: 'add'}} 
					size={20}
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
	add:{
		borderRadius:20,
		marginTop:20,
		marginBottom:20,

	}
})

function mapStateToProps(state) {
  return {
    deckData: state.decks.deckData
  }
}

export default connect(mapStateToProps)(AddCard)