import React from 'react'
import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity } from 'react-native'
import { Button } from '../node_modules/react-native-elements';
import { connect } from 'react-redux'
let questions,title;

 class CardHome extends React.Component {
deck(data)
{
 
  if( this.props.home)
  {
      
    this.props.navigation.navigate('MainDeck')
  }

  else
  {
let title=data.title;
let deck=data.deck;
let questions=[];

for (var key in deck) {
//Multiple deck problem resolved using if
  if(key===title)
  {
  for(var key1 in deck[key])
  {
 console.log(deck[key][key1],"HDWWHUDhu")
 let question=deck[key][key1].question
 //use logic to seperate into answers
 let answer=[]
 answer.push(deck[key][key1].answer)
questions.push({question:question,answer:answer})
  }
}
  

}
let deckData={title:title,questions:questions}
//this.props.navigation.navigate('Mcq')
this.props.navigation.navigate('DeckDetail',
              {deckData: deckData})
  }
}
    render()
    {
        return (
           <View  style={styles.container}> 
        <FlatList
       
        horizontal
     data={this.props.data?this.props.data:this.props.homedata}
     renderItem={({ item: rowData }) => {
       return (<TouchableOpacity  onPress={()=>{this.deck(rowData)}} style={styles.cardContainer}>
            <Image
              resizeMode={'stretch'}
              style={styles.card}
              source={rowData.source}/>

            <Text style={styles.cardText}> {rowData.title} </Text>
            <Text style={styles.cardText}>{rowData.number||1} </Text>
            
           

             </TouchableOpacity>
           )
        }}
        keyExtractor={(item, index) => index}
        />
        </View>
    )
    }
}
const styles = StyleSheet.create({
    card:{
        height:130,
        width:110,
        elevation: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        
          },
          container:{
            backgroundColor:'#fff',
            height:190
          },
          cardText:{
            fontSize:16,
            fontWeight:'700',
          },
          cardContainer:{
           flexDirection:'column' ,
           justifyContent:'flex-start',
           borderRadius: 10,
           margin:10,
        
        
          },
})
function mapStateToProps(state) {
  console.log(state)
  return {
    deckData: state.decks.deckData
  }
}
export default connect(mapStateToProps)(CardHome)