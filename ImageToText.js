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
import ImagePicker from 'react-native-image-picker';
import * as firebase from 'firebase';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import { Icon } from './node_modules/react-native-elements';
import Dummy from './Assets/Images/Dummy.jpg'
import CardHome from './components/CardHome'
import Swipers from './components/Swiper'
import { connect } from 'react-redux'
let database,Revise,Trending;
const data=[{source:Dummy,title:'title of Deck',number:29},{source:Dummy,title:'title of Deck',number:29},{source:Dummy,title:'title of Deck',number:29},{source:Dummy,title:'title of Deck',number:29},{source:Dummy,title:'title of Deck',number:29}]
const Button = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableOpacity;
const options = {
  quality: 1.0,
  storageOptions: {
    skipBackup: true
  }
};
const tessOptions = {
  whitelist: null,
  blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};


class App extends Component {
  static navigationOptions = {
    header: null
};
  state = { isLoading: false, imgSource: null, ocrResult: null,data:data ,Trending,TrendingArray:[]};

  selectPhoto() {
    this.setState({ isLoading: true });
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error) {
        console.log(response);
        this.setState({ isLoading: false });
      } else {
        let source = (Platform.OS === 'android') ? { uri: response.uri, isStatic: true } : { uri: response.uri.replace('file://', ''), isStatic: true };
        this.setState({ imgSource: source }, this.doOcr(response.path));
      }
    });
  }

  doOcr(path) {
    RNTesseractOcr.recognize(path, 'LANG_ENGLISH', tessOptions)
      .then((result) => {
        this.setState({ isLoading: false, ocrResult: result });
        console.log('OCR Result: ', result);
      })
      .catch((err) => {
        console.log('OCR Error: ', err);
      })
      .done();
  }

  cancelOcr() {
    RNTesseractOcr.stop()
      .then((result) => {
        console.log('OCR Cancellation Result: ', result);
      })
      .catch((err) => {
        console.log('OCR Cancellation Error: ', err);
      })
      .done();
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

  }
  render() {
    return (
      <View style={styles.container}>
     
      <Swipers text1={"Hello Swiper"} text2={"Beautiful"} text3={"And simple"} />
      <View style={styles.contentContainer}>
      <ScrollView >
      <View>
          <Text> Popular on Revise</Text>
          <CardHome  navigation={this.props.navigation} data={data}/> 
          <View>
    <Text> Your Deck</Text>
    { Object.keys(this.props.deckData).length !== 0?
    <CardHome navigation={this.props.navigation} data={this.props.deckData}/> :<Text> Please Add Decks By Clicking on "+"</Text>}

  </View>
  <View>
    <Text> Trending Now</Text>
    <CardHome  navigation={this.props.navigation} data={this.state.TrendingArray}/> 
  </View>
  </View>

        
</ScrollView>
</View>
<View style={styles.button}>
          <Button onPress={()=>{this.props.navigation.navigate('MainDeck')}} 		 >
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
marginTop:'50%',
height:'80%',
alignItems: 'center',
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
  
 

});


function mapStateToProps(state) {
  console.log(state)
  return {
    deckData: state.decks.deckData
  }
}
export default connect(mapStateToProps)(App)