import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import Dummy from '../Assets/Images/Dummy.jpg'
export default  class Rate extends React.Component{
render()
{
return(<View style={styles.container}>
    <Text>Rate us!</Text>
    </View>)
}

}
const styles = StyleSheet.create({
    container:{
width:'100%',
height:'10%',
justifyContent:'space-around',
alignItems:'center',
backgroundColor:'white',
    },})