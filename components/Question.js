import React from 'react'
import {StyleSheet, View, Text,TouchableOpacity,FlatList,ScrollView,KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux';
import {Card, Button,ListItem, Icon} from 'react-native-elements'
import CardsContainer from './QuestionContainer'
import Profile from './Profile'
import Answer from './Answer'
import { AddAnswer,showAnswer } from '../actions';


 class Qeustion extends React.Component {
 
   renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

    renderCard(item) {
 console.log(item,"item")
if(this.props.showAnswer)
{
    return(
        <View style={styles.viewContainer}>
      <Icon
  raised
  containerStyle={styles.close}
  name='close'
  size={19}
  type='font-awesome'
  color='#38b4f7'
  onPress={()=>this.props.dispatch(showAnswer(false))}
  />
                <Text style={styles.questionText}>
                    {item.question.title}
                </Text>
            
                <Profile name={item.question.user.name} image={item.question.user.image}/>
                <ScrollView keyboardShouldPersistTap={"always"}
>
                <FlatList
        style={{flex:1,backgroundColor:'#f8f8ff'}}
          data={item.answer}
          ItemSeparatorComponent={() => (
            <View     style={{
                height: 1,
                width: '86%',
                backgroundColor: '#CED0CE',
                marginLeft: '14%',
              }} />
          )}
         
         renderItem={({ item }) => (
           <ListItem
             roundAvatar
               title={item.title}
               leftAvatar={{ source: { uri: item.user.image||'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
               subtitle={item.user.name}
             
               keyExtractor={item => item.key}
               />
         )}/>
         </ScrollView>
        

        </View>)


}
else{
        return (
            <View style={styles.cardsContainer}  >
            
            {item.answer&&
                <TouchableOpacity onPress={()=>{this.props.dispatch(showAnswer(true))}}  style={styles.answerNumber}>
                    <Text style={{color:"#38b4f7"}}>{item.answer.length}{"answers"}</Text>
                    </TouchableOpacity>
            }
            <Card key={item.index} containerStyle={styles.card}>
  
                {!this.props.answer?
                          <View style={styles.cardWrapper}>
                          <Text           minimumFontScale={.5}  allowFontScaling
            style={styles.questionText}>
                              {item.question.title}
                          </Text>
                          <View>
                          <Profile name={item.question.user.name} image={item.question.user.image}/>
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
                }}/>
                      </View>
                        </View>:
                        <View style={styles.answerWrapper}>
                <Answer  question={item.question.title} />
                </View>
            }
      
          
            </Card>
            </View>
        );
    }
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
    viewContainer:{
flex:1,
//alignSelf:'center',
minHeight:450,
minWidth:350,
backgroundColor:'white',
justifyContent:'space-between'

    },
    answer: {
        backgroundColor: '#ff8354',
        marginTop: 20,
     
    },
    questionText: {
        margin: 10,
        height:150,
        fontSize:25,
        textAlign: 'center',
        color: '#38b4f7'
    },
    answerWrapper:{
minHeight:150,
justifyContent:'center'
    },

    cardWrapper:{
        justifyContent:'space-between',
       flex:1,
       minHeight:275,
       maxHeight:300,
  
    },

    card: {
        borderRadius: 10,
        flex:1,
        marginTop:30,
       
 
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
    return {answer:state.chat.answer,
    showAnswer:state.chat.showAnswer};
}
export default connect(mapStateToProps)(Qeustion);