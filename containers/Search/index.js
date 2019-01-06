
import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator,Alert } from 'react-native';
import {  ListItem, SearchBar, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
let deckData={};
let deck
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

  UNSAFE_componentWillMount() {
    this.makeRemoteRequest();
    this.setState({loading:true})
  }

 makeRemoteRequest = () => {	
    let database = firebase.database();
    try{
    database
    .ref('users' ).orderByChild('decks').once('value',
    (snapshot) =>{
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
this.arrayholder=Object.keys(deckData)
  })}).catch(err=>{
  // eslint-disable-next-line
console.log(err,'error')
  });



    }
    catch(ex){
        // eslint-disable-next-line
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
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.toUpperCase()} `;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if(newData.length!==0)
    {
    this.setState({
      data: newData,
    });
  }else{
    Alert.alert('Deck Not Available')
  }
  };
next=(item)=>{

let questions=this.state.deckDatas[item]
//COmplete navigation
deck={title:item,questions:questions}
this.props.navigation.navigate('ExtQuiz',
              {deckData: deck}) 
}
  renderHeader = () => {
    return (
      <SearchBar
      inputStyle={{backgroundColor: 'white'}}
    containerStyle={{backgroundColor: 'white', borderWidth: .5, borderRadius: 5}}
    placeholderTextColor={'#g5g5g5'}
    platform="android"
    cancelIcon={<Icon name="cancel"/>}
    placeholder={'Type Here...'}
   
    rightIconContainerStyle={{backgroundColor:'#38b4f7',display:'none'}}
    onChangeText={text => this.searchFilterFunction(text)}
    ref={search => this.search = search}/>
 
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1,backgroundColor:'#f8f8ff', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
   
       
        <FlatList
        style={{flex: 1,backgroundColor:'#f8f8ff'}}
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
Search.propTypes={
navigation:PropTypes.func,
}
