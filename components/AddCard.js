import React from 'react'
import { StyleSheet, Text,TextInput, View, Keyboard,KeyboardAvoidingView,ScrollView } from 'react-native'
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
noteNumber:[],
para:[],

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
handlePara=(idx) => (evt) => {
	console.log(idx,evt,"thus the inout")
    const newNote = this.state.para.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, note: evt};
    });
    this.setState({ para: newNote });
}
addPara=()=>{
	console.log("clicked")
	this.setState({
		para: this.state.para.concat([{ note: '' }])
	  });
}
addNote=()=>{
	console.log("CLICKED ZCDD")
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
	console.log("CLICKED ZCDD")
	  let answer=[]
	  let note=this.state.noteNumber
	  let para=this.state.para
	  if(this.state.para.length==0)
	  {
	  answer=note.map(a=>a.note)
	  }else if
		  (this.state.note.length===0){
			  answer=para.map(a=>a.note)}
			  else{console.log('some error')}

  	if(question === '' || (answer[0] === '')) {
		  //console.log("Please Enter Question and Answer");
		  console.log(this.qInput.value)
  	} else {
		  try{	
	  	const newCard = {
	  		title,
	  		question,
		answer
	  	}
	  	let newDeck = ''
		  let key = ''
		  console.log(this.props.deckData,'deckdata')
		  this.props.deckData.map((deck,index) => {
			if(deck.title === title) {
				console.log(deck,'deck')
			newDeck = {title: deck.title, questions: deck.questions.concat({question,answer})};
				key = index;
			}
		});
		console.log("CLICKED 1")
		  this.props.dispatch(AddNewCard(newCard));
		  console.log("CLICKED Z")
	  	// save to AsyncStorage
		  updateDeck({title, newDeck});
		  console.log("CLICKED Z3")
	  	// reset form
	  	this.setState({ question: '', answer: [], note:'',
		  noteNumber:[],para:[]});
		  console.log("CLICKED ZCD")

		this.qInput.clear();
		console.log("CLICKED ZCDDa")
	for(let i=0;i<answer.length;i++)
	{
		this[`aInput${i}`].clear();
	}
	// console.log("CLICKED ZCDDsw")
	//   	// go back to Deck
	// 	  Keyboard.dismiss();
		  console.log("CLICKED ZCDDwdwda")
	  	this.props.navigation.goBack();
	  }
	  catch(exception)
	  {
		  console.log(exception)
	  }
	}

  } 

	render() {
		const { question } = this.state;
		const { answer } = this.state;
		const { title } = this.props.navigation.state.params.deck?this.props.navigation.state.params.deck:this.props.navigation.state.params.deckData.title;
		return (
			
				<View style={styles.containerMain}>
						<ScrollView contentContainerStyle={styles.container}    keyboardShouldPersistTaps={"always"}> 
				<View style={styles.formView} >
			
					<View style={styles.formView}>
					<Text style={styles.label}>Title For The Note</Text>
							<Input containerStyle={styles.input}  inputContainerStyle={styles.input} style={styles.input}  placeholder="Title" ref={input => this.qInput = input} onChangeText={this.handleQuestion}/>
					
					</View>
					<View style={styles.formView}>
					<Text style={styles.label}>Enter the points</Text>
					
					
						{this.state.noteNumber.map((value, index) => (
							<View>
  <Input placeholder="Notes" containerStyle={styles.input}  inputContainerStyle={styles.input}  multiline={false}  maxLength={100}      ref={input =>this[`aInput${index}`] = input} onChangeText={this.handleAnswer(index)}/>
  <Text style={styles.index}>{value.note.length}/100 </Text>
  </View>
		))}
							{this.state.para.map((value, index) => (
							
							<View style={styles.container}>
								<View style={styles.textAreaContainer} >
								
  <TextInput placeholder="Para" style={styles.textArea} numberOfLines = {6} multiline={true}  maxLength={500}      ref={input =>this[`aInput${index}`] = input} onChangeText={this.handlePara(index)}/>
  </View>
  <Text style={styles.index}>{value.note.length}/500 </Text>
  </View>
		))}
	
					</View>
				</View>
		
			{this.state.para.length==0&&
				<View style={{justifyContent:"space-between",flexDirection:'row'}}>
				<Button onPress={()=> this.addNote()}
				title={" Points"}
				
				size={20}
				icon={{name: 'add', color:'white'}} 
				buttonStyle={styles.add}/>
				
				<Button onPress={()=>this.addPara()}
				title={" Paragraph"}
				size={20}
				icon={{name: 'add', color:'white'}} 
				buttonStyle={styles.add}/>
						</View>}
		
		<View style={{width:200,height:50,borderRadius:5,marginTop: 20,alignItems:'center'}} elevation={3}> 	
		<Button 
        	onPress={() => this.sbmtCard(title, question)}
					title={"Submit"}
				
					icon={{name: 'check', color:'white'}} 
					size={40}
					buttonStyle={{ height: 45,
						width:190, 
						backgroundColor:"#03A9F4"}}
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
	textAreaContainer: {
		width:'100%',
		
		borderWidth: 1,
		padding: 5
	  },
	  textArea: {
		height: 250,
		width:300,
		justifyContent: "flex-start"
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
		elevation:3,
marginHorizontal:10,
		marginTop:20,
		marginBottom:20,
		backgroundColor:"#03A9F4",
	height:70,
	width:120,
	borderRadius:40
	

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