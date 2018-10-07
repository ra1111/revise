import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
 export default class CardHome extends React.Component {
    render()
    {
        return (
           <View  style={styles.container}> 
        <FlatList
       
        horizontal
     data={this.props.data}
     renderItem={({ item: rowData }) => {
       console.log(rowData)
       return (<View  style={styles.cardContainer}>
            <Image
              resizeMode={'stretch'}
              style={styles.card}
              source={rowData.source}/>

            <Text style={styles.cardText}> {rowData.title} </Text>
            <Text style={styles.cardText}>{rowData.number} </Text>
            
           

             </View>
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