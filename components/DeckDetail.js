import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {removeDeck} from '../utils/api';
import {DeleteDeck} from '../actions';
import * as firebase from 'firebase';

/**
 *  Class to Check Deck Detail.
     *
@description It is used to  upload.
@example Upload;
@return {Object} Deck.
@param {Object} decks - The first deck.
    */
class DeckDetail extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.deck
                ? navigation.state.params.deck.title
                : navigation.state.params.deckData.title
        };
    }
    /**
*UPloads on Firebase.
     *
@description It is used to  upload.
@example Upload;
@param {Object} decks - The first deck.
    */
    uploadDeck(decks) {
        // IMPRODOKDVEHIEOUE{
        let deckData = JSON.parse(JSON.stringify(decks));
        const user = firebase
            .auth()
            .currentUser;

        const database = firebase.database();
        let deckObj = {};
        const title = deckData.title;
        const questions = deckData.questions;
        deckObj[title] = questions;
        try {
            database
                .ref('users/' + user.uid)
                .once('value')
                .then((snapshot) => {
                    let currentDeck = snapshot
                        .val()
                        .decks;

                    if (currentDeck === 0) {

                        database
                            .ref('users/' + user.uid)
                            .update({decks: deckObj});
                        deckObj = {};
                    } else {
                        // update exsisiting deck avoid duplicate deck add new deck

                        currentDeck[title] = questions;
                        database
                            .ref('users/' + user.uid)
                            .update({decks: currentDeck});
                        currentDeck = {};
                    }
                });
            deckData = {};
            Alert.alert('Upload Sucessful');
        } catch (ex) {
            // eslint-disable-next-line
            console.log(ex, 'exception');
            Alert.alert('Upload Failed Something Went Wrong');
        }
    }
    /**
*UPloads on Firebase.
     *
@description It is used to  upload.
@example Upload;
@return {Object} Decks - The first deck.
    */
    getDeck() {
        const deck = this
            .props
            .navigation
            .getParam('deckData', 'example');
        if (deck !== 'example') {
            return deck;
        } else {
            const tmp = this
                .props
                .deckData
                .filter((deck) => deck.title === this.props.navigation.state.params.deck.title)[0];
            if (tmp) {
                return tmp;
            }
        }
        return {title: '', questions: []};
    }
    /**
*GEt Quiz Reults .
     *
@description It is used to  upload.
@example Upload;
@return {string} Deck..
@param {Object} deck - The first deck.
    */
    getQuizResults(deck) {
        const results = this
            .props
            .quiz
            .results
            .filter((res) => res.title === deck.title)[0];
        if (results) {
            return `Last Quiz Score: ${results.Score}%`;
        } else if (deck.perc) {
            return `Last Quiz Score: ${deck.perc}%`;
        }
        return 'You Have Not Taken A Quiz Yet';
    }

    /**
*GEt Quiz Reults .
     *
@description It is used to  upload.
@example Upload;
@param {Object} deck - The first deck.
    */
    deleteDeck(deck) {
        // remove from AsynStorage
        removeDeck(deck.title);
        // remove from state
        this
            .props
            .dispatch(DeleteDeck(deck.title));
        // go back
        this
            .props
            .navigation
            .dispatch(NavigationActions.back());
    }
    /**
*GEt Quiz Reults .
     *
@description It is used to  upload.
@example Upload;
@return {Object} Deck.
    */
    render() {
        const deck = this.getDeck();
        return (
            <View style={styles.container}>
                <View style={styles.detailView}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subtitle}>{deck.questions.length}
                        Cards</Text>
                    <View style={styles.btnView}>
                        <Button
                            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                            title={'Back To All Decks'}
                            icon={{
                            name: 'arrow-back',
                            color: 'white'
                        }}
                            buttonStyle={{
                            backgroundColor: '#03A9F4'
                        }}></Button>
                        <Button
                            onPress={() => this.deleteDeck(deck)}
                            title={'Delete Deck'}
                            icon={{
                            name: 'delete',
                            color: 'white'
                        }}
                            buttonStyle={{
                            marginTop: 20,
                            backgroundColor: '#FF0000'
                        }}></Button>
                        <Button
                            onPress={() => this.uploadDeck(deck)}
                            title={'Upload Deck'}
                            icon={{
                            name: 'file-upload',
                            color: 'white'
                        }}
                            buttonStyle={{
                            marginTop: 20,
                            backgroundColor: 'green'
                        }}></Button>
                        <Text style={styles.quizText}>{this.getQuizResults(deck)}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    detailView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 24,
        color: 'gray'
    },
    btnView: {
        padding: 20
    },
    quizText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20
    }
});
/**
*GEt Props Reults .
     *
@description It is used to  get props.
@example Upload;
@return {Object} Deck.
@param {Object} state - The state.
    */
function mapStateToProps(state) {
    return {deckData: state.decks.deckData, quiz: state.quiz};
}

DeckDetail.propTypes = {
    quiz: PropTypes.any,
    deckData: PropTypes.object,
    navigation: PropTypes.func,
    dispatch: PropTypes.func
};
export default connect(mapStateToProps)(DeckDetail);
