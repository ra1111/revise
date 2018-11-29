
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';
let deckData={}
 export default class Search extends Component {
    static navigationOptions = {
                header: null
            };
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      deckDatas:{},
      error: null,
    };

    this.arrayholder = [];
  }

  componentWillMount() {
    this.makeRemoteRequest();
  }

 makeRemoteRequest = () => {	
    let database = firebase.database();
    database
    .ref('users' ).orderByChild('decks').once('value',
    (snapshot) =>{
    console.log(snapshot.val(),"wbdudwubwbudbudwbu") 
  snapshot.forEach((snap)=>{
let val=snap.val()
if(snap.hasChild('decks'))
{
 let data=val.decks
 for(var key in data)
 {
   deckData[key]=data[key]
 }

}
this.setState({
  deckDatas:deckData,
  data:Object.keys(deckData)
})
this.arrayholder=Object.keys(deckData)
  })})





}


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    console.log(this.arrayholder,"here array");
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.toUpperCase()} `;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
next=(item)=>{

let deck={}
let ans=[]
let questions=this.state.deckDatas[item]
//COmplete navigation
deck={title:item,questions:questions}
this.props.navigation.navigate('DeckDetail',
              {deckData: deck}) 
}
  renderHeader = () => {
    return (
      <SearchBar
        showLoading
                  round
                  autoCorrect={false}  
                  lightTheme
                  cancelButtonTitle="Cancel"
                  ref={search => this.search = search}
                  platform="android"
                  containerStyle={{backgroundColor: '#f1f1f1'}}
                  inputStyle={{color: 'black',backgroundColor:'white'}}
                placeholder='Type Here...'
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  render() {
    console.log(this.state,"key")
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      
   
       <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
         renderItem={({ item }) => (
           <ListItem
             roundAvatar
               title={item}
      //         subtitle={'sub'}
      onPress={()=>{this.next(item)}}
      //       //  avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
      //     keyExtractor={item => item.key}
           ItemSeparatorComponent={this.renderSeparator}
           ListHeaderComponent={this.renderHeader}
         />
       </List>
    );
  }
}

