import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'
export default  class Rate extends React.Component{
render()
{
return(<View style={styles.container}>
    <Text style={styles.name}>Rate us!</Text>
    </View>)
}

}
const styles = StyleSheet.create({
    container:{
width:'100%',
height:'10%',
justifyContent:'space-around',
alignItems:'center',
backgroundColor:'#38b4f7',
    },
    name:{
        color:'white',
        fontWeight:'500',
        fontSize:17
    }})