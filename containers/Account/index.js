import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import AccountProfile from '../../components/AccountProfile'
import Email from '../../components/Email'
import Rate from '../../components/Rate'
export default class Account extends React.Component {
    static navigationOptions = {
        header: null
    };
    render()
    {
        return(
           <View style={styles.container}>
           <AccountProfile/>
           <Email/>
           <Rate/></View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-around',
        flex:1,
    },
 

})