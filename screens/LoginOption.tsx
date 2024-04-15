import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../style';
function LoginOption({navigation}): JSX.Element {
  // const [email, setEmail] = useState('');
  // const [id, setUserId] = useState('');
  // const [name, setName] = useState('');
  // const [photo, setPhoto] = useState('');
  // For api

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '866255476365-koeosolvov4edpdkphivb6fvtv4lhgae.apps.googleusercontent.com',
    });
  }, []);
  const FetchLoginApi = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();
      // SET GOOGLE DATA
      const uniqid = user.id;
      const loginWith = 'Google';
      const familyName = user.familyName;
      const givenName = user.givenName;
      const name = user.name;
      const photo = user.photo;
      const email = user.email;
      // SET ASYNC STORAGE
      AsyncStorage.setItem('userId', user.id);
      AsyncStorage.setItem('email', user.email);
      AsyncStorage.setItem('name', user.name);
      AsyncStorage.setItem('photo', user.photo);
      // API CALL
      const loginUrl = 'https://complyify.in/taxConsultant/tax/login-api-v1';
      let result = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          uniqid,
          loginWith,
          email,
          familyName,
          givenName,
          name,
          photo,
        }),
      });
      let getResultEx = await result.json();
      if (getResultEx) {
        console.log(getResultEx);
      } else {
        console.log('Internal Failure. Contact to Tech Team');
      }
      // Navigate
      navigation.navigate('MobileVerification');
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const tokenLogin = async () => {
    const tokenValue = await AsyncStorage.getItem('userId');
    // const mobileID = await AsyncStorage.getItem('mobile');
    if (tokenValue !== null) {
      navigation.navigate('MobileVerification');
      console.log('Already Logged In');
    } else {
      navigation.navigate('LoginHome');
      console.log('Token Expired');
    }
  };
  tokenLogin();

  return (
    <SafeAreaView style={styles.ContentView}>
      <View style={styles.hImage}>
        <Image
          source={require('../assets/images/onbording.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.headerTitle}>Compliance Simplyfied</Text>
      <Text style={styles.brand2}>Affordable Business Solutions</Text>

      <ScrollView>
        <View style={styles.formView}>
          <TouchableOpacity style={styles.buttonLogin} onPress={FetchLoginApi}>
            <View style={styles.buttonG}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.googleImage}
              />
              <Text style={styles.loginText}>Login With Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMobile}
            onPress={() => navigation.navigate('MobileLogin')}>
            <View style={styles.buttonG}>
              <Image
                source={require('../assets/images/phone.png')}
                style={styles.googleImage}
              />
              <Text style={styles.mobileText}>Login With Mobile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginOption;
