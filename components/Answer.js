import React from 'react'
import {StyleSheet, View, Text, Image,Alert,TextInput} from 'react-native'
import {Card, Button,Icon,Input} from 'react-native-elements'
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import { AddAnswer } from '../actions';

let currentUser;
let database,
    Revise,
    Chats;
  
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
cancelAnswer()
{
    Alert.alert('Discard Answer',"Discarded answers can't be recovered.",[{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () =>this.props.dispatch(AddAnswer(false))}],{ cancelable: false })
}
async  submitAnswer()
     {     const  user = firebase
        .auth()
        .currentUser;
          let OldChat=[]
       
         currentUser={image:user.photoURL,name:user.displayName}
        let title=this.state.query
        let answer={user:currentUser,title:title,upvote:0,downvote:0}
        database = firebase.database();
  Revise = database.ref('Revise')
   Chats = Revise.child('Chat')
 if(  this.state.query.trim() == "")
 {
     Alert.alert("Response not found","Please eneter a response before submitting")

 }
 else{
   try{
    await  Chats
    .once('value')
    .then(snapshot => {

          (snapshot.val()).forEach(element => {
              OldChat.push(element)
          });
        

    })
    let question=this.props.question

    OldChat.forEach(element=>{
if(element.question.title===question)
{if(element.answer)
    {
        console.log(element,"element")
    element.answer.push(answer)
}
else{
    
    element['answer']=[]
    element.answer.push(answer)

}
}
    });

    var timestamp = (new Date()).getTime();
 console.log(OldChat)
   firebase.database().ref('Revise').child('Chat').set(OldChat)

}
   catch(ex)
   {
       console.log(ex,"ex")
   }
         Alert.alert(this.state.query)
         this.props.dispatch(AddAnswer(false))

     }
    }
    render(){
        return(<View style={styles.container}>
            <Image  style={styles.imageContainer}
                    source={{
                    uri: firebase
                    .auth()
                    .currentUser.photoURL|| 'https://images.unsplash.com/photo-1535486509975-18366f9825df?ixlib=rb-0.3.5&ixid' +
                            '=eyJhcHBfaWQiOjEyMDd9&s=ea59f63a657824d02872bb907fe85e76&auto=format&fit=crop&w=' +
                            '500&q=60'
                }}/>
            <TextInput multiline = {true} placeholder="Answer..." style={{width:'100%',color:"white", fontSize:18,height: 150}}   editable = {true} placeholderTextColor="white" onChangeText={this.handleQuery}/> 
            <View style={{justifyContent:'space-around',width:'100%',flexDirection:'row'}}>
            <Icon containerStyle={{marginRight:10}} name="cancel" color="white" type="material-icons"  onPress={()=>this.cancelAnswer()}  size={30}/>
            <Icon containerStyle={{marginRight:10}} name="send" color="white" type="material-icons"  onPress={()=>this.submitAnswer()}  size={30}/>
            </View>
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
flexDirection:'column',
marginTop: 20,

flex:1,

backgroundColor: '#ff8354',
    },
})
function mapStateToProps(state) {
    return {answer:state.chat.answer};
}
//make this component available to the app

export default connect(mapStateToProps)(Answer);