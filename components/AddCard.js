import React from 'react'
import { StyleSheet, Text, View, Keyboard,KeyboardAvoidingView,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { AddNewCard } from '../actions'
import { updateDeck } from '../utils/api'
import { Button, Input} from 'react-native-elements'
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
		  //alert("Please Enter Question and Answer");
		  console.log(this.qInput.value)
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
		  noteNumber:[{note:''}]});
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
			
				<View style={styles.containerMain}>
						<ScrollView contentContainerStyle={styles.container} > 
				<View style={styles.formView} >
			
					<View style={styles.formView}>
					<Text style={styles.label}>Title For The Note</Text>
							<Input containerStyle={styles.input}  inputContainerStyle={styles.input} style={styles.input}  placeholder="Title" ref={input => this.qInput = input} onChangeText={this.handleQuestion}/>
					
					</View>
					<View style={styles.formView}>
					<Text style={styles.label}>Enter the points</Text>
					
					
						{this.state.noteNumber.map((value, index) => (
							<View>
  <Input placeholder="Notes" containerStyle={styles.input}  inputContainerStyle={styles.input}  multiline={false}  maxLength={80}      ref={input =>this[`aInput${index}`] = input} onChangeText={this.handleAnswer(index)}/>
  <Text style={styles.index}>{value.note.length}/80 </Text>
  </View>
		))}
	
					</View>
				</View>
			
				<Button onPress={()=> this.addNote()
				}
				title={"Add"}
				
				size={20}
				icon={{name: 'add', color:'white'}} 
				buttonStyle={styles.add}></Button>
		<View style={{width:200,borderRadius:5}}> 	
        <Button 
        	onPress={() => this.sbmtCard(title, question)}
					title={"Submit"}
				
					icon={{name: 'check', color:'white'}} 
					size={40}
					buttonStyle={{marginTop: 20,backgroundColor:"#03A9F4"}}
        >
        </Button>
		</View>
		</ScrollView>
		</View>
	
			
		)
	}
}

const styles = StyleSheet.create({
	container: {
    alignItems: 'center',
    alignContent: 'center',
	backgroundColor: 'white',
	width:'100%'

	},
	containerMain:{
		alignItems: 'center',
		alignContent: 'center',
		backgroundColor: 'white',
		height:'100%',
		width:'100%'
	},

	formView: {
		alignItems: 'center',
		width:'100%'
	},
	add:{
		borderRadius:40,
		marginTop:20,
		marginBottom:20,
		backgroundColor:"#03A9F4",
		padding:16

	},
	index:{
		textAlign:'right',
		marginHorizontal:15,
		color:"#d8d8d8",
	},
	input:{
width:'100%',

		
	},
	label:{
		fontSize:20
	}
})

function mapStateToProps(state) {
  return {
    deckData: state.decks.deckData
  }
}

export default connect(mapStateToProps)(AddCard)