import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import AccountProfile from '../../components/AccountProfile'
import Email from '../../components/Email'
import Rate from '../../components/Rate'
let user;
export default class Account extends React.Component {
    static navigationOptions = {
        header: null
    };
    componentWillMount()
    {user=this.props.navigation.getParam('currentUser', 'some title');

    }
    render()
    {
        return(
           <View style={styles.container}>
           <AccountProfile image={user.user.photoURL} username={user.user.displayName}/>
           <Email email={user.user.email} username={user.user.displayName}/>
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