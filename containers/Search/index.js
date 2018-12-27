
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
    this.setState({loading:true})
  }

 makeRemoteRequest = () => {	
    let database = firebase.database();
    try{
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
  data:Object.keys(deckData),
  loading:false
})
console.log(this.state,'state')
this.arrayholder=Object.keys(deckData)
  })}).catch(err=>{
console.log(err,'error')
  });



    }
    catch(ex){
      console.log(ex,'excepwtion')
    }

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

let questions=this.state.deckDatas[item]
//COmplete navigation
deck={title:item,questions:questions}
this.props.navigation.navigate('DeckDetail',
              {deckData: deck}) 
}
  renderHeader = () => {
    return (
      <SearchBar
                  round
                  autoCorrect={false}  
                  lightTheme
                  icon={{ type: 'font-awesome', name: 'search' }}
                  cancelButtonTitle="Cancel"
                  ref={search => this.search = search}
                  platform="android"
                  containerStyle={{backgroundColor: '#f1f1f1'}}
                  inputStyle={{color: 'black',backgroundColor:'white'}}
                placeholder='Type Here...'
        onChangeText={text => this.searchFilterFunction(text)}
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
          keyExtractor={item => item.key}
           ItemSeparatorComponent={this.renderSeparator}
           ListHeaderComponent={this.renderHeader}
         />
    );
  }
}

