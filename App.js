import React from 'react'
import { Text, View, Platform, StatusBar } from 'react-native'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Icon} from 'react-native-elements'
import MainDecks from './components/MainDecks'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import AddNotes from './ImageToText'
import DeckDetail from './components/DeckDetail'
import Search from './containers/Search'
import Account from './containers/Account'
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
const MainTab=TabNavigator({
  Home:{
    screen: AddNotes,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ()=><Icon name='home-outline' size={30} color={'red'} />
    },
   
  },
  Search:{
    screen:Search,
    navigationOptions:{
      tabBarLabel:'Search',
      tabBarIcon:()=><Icon name='search-outline' size={30} color={'red'}/>
    },
   
  },
  Account:{
    screen:Account,
    navigationOptions:{
      tabBarLabel:'Account',
      tabBarIcon:()=><Icon name='account-outline' size={30} color={'red'}/>
    },
    tabBarOptions: {
      activeTintColor: 'red',
      showIcon: true,
      showLabel: true,
      inactiveTintColor: 'gray',
    style: {
      backgroundColor: '#EEEEEE',
    },
},
  
  },

});
const MainNavigator = StackNavigator({
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


