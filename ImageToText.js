/**
 * Sample React Native Tesseract OCR App
 * https://github.com/jonathanpalma/react-native-tesseract-ocr
 * @author  Jonathan Palma <tanpalma04@gmail.com>
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
  View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import { Icon } from './node_modules/react-native-elements';
import Swiper from 'react-native-swiper';
import Dummy from './Assets/Images/Dummy.jpg'

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
  state = { isLoading: false, imgSource: null, ocrResult: null };

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

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
      {/* <View>
        <Button onPress={this.selectPhoto.bind(this)} >
          <View style={[styles.img, styles.imgContainer, this.state.imgSource === null && styles.round]}>
            {this.state.imgSource === null ?
              <Text>Click a snap</Text>
              :
              <Image style={styles.img} source={this.state.imgSource} />
            }
          </View>
        </Button>

        {(this.state.isLoading) ?
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
          />
          :
          null
        }
        <Text>{this.state.ocrResult}</Text>

        <Button onPress={() => { this.cancelOcr(); }} >
          <View style={[styles.img]}>
            <Text>Cancel recognition</Text>
          </View>
        </Button>
        </View> */}

        <View style={styles.border}/>
        <View style={styles.wrapper}>
        <Swiper  autoplay={true} autoplayTimeout={2.5}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
          </View>
          <Text> Popular on Revise</Text>
          <View  style={styles.cardContainer}>
            <Image
              resizeMode='stretch' 
              style={styles.card}
              source={Dummy}/>

            <Text style={styles.cardText}> Titile of Deck </Text>
            <Text style={styles.cardText}>Number of Cards </Text>
            
           

             </View>
          <View>
    <Text> Your Deck</Text>
  </View>
  <View>
    <Text> Trending Now</Text>
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
    flex: 1,
    justifyContent: 'center',
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
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  wrapper:{
    height:'35%',
    width:'100%',
    position:'absolute',
    top:0,
  }

});

export default App;