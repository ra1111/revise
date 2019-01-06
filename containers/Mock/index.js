import React from 'react'
import { StyleSheet, View,Dimensions  } from 'react-native'
import Pdf from 'react-native-pdf';

export default class Mock extends React.Component {

    static navigationOptions = {
        header: null
    };

   
    render()
    {
        const source = {uri:'https://firebasestorage.googleapis.com/v0/b/elitmus-daf04.appspot.com/o/Elitmus.pdf?alt=media&token=e63c9ecd-64c8-4759-94bb-2eec525ba8ba',cache:true};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};
 
        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,..."};
 
        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
            </View>
        )
  }
    }
    const styles = StyleSheet.create({
        container: {
            backgroundColor:'#f8f8f8',
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          margin:10,
        },
        pdf: {
            flex:1,
            width:Dimensions.get('window').width,
        }
    });
