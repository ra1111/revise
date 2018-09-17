import React from 'react'
import { Text, View, Platform, StatusBar } from 'react-native'
import MainDecks from './components/MainDecks'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import AddNotes from './ImageToText'
import DeckDetail from './components/DeckDetail'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Icon} from 'react-native-elements'
//import { setLocalNotification } from './utils/helpers'

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

const Tabs = TabNavigator({
  TabHome: {
    screen: DeckDetail,
    navigationOptions: {
      tabBarLabel: 'Deck',
      tabBarIcon: <Icon name='cards-playing-outline' size={30} color={'gray'} />
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'Add Card',
      tabBarIcon: <Icon name='plus-square' size={30} color={'gray'} />
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      tabBarLabel: 'Start Quiz',
      tabBarIcon: <Icon name='question-answer' size={30} color={'gray'} />
    },
  },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
      color: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
    },
    style: {
      height: 56,
      borderColor: 'gray',
      backgroundColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
  },
})

const MainNavigator = StackNavigator({
  Home:{
    screen:AddNotes,
    navigationOptions: {
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'gray',
          },
        },
      },
        AddCard: {
          screen: AddCard,
          navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'gray',
            },
          }
        },

  

  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'gray',
      }
    },
  },
  DeckDetail: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'gray',
      }
    },
  },
  MainDeck: {
    screen: MainDecks,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'gray',
      }
    },
  },
},
{
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
})

export default class App extends React.Component {

  componentDidMount() {
  //  setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}


