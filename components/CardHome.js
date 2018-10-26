import React from 'react'
import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity } from 'react-native'
import { Button } from '../node_modules/react-native-elements';
import { connect } from 'react-redux'
 class CardHome extends React.Component {
    render()
    {
        return (
           <View  style={styles.container}> 
        <FlatList
       
        horizontal
     data={this.props.data}
     renderItem={({ item: rowData }) => {
       console.log(rowData,"ROW DATAT")
       return (<TouchableOpacity  onPress={()=>{alert("YOu Pressed")}} style={styles.cardContainer}>
            <Image
              resizeMode={'stretch'}
              style={styles.card}
              source={rowData.source}/>

            <Text style={styles.cardText}> {rowData.title} </Text>
            <Text style={styles.cardText}>{rowData.questions?rowData.questions.length:1} </Text>
            
           

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