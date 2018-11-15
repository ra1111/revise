import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native'

import { connect } from 'react-redux'

import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { Button } from 'react-native-elements'

class MainDecks extends React.Component {


  renderItem = (deck) => {
    return <Decks deck={deck.item} navProps={this.props.navigation}  key={deck.item} />
  }

	render() {
    console.ignoredYellowBox = ['VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.'];
    const deckData = this.props.deckData;
    console.log(deckData,"ijdeijd")
		return (
      <View style={styles.container}>
        <Text style={styles.title}>Mobile Flash Cards</Text>
        {deckData.length === 0 || deckData === undefined
          ? (
            <View style={styles.container}><Text style={styles.title}>You Have No Decks</Text></View>
          )
          : (
            <FlatList
              style={styles.list}
              data={deckData}
              renderItem={this.renderItem}
            />
          )
        }

      </View>
		)
	}
}

function Decks ({deck, navProps}) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => 
        navProps.navigate('DeckDetail',
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


function mapStateToProps(state) {
  return {
    deckData: state.decks.deckData
  }
}

export default connect(mapStateToProps)(MainDecks)














