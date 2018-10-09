import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import { SearchBar } from 'react-native-elements'
export default class Search extends React.Component {
    static navigationOptions = {
        header: null
    };
    state = { Text:'',Final:''}
    someMethod(e)
    {
       this.setState({Text:e})


    }
    onEnd = () => {
   this.setState({Final:this.state.Text,Text:''})
   this.search.clearText()

      }
    render()
    {
        console.log(this.state)
        return(
            <View>
            <SearchBar
            showLoading
              round
              lightTheme
              cancelButtonTitle="Cancel"
              ref={search => this.search = search}
              platform="android"
              containerStyle={{backgroundColor: '#f1f1f1'}}
              inputStyle={{color: 'black',backgroundColor:'white'}}
            placeholder='Type Here...'
            onChangeText={(e)=>{{this.someMethod(e)}}}
            
            onEndEditing={this.onEnd}
           
            />
            
          
            </View>
        )
    }
}

