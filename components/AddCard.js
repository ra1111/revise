import React from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { AddNewCard } from '../actions'
import { updateDeck } from '../utils/api'
import { Button, FormLabel, FormInput,FormValidationMessage } from 'react-native-elements'
import thunk from '../node_modules/redux-thunk';

class AddCard extends React.Component {

	state= {
		question: '',
answer:[],
note:'',
noteNumber:[{note:''}],

	}

  static navigationOptions = ({ navigation }) => {
  	return {
  		title: 'Add Card'
  	}
  }
  requiredMessage = input => {
    return input === '' ? <FormValidationMessage>Title is required</FormValidationMessage> : <View/>
  };


  handleQuestion = (question) => {
  	this.setState({
  		question,
  	})
  }

handleAnswer=(idx) => (evt) => {
	console.log(idx,evt,"thus the inout")
    const newNote = this.state.noteNumber.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, note: evt};
    });
    this.setState({ noteNumber: newNote });
}
addNote=()=>{
	let noteNumber=this.state.noteNumber;
	if(noteNumber.length>4)
	{
		alert("Maximum Limit Reached Please Submit the card");
		
	}else{
		this.setState({
			noteNumber: this.state.noteNumber.concat([{ note: '' }])
		  });
}
}
  sbmtCard = (title, question) => {
	 

	  let answer=[]
	  let note=this.state.noteNumber
	  answer=note.map(a=>a.note)

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
			if(deck.title === title) {
				
				newDeck = {title: deck.title, questions: deck.questions.concat({question,answer})};
				key = index;
			}
		});
		  this.props.dispatch(AddNewCard(newCard));
	  	// save to AsyncStorage
	  	updateDeck({title, newDeck});
	  	// reset form
	  	this.setState({ question: '', answer: [], note:'',
		  noteNumber:[{note:''}],});
		this.qInput.clearText();
	for(let i=0;i<answer.length;i++)
	{
		this[`aInput${i}`].clearText();
	}
	  	// go back to Deck
	  	Keyboard.dismiss();
	  	this.props.navigation.goBack();
	  }
  } 

	render() {
		const { question } = this.state;
		const { answer } = this.state;
		const { title } = this.props.navigation.state.params.deck?this.props.navigation.state.params.deck:this.props.navigation.state.params.deckData.title;
		return (
			<View style={styles.container}>
				<View >
					<View style={styles.formView}>
						<FormLabel labelStyle={{fontSize:20}}>Title for the Note</FormLabel>
						<FormInput   underlineColorAndroid="#d8d8d8" placeholder="Title" ref={input => this.qInput = input} onChangeText={this.handleQuestion}/>
						{this.requiredMessage(this.qInput)}
					</View>
					<View style={styles.formView}>
						<FormLabel labelStyle={{fontSize:20}}>Enter the Points</FormLabel>
						{this.state.noteNumber.map((value, index) => (
  <FormInput placeholder="Notes"   underlineColorAndroid="#d8d8d8" multiline={false}  maxLength={200}      ref={input =>this[`aInput${index}`] = input} onChangeText={this.handleAnswer(index)}/>
        ))}
					</View>
				</View>
			
				<Button onPress={()=> this.addNote()
				}
				title={"Add"}
				backgroundColor="#03A9F4"
				size={20}
				icon={{name: 'add'}} 
				buttonStyle={styles.add}></Button>
		<View style={{width:200,borderRadius:5}}> 	
        <Button 
        	onPress={() => this.sbmtCard(title, question)}
					title={"Submit"}
					backgroundColor="#03A9F4"
					icon={{name: 'check'}} 
					size={40}
					style={{marginTop: 20}}
        >
        </Button>
		</View>
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