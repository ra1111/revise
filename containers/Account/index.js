import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import AccountProfile from '../../components/AccountProfile'
export default class Account extends React.Component {
    static navigationOptions = {
        header: null
    };
    render()
    {
        return(
           <View><AccountProfile/></View>
        )
    }
}

