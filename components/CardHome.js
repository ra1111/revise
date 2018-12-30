import React from 'react'
import { StyleSheet, Text, View, FlatList,Image,BackgroundImage,TouchableOpacity } from 'react-native'
import { Button, Icon } from '../node_modules/react-native-elements';
import Dummy from '../Assets/Images/Dummy.jpg'
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
       contentContainerStyle={styles.row}
        horizontal
     data={this.props.data?this.props.data:this.props.homedata}
     renderItem={({ item: rowData }) => {
       console.log(rowData.number,'rowdta')
       return (<TouchableOpacity  onPress={()=>{this.deck(rowData)}} style={styles.cardContainer}>
       <View style={styles.card} elevation={3}>
            <Image
              resizeMode={'contain'}
              style={styles.cardImage}
              source={rowData.source?rowData.source:Dummy}/>
</View>
            <Text style={styles.cardText}> {rowData.title} </Text>
            <View style={styles.deckNumber}>
            <Icon name="cards" color="#38b4f7" type="material-community"/>
            <Text style={styles.cardText}>{rowData.number||rowData.questions.length||1} </Text>
            
            </View>
            
           

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
        height:120,
        width:100,
        borderWidth: 1,
        borderRadius: 8,
       borderColor: '#fff',
        alignItems:'center',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        
          },
          deckNumber:{
flexDirection:'row',
justifyContent:'space-around'
          },
          container:{
            backgroundColor:'white',
   flex:1,
          },
          cardImage:{
            height:115,
            backgroundColor:'#38b4f7',
            width:90,
          },
          row:{
            marginHorizontal:10,
justifyContent:'space-between',

          },
          cardText:{
            fontSize:16,
            fontWeight:'700',
            margin:3,
            color:'#38b4f7',
          },
          cardContainer:{
           flexDirection:'column' ,
           justifyContent:'flex-start',
           alignItems:'center',
           borderRadius: 20,
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