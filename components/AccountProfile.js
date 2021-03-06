import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import Dummy from '../Assets/Images/Dummy.jpg'
 export default class AccountProfile  extends React.Component {

    render()
    {
        console.log(this.props);
        return(<View style={styles.container}>
      <Image style={styles.imageContainer} source={{uri:this.props.image||Dummy}}/> 
       <View><Text style={styles.text}>{this.props.username||"EXAMPLE TEXT"}</Text></View>
</View>)
    }
 }
 const styles = StyleSheet.create({
     container:{
width:'100%',
height:'40%',
justifyContent:'space-around',
alignItems:'center',
backgroundColor:'#38b4f7',
     },
     imageContainer:{
      width:90,
      height:90,
      borderRadius:45,
         
     },
     text:{
         fontSize:30,
         fontWeight:'bold',
         color:'white'
     }

 })