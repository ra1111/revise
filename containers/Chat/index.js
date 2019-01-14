import React from 'react'
import {connect} from 'react-redux';
import { StyleSheet, View } from 'react-native'
import { Button, Input,Icon} from 'react-native-elements'
import * as firebase from 'firebase';
import Question from '../../components/Question'
import Modal from '../../components/QuestionModal'
let database,
    Revise,
    Chats;
 class Chat extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props)
    { super(props)
        this.hideModal=this.hideModal.bind(this)
    this.state = {
        modalVisible: false,
        Chats:[],
      };
    }
    async UNSAFE_componentWillMount() {

        database = firebase.database();
        Revise = database.ref('Revise')
        Chats = Revise.child('Chat')
        console.log(Chats,"Chat")
        try {
            await Chats
                .once('value')
                .then(snapshot => {
                    this.setState({
                        Chats: snapshot.val()
                    })

                })
   
            
            }
            catch(ex)
            {
                console.log(ex,"exception")
            }
    }
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      hideModal()
      {
        this.setState({modalVisible: false});
      }

    render()
    {
        return(
            <View style={styles.container}>
       
              
            <Question questions={this.state.Chats}/>
            {this.state.modalVisible&&
            <Modal modalVisible={this.state.modalVisible} hide={this.hideModal}/>
            }
 {!this.props.answer&&           <View>
<Button
onPress={()=>this.setModalVisible(true)}
title="ASK A QUESTION"
 icon={
    <Icon
      name='question-circle'
      type='font-awesome'
      size={15}
      color='white'
    />
  }
  iconRight
  buttonStyle={styles.ask}/>
  
                </View>
 }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#38b4f7',
        flex: 1,
     
    },
    ask:{
        alignSelf: 'center',
        backgroundColor: '#00dec2',
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

});
function mapStateToProps(state) {
    return {answer:state.chat.answer};
}
//make this component available to the app

export default connect(mapStateToProps)(Chat);