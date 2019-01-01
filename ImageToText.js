/**
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ImageBackground,
  View,
ScrollView
} from 'react-native';
import * as firebase from 'firebase';
import { Icon } from './node_modules/react-native-elements';
import Dummy from './Assets/Images/Dummy.jpg'
import CardHome from './components/CardHome'
import { receiveDecks } from './actions'
import { getDecks } from './utils/api'
import Swipers from './components/Swiper'
import { connect } from 'react-redux'
let database,Revise,Trending,Popular;
const Button = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableOpacity;
class App extends Component {
  static navigationOptions = {
    header: null
};
  state = { isLoading: false, imgSource: null, ocrResult: null,Trending,TrendingArray:[],Popular,PopularArray:[]};
  async _loadInitialState() { 
    try {
      let value = await getDecks();
      let holdArray = [];
      if (value !== null){
        let val = JSON.parse(value)
        Object.keys(val).map((key) => {
          holdArray.push(val[key]);
        })
        this.props.dispatch(receiveDecks(holdArray));
      } else {
      }
    } catch (error) {
      console.log("error here")
    }
  }
  componentDidMount()
  {
    this._loadInitialState().done();
  }
 async componentWillMount() {
  
    database = firebase.database();
    Revise=database.ref('Revise')
    Trending=Revise.child('Trending')
    try{
    await Trending .once('value').then(snapshot=>{
   this.setState({Trending:snapshot.val()})
   let data=this.state.Trending;
   var quantities = [];
   console.log(snapshot.val(),"val")
   for (var key in data) {
     for (var key2 in data[key]) {
   
   quantities.push({
       source: Dummy,
      title: key2,
       number: data[key][key2].length,
       deck:data[key]

       
   });
  }

   }

   
this.setState({
 TrendingArray:quantities
})
console.log(this.state.TrendingArray)   

   
    })
    console.log(database,Revise,Trending);
  }
  catch(ex)
  {
    console.log('exception',ex);
  }
  Trending=Revise.child('Popular')
  try{
  await Trending .once('value').then(snapshot=>{
 this.setState({Popular:snapshot.val()})
 let data=this.state.Popular;
 var quantities = [];
 for (var key in data) {
   for (var key2 in data[key]) {
 
 quantities.push({
     source: Dummy,
    title: key2,
     number: data[key][key2].length,
     deck:data[key]

     
 });
}

 }

 
this.setState({
PopularArray:quantities
})
console.log(this.state.TrendingArray)   

 
  })
  console.log(database,Revise,Trending);
}
catch(ex)
{
  console.log('exception',ex);
}

  }
  render() {
    return (
      <View style={styles.container}>
     
      <Swipers  text1={"Hello Swiper"} text2={"Beautiful"} text3={"And simple"} />
      <View style={styles.contentContainer}>
      <ScrollView >
      <View>
          <Text style={styles.title}> Popular on Revise</Text>
          <CardHome home={false}  navigation={this.props.navigation} data={this.state.PopularArray}/> 
          <View>
    <Text style={styles.title}> Your Deck</Text>
    { Object.keys(this.props.deckData).length !== 0?
    <CardHome navigation={this.props.navigation} home={true} data={this.props.deckData}/> :<View style={styles.textContainer}><Text style={styles.titleOption}>Please Add Decks By Clicking on</Text><Text style={styles.Plus}>+</Text></View>}

  </View>
  <View>
    <Text style={styles.title}> Trending Now</Text>
    <CardHome  navigation={this.props.navigation} home={false} data={this.state.TrendingArray}/> 
  </View>
  </View>

        
</ScrollView>
</View>
<View style={styles.button}>
          <Button  onPress={() => this.props.navigation.navigate('AddDeck')}	 >
            <View style={[styles.add, styles.imgContainer,styles.round]}>

        <Icon name='add' size={30} color={'white'} />
          </View>
</Button>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height:'100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title:{
    fontFamily: 'Montserrat-Bold',
    fontSize:16,
    color:'#38b4f7',
    backgroundColor:'#f8f8ff'

  },
  card:{
height:150,
width:130,
elevation: 5,
borderWidth: 1,
borderRadius: 10,
borderColor: '#ddd',
borderBottomWidth: 0,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.8,
shadowRadius: 2,

  },
  contentContainer: {
height:'70%',
width:'100%',
  },

  cardText:{
    fontSize:16,
    fontWeight:'700',
  },
  cardContainer:{
   flexDirection:'column' ,
   justifyContent:'flex-start',
   borderRadius: 10,
   margin:10,


  },
  imgContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  img: {
    width: 150,
    height: 150
  },
  add:{
    width: 60,
    height: 60,
    backgroundColor:'#38b4f7',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button:{
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right:20,
    
  },

  round: {
    borderRadius: 75,
  },
  border:{
    width:'100%',
    height:4,
  },
  textContainer:{
    flexDirection:'row',
    backgroundColor:'#38b4f7',
    borderColor: 'white',
    justifyContent:'center',
    alignItems:'center',
    borderWidth: .5,
    textAlign:'center'

  },
  titleOption:{
    fontFamily: 'Montserrat-Bold',
    fontSize:16,
    color:'#fff',
  
  },
 Plus:{
  fontFamily: 'Montserrat-Bold',
   fontSize:28,
   color:'white',
  
 }

});


function mapStateToProps(state) {
  console.log(state,"state")
  return {
    deckData: state.decks.deckData
  }
}
export default connect(mapStateToProps)(App)