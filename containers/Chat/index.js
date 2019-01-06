import React from 'react'
import { StyleSheet, View,  } from 'react-native'
import { Button, Input,Icon} from 'react-native-elements'
import Question from '../../components/Question'
export default class Chat extends React.Component {
    static navigationOptions = {
        header: null
    };
    render()
    {
        return(
            <View style={styles.container}>
            <View/>
            <Question/>
            <View>
<Button
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
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f8f8f8',
        flex: 1,
        alignItems: 'center',
      margin:10,
    },
    ask:{
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: '#38b4f7',
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

});