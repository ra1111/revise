import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'
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