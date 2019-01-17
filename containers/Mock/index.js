import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    Text
} from 'react-native';

import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation-locker';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;


export default class PDFExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            width: WIN_WIDTH
        };
        this.pdf = null;
    }

    _onOrientationDidChange = (orientation) => {
        if (orientation == 'LANDSCAPE-LEFT'||orientation == 'LANDSCAPE-RIGHT') {
          this.setState({width:WIN_HEIGHT>WIN_HEIGHT?WIN_HEIGHT:WIN_WIDTH,horizontal:true});
        } else {
          this.setState({width:WIN_HEIGHT>WIN_HEIGHT?WIN_HEIGHT:WIN_WIDTH,horizontal:false});
        }
    };

    componentDidMount() {
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }

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

    render() {
        const source = {uri:'https://firebasestorage.googleapis.com/v0/b/elitmus-daf04.appspot.com/o/Elitmus.pdf?alt=media&token=e63c9ecd-64c8-4759-94bb-2eec525ba8ba',cache:true};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};
 
        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,..."};
 
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                    <TouchableHighlight disabled={this.state.page === 1}
                                        style={this.state.page === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.prePage()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.subText}>Page</Text></View>
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
                        {!this.state.horizontal ? (<Text style={styles.btnText}>{'False'}</Text>) : (
                            <Text style={styles.btnText}>{'True'}</Text>)}
                    </TouchableHighlight>

                </View>
                <View style={{flex:1,width: this.state.width,backgroundColor:"#38b4f7"}}>
                    <Pdf ref={(pdf) => {
                        this.pdf = pdf;
                    }}
                         source={source}
                         page={this.state.page}
                         scale={this.state.scale}
                         horizontal={this.state.horizontal}
                         onLoadComplete={(numberOfPages, filePath,{width,height},tableContents) => {
                             this.state.numberOfPages = numberOfPages; //do not use setState, it will cause re-render
                             console.log(`total page count: ${numberOfPages}`);
                             console.log(tableContents);
                         }}
                         onPageChanged={(page, numberOfPages) => {
                             this.state.page = page; //do not use setState, it will cause re-render
                             console.log(`current page: ${page}`);
                         }}
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
        backgroundColor:"#38b4f7",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
    },
    btn: {
        margin: 2,
        padding: 1,
        backgroundColor: "white",
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