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
              <Text style={styles.text}>{this.props.text1}</Text>
            </View>
            {/* <View style={styles.slide2}>
              <Text style={styles.text}>{this.props.text2}</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>{this.props.text3}</Text>
            </View> */}
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
        height:'65%',
        width:'100%',
        flex:1,
   
      }
 })