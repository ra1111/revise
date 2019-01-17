import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet,Alert} from 'react-native';
import { Button ,Input,Icon, Tile} from '../node_modules/react-native-elements';
import * as firebase from 'firebase';
import Chat from '../containers/Chat';
let database,
    Revise,
    Chats;
    let OldChat=[]
 export default class ModalExample extends Component {
     state={
         query:'',
         Chats:[]
     }
handleQuery=(query)=>
{
this.setState({
    query:query
})

}
//ONly 1 array getting 
 async submitQuery(){
    const user = firebase
    .auth()
    .currentUser;
    let currentUser={image:user.photoURL,name:user.displayName}
    console.log(currentUser,"Current User")
database = firebase.database();
  Revise = database.ref('Revise')
   Chats = Revise.child('Chat')

try{
  await  Chats
    .once('value')
    .then(snapshot => {

          (snapshot.val()).forEach(element => {
              
              OldChat.push(element)
          });
        

    })
   
    
  let  newQuestion={title:this.state.query,user:currentUser}
    let newChat={answer:[],question:newQuestion}
    console.log(OldChat,"CHAT")
OldChat.push(newChat)

firebase.database().ref('Revise').child('Chat').set(OldChat)
console.log(OldChat,"CHAT")

}
catch(ex)
{
    console.log(ex,'exception')
}
Alert.alert(this.state.query)

}

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
          console.log('request close')
          }}>
          <View style={styles.container}>

          <Icon
  raised
  containerStyle={styles.close}
  name='close'
  size={19}
  type='font-awesome'
  color='#38b4f7'
  onPress={()=>{Alert.alert('Discard question?',"Discarded questions can't be recovered.",
  [{text:'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  {text: 'OK', onPress: this.props.hide}],{ cancelable: true })}} />
  <View style={styles.wrapper}>
           <Input
           placeholder="Ask a question..."
placeholderTextColor="white"
selectionColor="white"
containerStyle={styles.input}
inputContainerStyle={styles.input}
onChangeText={this.handleQuery}
inputStyle={styles.question}/>
              <Button
              title="Post Now"
              buttonStyle={styles.ask}
              icon={{name:"send", type:"material-community",color:"white"}}
              iconRight={true}
              onPressIn={this.props.hide}
                onPress={()=>{this.submitQuery()}}/>
                
  </View>
           
          </View>
        </Modal>

      </View>
    );
  }
}const styles = StyleSheet.create({
    container: {
        backgroundColor:'#38b4f7',
        flex: 1,
        
        alignItems: 'center',
        borderRadius:20,
      margin:10,
    },
    ask:{
       
   
        backgroundColor: 'green',
        width: 300,
        height:50,
        margin:10,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    wrapper:{
flex:1,
justifyContent:'space-between'
    },
    question:{
fontSize:28,
color:'white',
height:'100%'


    },
    input: {
        width: '90%',
        marginTop:20,
       
    },
    close:{
alignSelf:'flex-start'
    },

});