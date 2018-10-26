import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import * as firebase from 'firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
//import Icon from '../Assets/Images/icon.png';
export default class Login extends Component {
  signInWithGoogle = async () => {
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId:
            '943701204118-0gqllr48e8i8jtejj9du0dru5lbse7dp.apps.googleusercontent.com'
        },
        android: {
          // androidClientId:
          //   '922830836172-902poqs0scrvcn772q40b7jr66ci3030.apps.googleusercontent.com'
        }
      })
    };
    await GoogleSignin.configure({
      ...configPlatform,

      webClientId:
      "922830836172-7gkn82g7osq8jcjq0e0u4ble2vbsqthq.apps.googleusercontent.com",

      offlineAccess: false
    });
  
    try {
      let database = firebase.database();
      const user = await GoogleSignin.signIn();
      console.log(user);

      const credential = firebase.auth.GoogleAuthProvider.credential(
        user.idToken,
        user.accessToken
      );
      const currentUser = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);

      console.log(database.ref('Revise/users' ));
      database
        .ref('users/')
        .child(currentUser.user.uid)
        .once('value', function(snapshot) {
          var exists = snapshot.val() !== null;
          if (!exists) {
            database.ref('users/' + currentUser.user.uid).set({
              username: user.name,
              email: user.email,
              profile_picture: user.photo,
              DailyGoals: 100,
              CorrectAns: 0,
              WrongAns: 0,
              TotalAns: 0,
              DialyCorrectAns: 0,
              DailyWrongAns: 0,
              DailyTotalAns: 0
            });
          }
        });

      this.props.navigation.navigate('Home', {
        user: user,
        currentUser: currentUser
      });
    } catch (error) {
      if (error.code === 'CANCELED') {
        console.log('user cancelled');
      }
      console.log(error);
    }
  };
  componentWillMount() {
    const config = {
        apiKey: "AIzaSyBdKsVYoAlzIAJgJCurjqdhSo_VQJwoMio",
        authDomain: "elitmus-daf04.firebaseapp.com",
        databaseURL: "https://elitmus-daf04.firebaseio.com",
        projectId: "elitmus-daf04",
        storageBucket: "elitmus-daf04.appspot.com",
        messagingSenderId: "922830836172"
    };

    if (!firebase.apps.length) {
     // firebase.initializeApp(config);
      console.log(firebase.initializeApp(config));
    }
  }
  async componentDidMount() {
    await this._configureGoogleSignIn();
    await this._getCurrentUser();
  }
  async _configureGoogleSignIn() {
    await GoogleSignin.hasPlayServices({autoResolve: true});
    

    await GoogleSignin.configure({
      ...configPlatform,

      webClientId:
      "922830836172-7gkn82g7osq8jcjq0e0u4ble2vbsqthq.apps.googleusercontent.com",

      offlineAccess: false
    });
  }

  async _getCurrentUser() {
    try {
      const user = await GoogleSignin.currentUserAsync();

      const credential = firebase.auth.GoogleAuthProvider.credential(
        user.idToken,
        user.accessToken
      );
      const currentUser = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);

      console.log(user);
      if (user) {
        this.props.navigation.navigate('Drawer', {
          user: user,
          currentUser: currentUser
        });
      }
      // this.setState({user, error: null});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{width: 212, height: 48,marginBottom:120}}
          //size={GoogleSigninButton.Size.Standard}
          // color={GoogleSigninButton.Color.Auto}
          onPress={() => this.signInWithGoogle()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
  ,
  icon:{
    width:200,
    height:200,
    marginTop:120
 
  }
});
Login.navigationOptions = {
  title: 'Login'
};
