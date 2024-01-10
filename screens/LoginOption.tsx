import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
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
  const [email, setEmail] = useState('');
  const [id, setUserId] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '866255476365-koeosolvov4edpdkphivb6fvtv4lhgae.apps.googleusercontent.com',
    });
  }, []);
  const GsignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();
      console.log(user);
      // SET GOOGLE DATA
      setEmail(user.email);
      setUserId(user.id);
      setName(user.name);
      setPhoto(user.photo);
      // SET ASYNC STORAGE
      AsyncStorage.setItem('userId', id);
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('name', name);
      AsyncStorage.setItem('photo', photo);
      // Navigate
      navigation.navigate('HomeScreen');
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };
  const tokenLogin = async () => {
    const tokenValue = await AsyncStorage.getItem('userId');
    if (tokenValue !== null) {
      navigation.navigate('HomeScreen');
      console.log('Already Logged In');
    } else {
      GsignIn();
      navigation.navigate('LoginHome');
      console.log('Token Expired');
    }
  };
  tokenLogin();
  return (
    <SafeAreaView style={styles.ContentView}>
      <View style={styles.hImage}>
        <Image
          source={require('../assets/images/tax.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.headerTitle}>
        Welcome To
        <Text style={styles.brand}> TaxQ</Text>
      </Text>
      <ScrollView>
        <View style={styles.formView}>
          <TouchableOpacity style={styles.buttonLogin} onPress={GsignIn}>
            <View style={styles.buttonG}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.googleImage}
              />
              <Text style={styles.loginText}>Login With Google</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.seperator}>
            <Text style={styles.textOr}>OR</Text>
          </View>
          <TouchableOpacity style={styles.buttonMobile}>
            <View style={styles.buttonG}>
              <Image
                source={require('../assets/images/phone.png')}
                style={styles.googleImage}
              />
              <Text style={styles.mobileText}>Login With Email</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.Footer}>
        <Text style={styles.FooterText}>
          Made With &#10084; By
          <Text style={styles.FooterBrand}> FindSoftware4U</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default LoginOption;
