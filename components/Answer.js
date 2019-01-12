import React from 'react'
import {StyleSheet, View, Text, Image,Alert} from 'react-native'
import {Card, Button,Icon,Input} from 'react-native-elements'
import {connect} from 'react-redux';
import { AddAnswer } from '../actions';
 class Answer extends React.Component {
    state={
        query:''
    }
handleQuery=(query)=>
{
this.setState({
   query:query
})

}
     submitAnswer()
     {
         Alert.alert(this.state.query)
         this.props.dispatch(AddAnswer(false))

     }
    render(){
        return(<View style={styles.container}>
            <Image  style={styles.imageContainer}
                    source={{
                    uri: this.props.image || 'https://images.unsplash.com/photo-1535486509975-18366f9825df?ixlib=rb-0.3.5&ixid' +
                            '=eyJhcHBfaWQiOjEyMDd9&s=ea59f63a657824d02872bb907fe85e76&auto=format&fit=crop&w=' +
                            '500&q=60'
                }}/>
            <Input placeholder="Answer..." containerStyle={{width:'70%'}} placeholderTextColor="white" onChangeText={this.handleQuery}/> 
            <Icon containerStyle={{marginRight:10}} name="send" color="white" type="material-icons"  onPress={()=>this.submitAnswer()}  size={30}/>
            </View>)
    }
}
const styles = StyleSheet.create({
    imageContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight:10,
        marginLeft:10,
    },
    container:{justifyContent:'center',
    alignItems:'center',
flexDirection:'row',
marginTop: 20,

height:38,
width:'100%',
backgroundColor: '#ff8354',
    },
})
function mapStateToProps(state) {
    return {answer:state.chat.answer};
}
//make this component available to the app

export default connect(mapStateToProps)(Answer);