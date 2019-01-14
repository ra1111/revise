import React from 'react'
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import {Card, Button} from 'react-native-elements'
import CardsContainer from './QuestionContainer'
import Profile from './Profile'
import Answer from './Answer'
import { AddAnswer } from '../actions';

const DATA = [
    {
        id: 1,
        text: 'Kya Haal Hai Sab SHi?',
        uri: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-0.3.5&ixid' +
                '=eyJhcHBfaWQiOjEyMDd9&s=f28261f0564880c9086a57ee87a68887&auto=format&fit=crop&w=' +
                '500&q=60'
    }, {
        id: 2,
        text: 'Card #2',
        uri: 'https://images.unsplash.com/photo-1535576434247-e0f50b766399?ixlib=rb-0.3.5&ixid' +
                '=eyJhcHBfaWQiOjEyMDd9&s=232f6dbab45b3f3a6f97e638c27fded2&auto=format&fit=crop&w=' +
                '500&q=60'
    }, {
        id: 3,
        text: 'Card #3',
        uri: 'https://images.unsplash.com/photo-1535565454739-863432ea3c0e?ixlib=rb-0.3.5&ixid' +
                '=eyJhcHBfaWQiOjEyMDd9&s=7edfb9bc7d214dbf2c920723cb0ffce2&auto=format&fit=crop&w=' +
                '500&q=60'
    }, {
        id: 4,
        text: 'Card #4',
        uri: 'https://images.unsplash.com/photo-1535546204504-586398ee6677?ixlib=rb-0.3.5&ixid' +
                '=eyJhcHBfaWQiOjEyMDd9&s=7320b162b147a94d4c41377d9035e665&auto=format&fit=crop&w=' +
                '500&q=60'
    }, {
        id: 5,
        text: 'Card #5',
        uri: 'https://images.unsplash.com/photo-1535531298052-7457bcdae809?ixlib=rb-0.3.5&ixid' +
                '=eyJhcHBfaWQiOjEyMDd9&s=f15acb2aedb30131bb287589399185a2&auto=format&fit=crop&w=' +
                '500&q=60'
    }, {
        id: 6,
        text: 'Card #6',
        uri: 'https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?ixlib=rb-0.3.5&ixid' +
                '=eyJhcHBfaWQiOjEyMDd9&s=ebe64b284c0ccffbac6a0d7ce2c8d15a&auto=format&fit=crop&w=' +
                '500&q=60'
    }, {
        id: 7,
        text: 'Card #7',
        uri: 'https://images.unsplash.com/photo-1535540707939-6b4813adb681?ixlib=rb-0.3.5&ixid' +
                '=eyJhcHBfaWQiOjEyMDd9&s=ce3177d04728f7d1811e342b47d1e391&auto=format&fit=crop&w=' +
                '500&q=60'
    }, {
        id: 8,
        text: 'Card #8',
        uri: 'https://images.unsplash.com/photo-1535486509975-18366f9825df?ixlib=rb-0.3.5&ixid' +
                '=eyJhcHBfaWQiOjEyMDd9&s=ea59f63a657824d02872bb907fe85e76&auto=format&fit=crop&w=' +
                '500&q=60'
    }
];

 class Qeustion extends React.Component {
 
   showAnswer()
   { console.log('coming here')
       this.props.dispatch(AddAnswer(true))
   }
    renderCard(item) {
 console.log(item,"item")
        return (
            <View style={styles.cardsContainer}  >
                <TouchableOpacity   style={styles.answerNumber}>
                    <Text style={{color:"#38b4f7"}}>{item.answer.length}{"answers"}</Text>
                    </TouchableOpacity>
            <Card key={item.index} containerStyle={styles.card}>
            <View style={styles.cardWrapper}>
                <Text style={styles.questionText}>
                    {item.question.title}
                </Text>
                <View>
                <Profile/>
                {!this.props.answer?
                <Button
                onPress={()=>{this.props.dispatch(AddAnswer(true))}}
                    buttonStyle={styles.answer}
                    iconContainerStyle={{
                    transform: [
                        {
                            rotateY: '180deg'
                        }
                    ]
                }}
                    title="Answer"
                    icon={{
                    name: "chat-bubble",
                    type: ",material-icons",
                    color: 'white'
                }}/>:
                <Answer/>
            }
            </View>
            </View>
            </Card>
            </View>
        );
    }
    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                <CardsContainer data={this.props.questions} props={this.props} renderCard={this.renderCard}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
      
    },
    answer: {
        backgroundColor: '#ff8354',
        marginTop: 20,
     
    },
    questionText: {
        margin: 10,
        fontSize: 39,
        textAlign: 'center',
        color: '#38b4f7'
    },
    cardWrapper:{
        justifyContent:'space-between',
       flex:1,
       minHeight:275,
  
    },

    card: {
        borderRadius: 10,
        flex:1,
        marginTop:30
 
    },
    cardsContainer:{
flex:1,
justifyContent:'space-between'
    },
    answerNumber:{
        alignSelf:'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius:10,
        width:150,
        position: 'absolute',
      
       
    }
});
function mapStateToProps(state) {
    return {answer:state.chat.answer};
}
export default connect(mapStateToProps)(Qeustion);