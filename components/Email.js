import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import Dummy from '../Assets/Images/Dummy.jpg'
 export default class Email  extends React.Component {
     render()
     {
         return(<View style={styles.container}>
         <View style={styles.group}>
         <Text> Email</Text>
<Text>{this.props.email ||"XYZ@GMAIL.com"}</Text>

</View>
<View style={styles.group}>
         <Text> UserName</Text>
<Text>{this.props.username ||"Example Text"}</Text>

</View>
         </View>)
     }
 }
 const styles = StyleSheet.create({
    container:{
width:'100%',
height:'30%',
justifyContent:'space-around',
alignItems:'center',
backgroundColor:'white',
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        color:'black'
    },
    group :{
        justifyContent  :'space-around',
        width:'100%',
        flexDirection:'row',
    }
})