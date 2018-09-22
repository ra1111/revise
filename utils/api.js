import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashCards:decks';

export function saveDeckTitle ({ input, newDeck }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [input]: newDeck
  }))
}

export function updateDeck ({ title, newDeck }) {
  console.log(title,newDeck,"JWDJDI");
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = newDeck
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function getDecks () {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function removeDeck (title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}