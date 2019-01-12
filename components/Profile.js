import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {Card, Button} from 'react-native-elements'
export default class Profile extends React.Component {
    render()
    {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.imageContainer}
                    source={{
                    uri: this.props.image || 'https://images.unsplash.com/photo-1535486509975-18366f9825df?ixlib=rb-0.3.5&ixid' +
                            '=eyJhcHBfaWQiOjEyMDd9&s=ea59f63a657824d02872bb907fe85e76&auto=format&fit=crop&w=' +
                            '500&q=60'
                }}/>
                <Text style={styles.name}>{this.props.name || 'random'}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight:10,
    },
    container:{justifyContent:'flex-start',
flexDirection:'row',
margin:10
    },
    name:{
        color:'#38b4f7',
        fontWeight:'500',
        fontSize:17
    }
})