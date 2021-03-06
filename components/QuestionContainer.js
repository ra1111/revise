//import liraries
import React, { Component } from 'react';
import { 
        View, 
        Text,
        StyleSheet, 
        Dimensions,
        Animated,
        TouchableOpacity,
        PanResponder,
        LayoutAnimation,
        UIManager
    } from 'react-native';
    import { Card, Button,  } from 'react-native-elements'
    import {connect} from 'react-redux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.40;
const SWIPE_OUT_DURATION = 250;

// create a component
class CardsContainer extends Component {

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD)
                    this.completeSwipe('right');
                else if (gesture.dx < -SWIPE_THRESHOLD)
                    this.completeSwipe('left');
                else
                    this.resetPosition();
            }
        });

        this.state = { panResponder, position, index: 0 };
    }

    UNSAFE_componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }
    
    completeSwipe(direction) {
        const x = (direction === 'right' ? SCREEN_WIDTH + 50 : -SCREEN_WIDTH - 50);
        
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onCompleteSwipe(direction));
    }

    onCompleteSwipe() {
        this.setState({ index: this.state.index + 1 });
        this.state.position.setValue({ x: 0, y: 0 });
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotationX = SCREEN_WIDTH * 2;

        const rotate = position.x.interpolate({
            inputRange: [-rotationX, 0, rotationX],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        console.log(this.props,"data")
        if (this.state.index >= this.props.data.length) {
            return (
          
                    <Card   containerStyle={styles.card}>
                    <Text style={styles.text}>
                      Finished with the question?Take a nap!
                    </Text>
                    <Button   title={"Revisit the questions"}
                    buttonStyle={{marginTop: 80, backgroundColor:"#03A9F4"}}     onPress={()=>{this.setState({index:0})}}/>

                    </Card>
       
            )
        }

if(this.props.showAnswer)
{
    return this.props.data.map((item, index) => {
        if (index < this.state.index)
            return null;
            
        //Add animation only to the card on top
        if (index === this.state.index) {
            return (
                <View 
                style={styles.viewStyle}
 
                    key={item.index}
                >
                    {this.props.renderCard(item)}
                </View>
            );
        }

        return (
            
            <View 
            key={item.id}
            style={styles.viewStyle}
               
            >
            
                {this.props.renderCard(item)}
            </View>
            
        );
    }).reverse();
}

else{
        return this.props.data.map((item, index) => {
            if (index < this.state.index)
                return null;
                
            //Add animation only to the card on top
            if (index === this.state.index) {
                return (
                    <Animated.View 
                        style={[
                            styles.cardStyle,
                            this.getCardStyle()
                        ]}
                        {...this.state.panResponder.panHandlers}
                        key={item.index}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return (
                
                <Animated.View 
                key={item.id}
                    style={[styles.cardStyle, {transform: [{ rotate: '0deg'}]}, { top: 10 * (index - this.state.index) }]}
                >
                
                    {this.props.renderCard(item)}
                </Animated.View>
                
            );
        }).reverse();
    }
}

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        marginTop:20,
        width: SCREEN_WIDTH-20,
     
    },
    viewStyle:{
      width:SCREEN_WIDTH,
      
        //backgroundColor:'white',

    },
    card:{
        borderRadius:20,
        alignItems:'center',
height:270,
justifyContent:'space-evenly'
    },
    text:{
color:'#38b4f7',
fontSize:24,

    },
  
});
function mapStateToProps(state) {
    return {answer:state.chat.answer,
        showAnswer:state.chat.showAnswer};
}
//make this component available to the app

export default connect(mapStateToProps)(CardsContainer);