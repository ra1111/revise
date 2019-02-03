import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    Platform,
    TouchableOpacity,
    Text
} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation-locker';
import * as RNIap from 'react-native-iap';
const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

const itemSkus = Platform.select({
    ios: [
      'com.cooni.point1000', 'com.cooni.point5000', // dooboolab
    ],
    android: [
      'revise', // subscription
    ],
  });
export default class PDFExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            scale: 1,
            numberOfPages: 0,
            productList: [],
            receipt: '',
            modalVisible: false, 

            availableItemsMessage: '',
            purchased:false,
            horizontal: false,
            width: WIN_WIDTH
        };
        this.pdf = null;
    }
    onClose = () => this.setState({ modalVisible: false});

    buyItem = async(sku) => {
        console.log('coming here')
        try {
          console.log('buyItem: ' + sku);
          // const purchase = await RNIap.buyProduct(sku);
          // const products = await RNIap.buySubscription(sku);
          const purchase = await RNIap.buyProductWithoutFinishTransaction(sku);
          this.setState({purchased:true,isVisible:false})
          console.log(purchase);
        } catch (err) {
            this.setState({purchased:false})
            if(err.code==="E_ALREADY_OWNED")
            {
          this.setState({isVisible:false})
            }
          console.log(err.code, err.message,"error ocuured");

        }
      }
      async componentDidMount() {

        Orientation.addOrientationListener(this._onOrientationDidChange);
        console.log(itemSkus);
        try {
        console.log(RNIap,"rniap")
        await RNIap.prepare() // the app hangs here and nothing happnes on Android
        this.getItems(); // never get called
        }
        catch (err) {
          console.warn(err.code, err.message);
        }
      }
      componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
      RNIap.endConnection();
      this.setState({isVisible:false})
      }
      
      getAvailablePurchases = async() => {
      try {
      
        console.info('Get available purchases (non-consumable or unconsumed consumable)');
        const purchases = await RNIap.getAvailablePurchases();
        console.info('Available purchases :: ', purchases,purchases.length);
        if (purchases && purchases.length > 0) {
          this.setState({
            availableItemsMessage: `Got ${purchases.length} items.`,
            receipt: purchases[0].transactionReceipt,
            purchased:true,
          });
        }
      
      } catch (err) {
        console.warn(err.code, err.message);
      }
      
      }
      getItems = async() => {
      try {
        const products = await RNIap.getProducts(itemSkus);
        // const products = await RNIap.getSubscriptions(itemSkus);
        console.log('Products', products);
        this.setState({ productList: products });
        this.getAvailablePurchases()
      } catch (err) {
        console.warn(err.code, err.message);
      }
      }

    _onOrientationDidChange = (orientation) => {
        if (orientation == 'LANDSCAPE-LEFT'||orientation == 'LANDSCAPE-RIGHT') {
          this.setState({width:WIN_HEIGHT>WIN_HEIGHT?WIN_HEIGHT:WIN_WIDTH,horizontal:true});
        } else {
          this.setState({width:WIN_HEIGHT>WIN_HEIGHT?WIN_HEIGHT:WIN_WIDTH,horizontal:false});
        }
    };



    prePage = () => {
        let prePage = this.state.page > 1 ? this.state.page - 1 : 1;
        this.setState({page: prePage});
        console.log(`prePage: ${prePage}`);
    };

    nextPage = () => {
        let nextPage = this.state.page + 1 > this.state.numberOfPages ? this.state.numberOfPages : this.state.page + 1;
        this.setState({page: nextPage});
        console.log(`nextPage: ${nextPage}`);
    };

    zoomOut = () => {
        let scale = this.state.scale > 1 ? this.state.scale / 1.2 : 1;
        this.setState({scale: scale});
        console.log(`zoomOut scale: ${scale}`);
    };

    zoomIn = () => {
        let scale = this.state.scale * 1.2;
        scale = scale > 3 ? 3 : scale;
        this.setState({scale: scale});
        console.log(`zoomIn scale: ${scale}`);
    };

    switchHorizontal = () => {
        this.setState({horizontal: !this.state.horizontal, page: this.state.page});
    };
    onPageChanged = (currentPageShow) => {
		console.log('******** page change: ' + currentPageShow)
this.state.page=currentPageShow
if(!this.state.purchased&&currentPageShow>3)
{
    this.setState({isVisible:true})
}
    }
    back()
    {
        this.setState({isVisible:false});
        this.props.navigation.navigate('Home')
    }
    onClose = () => this.setState({ modalVisible: false});

    render() {
      
        const source = {uri:'https://firebasestorage.googleapis.com/v0/b/elitmus-daf04.appspot.com/o/Elitmus.pdf?alt=media&token=e63c9ecd-64c8-4759-94bb-2eec525ba8ba',cache:true};
 
        return (
            <View style={styles.container}>
                             <Overlay   childrenWrapperStyle={{backgroundColor:"#38b4f7"}}	 containerStyle={styles.Overlay} visible={this.state.isVisible} onClose={this.onClose} >
                             <Text style={styles.mainText}> Unlock Your 99% Now</Text>
                <View style={{justifyContent:'space-evenly',flex:1,alignItems:'center'}}>
                <Text style={styles.subText}> 1) Get Mocks  </Text>
                <Text style={styles.subText}> 2) Ask Doubts</Text>
                 <Text  style={styles.subText}> 3) Unlock All Tips and Questions</Text>
                 </View>

                    <TouchableOpacity style={styles.button}  onPress={()=>this.buyItem('revise')}>
                    <Text style={{color:'white',fontSize:18,fontWeight:"500"}}> Unlock All the Features Now!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1}  onPress={()=>this.back()}>
                    <Text style={{color:'white',fontSize:18,fontWeight:"500"}}> Go Back</Text>
                    </TouchableOpacity>
</Overlay>
                <View style={{flexDirection: 'row', width:'100%',paddingHorizontal:4,backgroundColor:"#38b4f7",justifyContent:'space-between'}}>
                    <TouchableHighlight disabled={this.state.page === 1}
                                        style={this.state.page === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.prePage()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.subText}>{this.state.page}</Text></View>
                    <TouchableHighlight disabled={this.state.page === this.state.numberOfPages}
                                        style={this.state.page === this.state.numberOfPages ? styles.btnDisable : styles.btn}
                                        onPress={() => this.nextPage()}>
                        <Text style={styles.btnText}>{'+'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.scale === 1}
                                        style={this.state.scale === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomOut()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.subText}>Scale</Text></View>
                    <TouchableHighlight disabled={this.state.scale >= 3}
                                        style={this.state.scale >= 3 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomIn()}>
                        <Text style={styles.btnText}>{'+'}</Text>
                    </TouchableHighlight>
                    <View style={styles.subText}><Text style={styles.subText}>{'Horizontal:'}</Text></View>
                    <TouchableHighlight style={styles.btn} onPress={() => this.switchHorizontal()}>
                        {!this.state.horizontal ? (<Text style={styles.btnText}>{'No'}</Text>) : (
                            <Text style={styles.btnText}>{'Yes'}</Text>)}
                    </TouchableHighlight>

                </View>
                <View style={{flex:1,width: this.state.width}}>

               
                
                    <Pdf ref={(pdf) => {
                        this.pdf = pdf;
                    }}
                    enablePaging={true}
                    spacing={10}
                         source={source}
                         page={this.state.page}
                         scale={this.state.scale}
                         horizontal={this.state.horizontal}
                         onLoadComplete={(numberOfPages, filePath,{width,height},tableContents) => {
                             this.state.numberOfPages = numberOfPages; //do not use setState, it will cause re-render
                             console.log(`total page count: ${numberOfPages}`);
                             console.log(tableContents);
                         }}
                         onPageChanged= {this.onPageChanged}
                        
                         onError={(error) => {
                             console.log(error);
                         }}
                         style={{flex:1}}
                         />
                        
                </View>
                        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      //  backgroundColor:"#38b4f7",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
    },
    btn: {
        margin: 2,
        padding: 1,
        backgroundColor: "white",
    },
    button: {
        borderWidth: .5,
     padding:20,
     width:330,
     marginVertical:20,
     backgroundColor:'green',
     borderRadius:10,
     alignItems:'center',

justifyContent:'center',

        borderColor: '#38b4f7'
     },
     Overlay:{
justifyContent:'space-around',
alignItems:'center',
flex:1,
     },
     button1: {
        borderWidth: .5,
     padding:20,
     width:330,
     marginVertical:20,
     backgroundColor:'red',
     borderRadius:10,
     alignItems:'center',

justifyContent:'center',

        borderColor: '#38b4f7'
     },
     subText:{
        textAlign: 'center',
        fontSize: 18,
        color:'white',
        marginVertical:5
    },
    mainText: {
		textAlign: 'center',
        fontSize: 32,
        color:'white'
	},
    btnDisable: {
        margin: 3,
        padding: 1,
        fontSize:18,
        backgroundColor: "red",
    },
    btnText: {
        margin: 3,
        padding: 1,
        fontSize:18,
        color:'#38b4f7',
        fontFamily:"Montserrat-Bold",
    },
    subText:{
        margin: 2,
        padding: 2,
        fontFamily:"Montserrat-Bold",
        color:'white'
    }
});