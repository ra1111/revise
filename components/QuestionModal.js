import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet,Alert} from 'react-native';
import { Button ,Input,Icon} from '../node_modules/react-native-elements';

 export default class ModalExample extends Component {


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
inputStyle={styles.question}/>
              <Button
              title="Post Now"
              style={styles.ask}
              icon={{name:"send", type:"material-community",color:"white"}}
              iconRight={true}
                onPress={this.props.hide}/>
                
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
       
   
        backgroundColor: '#38b4f7',
        width: 300,
        height: 125,
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