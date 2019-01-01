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
				<Text style={{fontSize:28,marginVertical:15,color:"#03A9F4"}}>Enter the Deck title</Text>
				<Input  style={styles.textInput}  placeholderTextColor="#03A9F4" placeholder="Enter the title"onChangeText={this.handleTextChange}/>
        <Button 
        	onPress={() => this.sbmtDeck(input)}
	        title={"Create Deck"}
	        buttonStyle={{marginTop: 20, backgroundColor:"#03A9F4"}}    
	        icon={{name: 'create',color:'white'}}
        />
        
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		alignContent: 'center',
		backgroundColor: 'white',
		flex:1,
		justifyContent:'space-around'
	},
	text: {
		fontSize: 36,
		flexWrap: 'wrap',
		textAlign: 'center',

	},
	textInput: {
		width: 200,
		height: 40,
		padding: 8,
		color:'#03A9F4',
		borderWidth: 1,
	
		borderColor: '#03A9F4',
	},
})

export default connect()(AddDeck)