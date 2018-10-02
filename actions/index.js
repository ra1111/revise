export const RECEIVE_DECKS='RECEIVE_DECKS';
export const ADD_QUIZ='ADD_QUIZ';
export const ADD_DECK='ADD_DECK';
export const ADD_CARD='ADD_CARD';
export const DELETE_DECK='DELETE_DECK';

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks,
	}
}

export function AddQuizResults(title, perc) {
	return {
		type: ADD_QUIZ,
		title,
		perc,
	}
}

export function AddNewDeck(deck) {
	return {
		type: ADD_DECK,
		deck,
	}
}

export function DeleteDeck(title) {
	return {
		type: DELETE_DECK,
		title,
	}
}

export function AddNewCard({title, question, answer}) {
	console.log(title,question,answer,'hi')
	return {
		type: ADD_CARD,
		title,
		question,
		answer,
	
	}
}