import React from 'react'
import { StyleSheet, Text, View,  } from 'react-native'
import PropTypes from 'prop-types'
 export default class Email  extends React.Component {
     render()
     {
         return(<View style={styles.container}>
         <View style={styles.group}>
         <Text style={styles.subText}> Email</Text>
<Text style={styles.subText}>{this.props.email ||"XYZ@GMAIL.com"}</Text>

</View>
<View style={styles.group}>
         <Text style={styles.subText}> UserName</Text>
<Text style={styles.subText}>{this.props.username ||"Example Text"}</Text>

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
backgroundColor:'#38b4f7',
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        color:'white'
    },
    group :{
        justifyContent  :'center',
        width:'100%',
        flexDirection:'row',
        
    },
    subText:{
marginHorizontal:10,
fontFamily: 'Montserrat-Bold',
fontSize: 16,
color: 'white',
    },
})
Email.propTypes={
    email:PropTypes.string,
    username:PropTypes.string
}