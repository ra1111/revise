/**
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import {
    Platform,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    ActivityIndicator,
    View,
    ScrollView
} from 'react-native';
import { 
    AdMobBanner, 
    AdMobInterstitial, 
    PublisherBanner,
    AdMobRewarded
  } from 'react-native-admob'
  const bannerWidths = [200, 250, 320];
import * as firebase from 'firebase';
import {Icon} from './node_modules/react-native-elements';
import All from './Assets/Images/elitmus.png'
import CardHome from './components/CardHome'
import {receiveDecks} from './actions'
import {getDecks} from './utils/api'
import PropTypes from 'prop-types';
import Swipers from './components/Swiper'
import {connect} from 'react-redux'
let database,
    Revise,
    Trending,
    Popular;
const Button = (Platform.OS === 'android')
    ? TouchableNativeFeedback
    : TouchableOpacity;
class App extends Component {
    static navigationOptions = {
        header: null
    };
    state = {
        isLoading: false,
        imgSource: null,
        ocrResult: null,
        Trending,
        TrendingArray: [],
        Popular,
        PopularArray: []
    };
    async _loadInitialState() {
        try {
            let value = await getDecks();
            let holdArray = [];
            if (value !== null) {
                let val = JSON.parse(value)
                Object
                    .keys(val)
                    .map((key) => {
                        holdArray.push(val[key]);
                    })
                this
                    .props
                    .dispatch(receiveDecks(holdArray));
            } else {
                // eslint-disable-next-line
                console.log("error occured")
            }
        } catch (error) {
            // eslint-disable-next-line
            console.log("error here")
        }
    }
    componentDidMount()
    {
        this
            ._loadInitialState()
            .done();
            AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');

    AdMobRewarded.addEventListener('rewarded',
      (reward) => console.log('AdMobRewarded => rewarded', reward)
    );
    AdMobRewarded.addEventListener('adLoaded',
      () => console.log('AdMobRewarded => adLoaded')
    );
    AdMobRewarded.addEventListener('adFailedToLoad',
      (error) => console.warn(error)
    );
    AdMobRewarded.addEventListener('adOpened',
      () => console.log('AdMobRewarded => adOpened')
    );
    AdMobRewarded.addEventListener('videoStarted',
      () => console.log('AdMobRewarded => videoStarted')
    );
    AdMobRewarded.addEventListener('adClosed',
      () => {
        console.log('AdMobRewarded => adClosed');
        AdMobRewarded.requestAd().catch(error => console.warn(error));
      }
    );
    AdMobRewarded.addEventListener('adLeftApplication',
      () => console.log('AdMobRewarded => adLeftApplication')
    );

    AdMobRewarded.requestAd().catch(error => console.warn(error));

    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

    AdMobInterstitial.addEventListener('adLoaded',
      () => console.log('AdMobInterstitial adLoaded')
    );
    AdMobInterstitial.addEventListener('adFailedToLoad',
      (error) => console.warn(error)
    );
    AdMobInterstitial.addEventListener('adOpened',
      () => console.log('AdMobInterstitial => adOpened')
    );
    AdMobInterstitial.addEventListener('adClosed',
      () => {
        console.log('AdMobInterstitial => adClosed');
        AdMobInterstitial.requestAd().catch(error => console.warn(error));
      }
    );
    AdMobInterstitial.addEventListener('adLeftApplication',
      () => console.log('AdMobInterstitial => adLeftApplication')
    );

    AdMobInterstitial.requestAd().catch(error => console.warn(error));

    }
    componentWillUnmount() {
        AdMobRewarded.removeAllListeners();
        AdMobInterstitial.removeAllListeners();
      }
    
      showRewarded() {
        AdMobRewarded.showAd().catch(error => console.warn(error));
      }
    
      showInterstitial() {
        AdMobInterstitial.showAd().catch(error => console.warn(error));
      }
    async UNSAFE_componentWillMount() {

        database = firebase.database();
        Revise = database.ref('Revise')
        Trending = Revise.child('Trending')
        try {
            await Trending
                .once('value')
                .then(snapshot => {
                    this.setState({
                        Trending: snapshot.val()
                    })
                    let data = this.state.Trending;
                    var quantities = [];
                    for (var key in data) {
                        for (var key2 in data[key]) {

                            quantities.push({source: All, title: key2, number: data[key][key2].length,
                                deck: data[key]

                            });
                        }

                    }

                    this.setState({TrendingArray: quantities})

                })
        } catch (ex) { // eslint-disable-next-line
            console.log('exception', ex);
        }
        Trending = Revise.child('Popular')
        try {
            await Trending
                .once('value')
                .then(snapshot => {
                    this.setState({
                        Popular: snapshot.val()
                    })
                    let data = this.state.Popular;
                    var quantities = [];
                    for (var key in data) {
                        for (var key2 in data[key]) {

                            quantities.push({source: All, title: key2, number: data[key][key2].length,
                                deck: data[key]

                            });
                        }

                    }

                    this.setState({PopularArray: quantities})

                })
        } catch (ex) { // eslint-disable-next-line
            console.log('exception', ex);
        }

    }
    render() {
        if(this.state.TrendingArray.length===0)
        {
            return(
                <View style={styles.container}>
                <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>

                <Swipers text1={<AdMobBanner
              adSize="mediumRectangle"
              adUnitID="ca-app-pub-7368274303704514/5752280471"
              ref={el => (this._basicExample = el)}
            />} text2={"Important Questions"} text3={" India's First Digital Notebook"}/>
                <View style={styles.contentContainer}>
                    <ScrollView >
                        <View>
                            <Text style={styles.title}>
                                Popular on Revise</Text>
                            <CardHome
                                home={false}
                                navigation={this.props.navigation}
                                data={this.state.PopularArray}/>
                            {/* <View>
                                <Text style={styles.title}>
                                    Your Deck</Text>
                                {Object
                                    .keys(this.props.deckData)
                                    .length !== 0
                                    ? <CardHome
                                            navigation={this.props.navigation}
                                            home={true}
                                            data={this.props.deckData}/>
                                    : <View style={styles.textContainer}>
                                        <Text style={styles.titleOption}>Please Add Decks By Clicking on</Text>
                                        <Text style={styles.Plus}>+</Text>
                                    </View>}

                            </View> */}
                            <View>
                                <Text style={styles.title}>
                                    Trending Now</Text>
                                <CardHome
                                    navigation={this.props.navigation}
                                    home={false}
                                    data={this.state.TrendingArray}/>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                {/* <View style={styles.button}>
                    <Button onPress={() => this.props.navigation.navigate('AddDeck')}>
                        <View style={[styles.add, styles.imgContainer, styles.round]}>

                            <Icon name='add' size={30} color={'white'}/>
                        </View>
                    </Button>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'white'
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: 'white',
        marginVertical:3,
        backgroundColor: '#38b4f7'

    },
    card: {
        height: 150,
        width: 130,
        elevation: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    contentContainer: {
        height: '70%',
        width: '100%'
    },

    cardText: {
        fontSize: 16,
        fontWeight: '700'
    },
    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderRadius: 10,
        margin: 10
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
    add: {
        width: 60,
        height: 60,
        backgroundColor: '#38b4f7',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: {
            height: 1,
            width: 1
        }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20
    },

    round: {
        borderRadius: 75
    },
    border: {
        width: '100%',
        height: 4
    },
    textContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        textAlign: 'center'

    },
    titleOption: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#38b4f7'
    },
    Plus: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
        color: '#38b4f7'
    }

});

function mapStateToProps(state) {
    return {deckData: state.decks.deckData}
}
App.propTypes = {
    deckData: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.func
};
export default connect(mapStateToProps)(App)