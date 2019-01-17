import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { TabNavigator, StackNavigator } from 'react-navigation'
import {Icon} from './node_modules/react-native-elements';
import MainDecks from './components/MainDecks'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import ExtQuiz from './components/ExtQuiz/ExtQuiz'
import AddNotes from './ImageToText'
import DeckDetail from './components/DeckDetail'
import Search from './containers/Search'
import Mcq from './components/Mcq'
import Account from './containers/Account'
import Login from './containers/Login'
import Mock from './containers//Mock'
import Chat from './containers/Chat'
// symbol polyfills for yellow box error
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
import ExternalDeck from './components/ExternalDecks'
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
      tabBarIcon: <Icon name='cards-playing-outline' size={30} color={'#2286c3'} />
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'Add Card',
      tabBarIcon: <Icon name='plus-square' size={30} color={'#2286c3'} />
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      tabBarLabel: 'Notes',
      tabBarIcon: <Icon name='question-answer' size={30} color={'#2286c3'} />
    },
  },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
      color: '#2286c3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    style: {
      height: 56,
      borderColor: '#2286c3',
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
const MainTab=TabNavigator({
  Home:{
    screen: AddNotes,
    navigationOptions: {
      tabBarLabel : ({ tintColor }) => (
        <Icon name="home" color="white" type="material-community"/>
      )
    },
   
  },
  Search:{
    screen:Search,
    navigationOptions:{
      tabBarLabel : ({ tintColor }) => (
        <Icon name="ios-search" color="white" type='ionicon'/>
      )
    },
   
  },
  Mock:{
    screen:Mock,
    navigationOptions:{
      tabBarLabel:()=><Icon name='md-paper'  type='ionicon' color="white"/>
    },
  },
  Chat:{
screen:Chat,
navigationOptions:{
tabBarLabel:()=><Icon name='chat' type='entypo' color="white"/>
  },
},



  Account:{
    screen:Account,
    navigationOptions:{
     
      tabBarLabel:()=><Icon name='account-circle' color="white" type="material-community"/>
    },
    tabBarOptions: {
      activeTintColor: 'red',
      showIcon: true,
      showLabel: false,
      inactiveTintColor: '#2286c3',
    style: {
      backgroundColor: '#EEEEEE',
    },
},
  
  },

});
const MainNavigator = StackNavigator({
  Login:{
    screen:Login,
    
  },

  Home:{
    screen:MainTab,
    
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      
     }
        
      },
        AddCard: {
          screen: AddCard,
          navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2286c3',
            },
          }
        },

  

  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2286c3',
      }
    },
  },
  DeckDetail: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2286c3',
      }
    },
  },
  ExternalDeck:{
    screen: ExternalDeck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2286c3',
      }
    },
  },
  Mcq:{
    screen: Mcq,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2286c3',
      }
    },
  },
  ExtQuiz:{
    screen: ExtQuiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2286c3',
      }
    },
  },
  
  MainDeck: {
    screen: MainDecks,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2286c3',
      }
    },
  },
},
{
headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  },

{
  cardStyle: {
    paddingTop: 0,
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


