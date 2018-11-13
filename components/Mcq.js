import React from 'react'
import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity,Vibration } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Card, Button, Icon } from 'react-native-elements'
export default class Mcq extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            question:'',
            answer:'',
            option1:'',
            option2:'',
            correct:''
        }
    }
componentWillMount()
    {
        let questions=this.props.deck;
        let index=this.props.counter-1;
        let min =this.props.min;
        var arr = []
        while(arr.length < 3){
            var randomnumber = Math.floor(Math.random() * (index - min + 1)) + min;
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
       let question=questions[arr[0]].question
       let answer=questions[arr[0]].answer[0]

let option1=questions[arr[1]].answer[0]
let option2=questions[arr[2]].answer[0]
this.setState({correct:answer})
if(randomnumber%3===0)
{
this.setState({question:question,answer:answer,option1:option1,option2:option2})

    }
    else  if(randomnumber%3===1)
    {
        this.setState({question:question,answer:option1,option1:answer,option2:option2})
    }
    else{
        this.setState({question:question,answer:option2,option1:option1,option2:answer})
    }
}
correct()
{
    console.log('correct')
    //Celebration ADD


}
wrong()
{
    this.refs.view.flash(900)
    Vibration.vibrate(600)
console.log('wrong')
}
    render()
    { 
      
        return (
            <View style={styles.container}> 
			<Card
            containerStyle={styles.card}
		
		>
			<View>
                <Text>{this.state.question||"this is the question"}</Text>
                  
                </View>
		</Card>
        <Animatable.View ref="view" style={styles.optionsContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>{this.state.answer===this.state.correct?this.props.correct():this.wrong()}}><Text style={styles.options}>{this.state.answer||"first option"}</Text></TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={()=>{this.state.option2===this.state.correct?this.props.correct():this.wrong()}}><Text  style={styles.options}>{this.state.option2||"second option"}</Text></TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={()=>{this.state.option1===this.state.correct?this.props.correct():this.wrong()}}><Text  style={styles.options}>{this.state.option1||"third option"}</Text></TouchableOpacity> 
        </Animatable.View>
        </View>
  	)
  }

    }
    const styles = StyleSheet.create({
        container:{
            justifyContent:'space-around',
            flex:1,
        },
        card:{
            borderRadius:20,
            height:'50%',
            alignItems:'center',

justifyContent:'center'
        },
        optionsContainer:{
justifyContent:'space-around',
alignItems:'center',
flex:1,
        },
        options:{
color:'#38b4f7',

        },
        button: {
            borderWidth: .5,
         padding:20,
         width:330,
         borderRadius:10,
         alignItems:'center',

justifyContent:'center',
         backgroundColor:'white',

            borderColor: '#38b4f7'
         }
     
    
    })
    
