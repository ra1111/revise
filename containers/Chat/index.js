import React from 'react'
import {connect} from 'react-redux';
import { StyleSheet, View ,ActivityIndicator,Platform} from 'react-native'
import { Button, Input,Icon} from 'react-native-elements'
import * as RNIap from 'react-native-iap';
import * as firebase from 'firebase';
import Question from '../../components/Question'
import Modal from '../../components/QuestionModal'
let database,
    Revise,
    Chats;
    const itemSkus = Platform.select({
        ios: [
          'com.cooni.point1000', 'com.cooni.point5000', // dooboolab
        ],
        android: [
          'revise', // subscription
        ],
      });
 class Chat extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props)
    { super(props)
        this.hideModal=this.hideModal.bind(this)
    this.state = {
        modalVisible: false,
        Chats:[],
        numberOfPages: 0,
        productList: [],
        receipt: '',
        availableItemsMessage: '',
        purchased:false,
      };
    }
    buyItem = async(sku) => {
        try {
          console.log('buyItem: ' + sku);
          // const purchase = await RNIap.buyProduct(sku);
          // const products = await RNIap.buySubscription(sku);
          const purchase = await RNIap.buyProductWithoutFinishTransaction(sku);
          this.setState({purchased:true})
          console.log(purchase);
        } catch (err) {
            this.setState({purchased:false})
          console.log(err.code, err.message,"error ocuured");

        }
      }
      async componentDidMount() {
       
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
       
      RNIap.endConnection();
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
    async UNSAFE_componentWillMount() {

        database = firebase.database();
        Revise = database.ref('Revise')
        Chats = Revise.child('Chat')
        console.log(Chats,"Chat")
        try {
            await Chats
                .once('value')
                .then(snapshot => {
                    this.setState({
                        Chats: snapshot.val()
                    })

                })
   
            
            }
            catch(ex)
            {
                console.log(ex,"exception")
            }
    }
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      hideModal()
      {
        this.setState({modalVisible: false});
      }

    render()
    {
        if(this.state.Chats.length===0)
        {
            return <ActivityIndicator/>
        }
        return(
            <View style={styles.container}>
              
            <Question questions={this.state.Chats}/>
            {this.state.modalVisible&&
            <Modal modalVisible={this.state.modalVisible} hide={this.hideModal}/>
            }
 {!this.props.answer&&!this.props.showAnswer&&           <View>
<Button
onPress={()=>{this.state.purchased?this.setModalVisible(true): this.buyItem('revise')}}
title="ASK A QUESTION"
 icon={
    <Icon
      name='question-circle'
      type='font-awesome'
      size={15}
      color='white'
    />
  }
  iconRight
  buttonStyle={styles.ask}/>
  
                </View>
 }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#38b4f7',
        flex: 1,
     
    },
    ask:{
        alignSelf: 'center',
        backgroundColor: '#00dec2',
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

});
function mapStateToProps(state) {
    return {answer:state.chat.answer,
    showAnswer:state.chat.showAnswer};
}
//make this component available to the app

export default connect(mapStateToProps)(Chat);