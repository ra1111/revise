// The code to setup the Card and Swipe animations is inspired by Stephen
// Grider's course on Udemy: React Native: Advanced Concepts.
import React from 'react'
import {
    Text,
    StyleSheet,
    View,
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import {Card, Button, Icon} from 'react-native-elements'
import {AddQuizResults} from '../actions'
import {updateDeck} from '../utils/api'
import Mcq from './Mcq'
// import { clearLocalNotification, setLocalNotification } from
// '../utils/helpers'

const SCREEN_WIDTH = Dimensions
    .get('window')
    .width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class QuizCard extends React.Component {

    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this
            .animatedValue
            .addListener(({value}) => {
                this.value = value;
            })
        this.frontInterpolate = this
            .animatedValue
            .interpolate({
                inputRange: [
                    0, 180
                ],
                outputRange: ['0deg', '180deg']
            })
        this.backInterpolate = this
            .animatedValue
            .interpolate({
                inputRange: [
                    0, 180
                ],
                outputRange: ['180deg', '360deg']
            })

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy});
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        })

        this.state = {
            panResponder,
            position,
            counter: 0,
            flip: false,
            noCorrect: 0,
            min: 0,
            mcq: true
        };
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log(this.props, "DWJJDWIJDWIJDWJIWDIJIJWDIJDWJ")
        if (nextProps.data !== this.props.data) {
            this.setState({counter: 0});
        }
    }

    flipCard() {
        if (this.value >= 90) {
            Animated
                .spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            })
                .start();
        } else {
            Animated
                .spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            })
                .start();
        }
        return this.setState((prevState) => ({
            flip: !prevState.flip
        }));
    }

    onSwipeRight(title) {
        this.setState((prevState) => ({
            noCorrect: prevState.noCorrect + 1
        }))
    }

    componentWillUpdate(prevProps, prevState) {
        // For Android
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right'
            ? SCREEN_WIDTH
            : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: {
                x,
                y: 0
            },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const {data} = this.props;
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this
            .animatedValue
            .addListener(({value}) => {
                this.value = value;
            })
        this.frontInterpolate = this
            .animatedValue
            .interpolate({
                inputRange: [
                    0, 180
                ],
                outputRange: ['0deg', '180deg']
            })
        this.backInterpolate = this
            .animatedValue
            .interpolate({
                inputRange: [
                    0, 180
                ],
                outputRange: ['180deg', '360deg']
            })

        direction === 'right'
            ? this.onSwipeRight(data.title)
            : null;
        this
            .state
            .position
            .setValue({x: 0, y: 0});
        this.setState((prevState) => ({
            counter: direction === 'right'
                ? prevState.counter + 1
                : prevState.counter !== 0
                    ? prevState.counter - 1
                    : prevState.counter
        }));
        this.setState({flip: false, mcq: true});
        if (this.state.counter >= this.props.data.questions.length) {
            const result = Math
                .round(this.state.noCorrect / this.props.data.questions.length * 100)
                .toFixed(2);
            this
                .props
                .dispatch(AddQuizResults(this.props.data.title, result));
        }
    }
    titleElement(index, totalLength)
    {
        return (
            <View style={styles.containerEl}>
                <View style={styles.titleEl}>
                    <Icon
                        name='arrow-back'
                        color='white'
                        size={30}
                        onPress={() => this.onSwipeComplete('left')}/>
                    <Text style={styles.textTitle}>{`${String(index)}/${String(totalLength)}` || 0 / 0}</Text>
                    <Icon
                        name='arrow-forward'
                        size={30}
                        onPress={() => this.onSwipeComplete('right')}
                        color='white'/>

                </View>
                <View style={styles.boundaryEl}/>
            </View>
        )

    }
    resetPosition() {
        Animated
            .spring(this.state.position, {
            toValue: {
                x: 0,
                y: 0
            }
        })
            .start();
    }

    getCardStyle() {
        const {position} = this.state;
        const rotate = position
            .x
            .interpolate({
                inputRange: [-SCREEN_WIDTH * 2.0,
                    0,
                    SCREEN_WIDTH * 2.0
                ],
                outputRange: ['-120deg', '0deg', '120deg']
            })

        return {
            ...position.getLayout(),
            transform: [{
                    rotate
                }]
        };
    }

    renderCardContent(item, index, totalLength) {
        const frontAnimatedStyle = {
            transform: [
                {
                    rotateY: this.frontInterpolate
                }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                {
                    rotateY: this.backInterpolate
                }
            ]
        }

        return (
            <Card
                key={item}
                titleStyle={{
                color: 'white'
            }}
                containerStyle={{
                backgroundColor: '#2286c3',
                borderRadius: 10,
                color: 'white'
            }}
                title={this.titleElement(index, totalLength)}>

                <TouchableOpacity style={styles.cardText} onPress={() => this.flipCard()}>

                    {this.state.flip === false
                        ? <Animated.Text
                                adjustsFontSizeToFit={true}
                                style={[styles.flipCard, frontAnimatedStyle, styles.cardText, styles.flipText]}>{item
                                    .question
                                    .toUpperCase()}</Animated.Text>
                        : <Animated.View
                            style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>{item
                                .answer
                                .map((value, index) => {
                                    return <Animated.View style={styles.textContainer}>
                                        <Text style={styles.flipTextBack}>{index + 1}{")\t"}{value.toUpperCase()}{"\n\n"}</Text><View
                                            style={index < (item.answer.length - 1)
                                        ? styles.boundary
                                        : styles.noBoundary}/></Animated.View>
                                })}</Animated.View>
}

                </TouchableOpacity>

            </Card>
        )
    }

    renderNoMoreCards(result) {
        return (
            <Card title="Finished Quiz!">
                <Text style={styles.cardText}>
                    {`You Scored ${result}%!`}
                </Text>
                <Button
                    onPress={() => this.setState({counter: 0, noCorrect: 0, min: 0, mcq: true})}
                    title='Restart Quiz'
                    backgroundColor="#03A9F4"
                    icon={{
                    name: 'refresh'
                }}/>
            </Card>
        )
    }
    correct = () => {
        this.setState({mcq: false, min: this.state.counter})
    }
    renderCards() {

        if (this.state.counter >= this.props.data.questions.length) {
            const result = Math
                .round(this.state.noCorrect / this.props.data.questions.length * 100)
                .toFixed(2);
            const title = this.props.data.title;
            const newDeck = {
                ...this.props.data,
                perc: result
            };

            // update AsyncStorage
            updateDeck({title, newDeck});
            // setup new push notifications
            // 	clearLocalNotification().then(setLocalNotification)
            return this.renderNoMoreCards(result);
        } else if (this.state.counter < this.props.data.questions.length) {
            return this
                .props
                .data
                .questions
                .map((item, index) => {
                    if (index < this.state.counter) {
                        return null;
                    } else if (index === this.state.counter) {
                        return (
                            <Animated.View
                                key={index}
                                style={[
                                this.getCardStyle(),
                                styles.getCardStyle
                            ]}
                                {...this.state.panResponder.panHandlers}>{this.renderCardContent(item, this.state.counter + 1, this.props.data.questions.length)}
                            </Animated.View>
                        );
                    }
                    return (<View/>)
                })
                .reverse();
        }
    }

    render() {
        console.log(this.props, "quiz cards")

        if (this.state.counter !== 0 && this.state.counter % 3 === 0 && this.state.mcq) {
            return (<Mcq
                deck={this.props.data.questions}
                min={this.state.min}
                correct={() => this.correct()}counter={this.state.counter}/>)
        } else {
            return (
                <View style={styles.container}>

                    <View style={styles.cardView}>
                        {this.renderCards()}
                    </View>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f6'

    },
    containerEl: {
        justifyContent: 'center'
    },
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    },
    text: {
        height: '68%'
    },
    cardView: {
        height: '100%'
    },
    bottomView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end'
    },
    iconRight: {
        flex: 1,
        marginBottom: 20,
        justifyContent: 'flex-end'
    },
    boundary: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'white'
    },
    noBoundary: {
        height: 0
    },
    iconLeft: {
        flex: 1,
        marginBottom: 20,
        justifyContent: 'flex-start'
    },
    titleEl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,

        color: 'white'
    },
    boundaryEl: {
        width: '95%',
        height: .7,
        backgroundColor: 'white',
        marginBottom: '1.2%'
    },
    textContainer: {
        backfaceVisibility: 'hidden',
        width: '100%',
        marginVertical: 5
    },
    cardText: {
        height: '94%'
    },
    flipCard: {
        width: '100%',
        height: '94%',
        borderRadius: 10,
        padding: 5,

        backgroundColor: '#6bb1ff',
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden'
    },
    flipCardBack: {
        width: '100%',
        height: '94%',

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

        padding: 5,
        flexDirection: 'column',

        backgroundColor: "#6bb1ff"
    },
    textTitle: {
        color: 'white',
        fontSize: 17
    },
    flipText: {
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    flipTextBack: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        textAlignVertical: 'center'
    }
})

function mapStateToProps(state) {
    return {deckData: state.decks.deckData}
}

export default connect(mapStateToProps)(QuizCard)