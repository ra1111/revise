import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native'

import { connect } from 'react-redux'

import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { Button } from 'react-native-elements'

class ExternalDeck extends React.Component {




 

	render() {
    console.ignoredYellowBox = ['VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.'];
    let deckData = this.props.navigation.getParam('deckData', 'example');
    console.log(deckData,"gygy")
		return (
      <View style={styles.container}>
        <Text style={styles.title}>Mobile Flash Cards</Text>
        {deckData.length === 0 || deckData === undefined
          ? (
            <View style={styles.container}><Text style={styles.title}>You Have No Decks</Text></View>
          )
          : (
            <RenderItem
              deck={deckData}
              navigation={this.props.navigation}
            />
          )
        }
        <View style={styles.addButton}>
          <Button 
            onPress={() => this.props.navigation.navigate('AddDeck')}
            title={"New Deck"}
            backgroundColor="#03A9F4"
            icon={{name: 'add-to-list', type: 'entypo'}}
          >
          </Button>
        </View>
      </View>
		)
	}
}
function RenderItem  ({deck,navigation})  {
    console.log(deck,"deck")
    return (
        <View style={styles.row}>
          <TouchableOpacity onPress={() => 
            navigation.navigate('DeckDetail',
              {deck: deck})}>
            <Text style={styles.rowContent}>{deck.title}</Text>
          </TouchableOpacity>
          <Text style={styles.deckCount}>Cards</Text>
        </View>
    )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    padding: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  rowContent: {
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deckCount: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    marginLeft: 'auto',
    color: 'gray',
  },
  addButton: {
    marginBottom: 80,
  },
});


export default (ExternalDeck)














