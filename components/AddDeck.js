import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { AddNewDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { Button, Input } from 'react-native-elements'

class AddDeck extends React.Component {
  
  static navigationOptions = () => {
  	return {
  		title: 'Create Deck'
  	}
  }

 	state = {
  	input: ''
  }

  handleTextChange = (input) => {
  	this.setState({
  		input,
  	})
  }

  sbmtDeck = (input) => {
  	if(input === '') {
  		alert("Please Enter Deck Name");
  	} else {
	  	const newDeck = {
	  		title: input,
	  		questions: []
	  	}
	  	// add new deck to store
	  	this.props.dispatch(AddNewDeck(newDeck));
	  	// save to AsyncStorage
	  	saveDeckTitle({input, newDeck});
	  	// go back to Home
	  	this.props.navigation.navigate('DeckDetail',{deck:newDeck});
	  }
  } 

	render() {
		const { input } = this.state;
		return(
			<View style={styles.container}>
				<Text labelStyle={{fontSize:20}}>What is the title of your new deck?</Text>
				<Input   placeholder="Enter the title"onChangeText={this.handleTextChange}/>
        <Button 
        	onPress={() => this.sbmtDeck(input)}
	        title={"Create Deck"}
	        style={{marginTop: 20}}
	        backgroundColor="#03A9F4"
	        icon={{name: 'create'}}
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
    paddingTop: 60,
	},
	text: {
		fontSize: 36,
		flexWrap: 'wrap',
		textAlign: 'center',
		marginTop: 30,
	},
	textInput: {
		width: 200,
		height: 40,
		padding: 8,
		borderWidth: 1,
		margin: 50,
		borderColor: 'gray',
	},
})

export default connect()(AddDeck)