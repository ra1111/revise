import { combineReducers } from 'redux';
import {
	RECEIVE_DECKS,
	ADD_QUIZ,
	ADD_DECK,
	ADD_CARD,
	DELETE_DECK,
} from '../actions';


function decks (state={deckData: []}, action) {
	console.log(state,action);
	switch(action.type) {
		case RECEIVE_DECKS :
		return {
			...state,
			deckData: [...state.deckData, ...action.decks],
		}
		case ADD_DECK :
		return {
			...state,
			deckData: [...state.deckData, action.deck],
		}
		case ADD_CARD :
		return {
			...state,
			deckData: state.deckData.map(deck => {
			
				return deck.title === action.title 
				? {title: deck.title, questions:deck.questions? deck.questions.concat({question:action.question, answer: action.answer,answerArr:action.answerArr}):{question:action.question, answer: action.answer,answerArr:action.answerArr}} 
				: {...deck}
			})
		}
		case DELETE_DECK :
		return {
			...state,
			deckData: state.deckData.filter(deck => deck.title !== action.title),
		}
		default :
			return state
	}
}

function quiz (state={results:[]}, action) {
	switch(action.type) {
		case ADD_QUIZ :
			return {
			...state,
			results: quizArray(state.results, action),
		}
		default :
		return state
	}
}

function quizArray(results, action) {
	let ind = false;
	if( results.length === 0) {
		return results.concat({ title: action.title, Score: action.perc })
	}
 	let newArray = results.map(deck => {
				if(deck.title === action.title) { 
					ind = true;
					return {title: action.title, Score: action.perc}
				} else {
				  return {title: deck.title, Score: deck.Score}
				}})
	if(!ind) {
		return results.concat({ title: action.title, Score: action.perc })
	}
	return newArray
}

export default combineReducers({
	decks,
	quiz,
});
