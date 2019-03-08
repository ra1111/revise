import React from 'react'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import Swiper from 'react-native-swiper';
 export default class Swipers extends React.Component {
     render()
     {
         return(
            <View style={styles.wrapper}>
            <Swiper  autoplay={true} autoplayTimeout={2.5}>
            <View style={styles.slide1}>
             {this.props.text1}
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>{this.props.text2}</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>{this.props.text3}</Text>
            </View>
          </Swiper>
              </View>
         )
     }
 }
 const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38b4f7',
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38b4f7',
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38b4f7',
      },
      text: {
        color: 'white',
        fontSize: 30,
        fontFamily:'Montserrat-Bold',
      },
      wrapper:{
        height:'65%',
        width:'100%',
        flex:1,
   
      }
 })