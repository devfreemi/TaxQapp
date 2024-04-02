import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style';

function Profile({navigation}): JSX.Element {
  const [name, setName] = useState('Loading...');
  const [photo, setPhoto] = useState(
    'https://www.flaticon.com/free-icon/user_3177440?term=profile&page=1&position=13&origin=tag&related_id=3177440',
  );
  const [email, setEmail] = useState('Loading...');
  const [mobile, setMobile] = useState('Loading...');
  const [isLoading, setLoading] = useState(true);
  const [cId, setCid] = useState('Loading...');
  const FetchStorageData = async () => {
    const customerIDP = await AsyncStorage.getItem('userId');
    const profileUrl = 'https://complyify.in/taxConsultant/tax/profile-api-v1';
    let resultDlist = await fetch(profileUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerIDP,
      }),
    });

    let getResultProfile = await resultDlist.json();
    if (getResultProfile.status === 101) {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('mobile');
      await GoogleSignin.signOut();
      navigation.navigate('LoginHome');
      console.log(getResultProfile.customerID);
    }
    console.log(getResultProfile);
    setName(getResultProfile.name);
    setPhoto(getResultProfile.photo);
    setMobile(getResultProfile.mobile);
    setEmail(getResultProfile.email);
    setCid(getResultProfile.customerID);
  };
  FetchStorageData();
  setTimeout(() => {
    FetchStorageData();
    setLoading(false);
    return false;
  }, 1500);
  const LogoutButton = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('mobile');
    await GoogleSignin.signOut();
    navigation.navigate('LoginHome');
  };

  return (
    <SafeAreaView style={styles.ContentViewLOG}>
      {isLoading ? (
        <View style={styles.ContentViewHomeChild}>
          <ActivityIndicator
            animating={isLoading}
            size={'large'}
            style={styles.StyleIndicator}
            color={'#745bff'}
          />
        </View>
      ) : (
        <View style={styles.profileDiv}>
          <View style={styles.profileImgContainer}>
            <Image source={{uri: photo}} style={styles.profilePic} />
            <Text style={styles.ProfileName}>{name}</Text>
          </View>
          <View style={styles.logoutCont}>
            <View style={styles.homeGridViewLog}>
              <View style={[styles.cardLog]}>
                <View style={styles.viewElements}>
                  <LinearGradient
                    colors={['#e7e6ff', '#e7e6ff']}
                    useAngle={true}
                    angle={155.38}
                    style={(styles.viewElementsInnerF2, styles.IconView)}>
                    <Ionicons
                      name="person-outline"
                      size={25}
                      color={'#0a0099'}
                    />
                  </LinearGradient>
                  <View style={styles.viewElementsInnerF2}>
                    <Text style={styles.innerTextViewHeadLog}>Customer Id</Text>
                    <Text style={styles.innerTextViewLog}>{cId}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.homeGridViewLog}>
              <View style={[styles.cardLog]}>
                <View style={styles.viewElements}>
                  <LinearGradient
                    colors={['#e7e6ff', '#e7e6ff']}
                    useAngle={true}
                    angle={155.38}
                    style={(styles.viewElementsInnerF2, styles.IconView)}>
                    <Ionicons
                      name="phone-portrait-outline"
                      size={25}
                      color={'#0a0099'}
                    />
                  </LinearGradient>
                  <View style={styles.viewElementsInnerF2}>
                    <Text style={styles.innerTextViewHeadLog}>
                      Mobile Number
                    </Text>
                    <Text style={styles.innerTextViewLog}>{mobile}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.homeGridViewLog}>
              <View style={[styles.cardLog]}>
                <View style={styles.viewElements}>
                  <LinearGradient
                    colors={['#e7e6ff', '#e7e6ff']}
                    useAngle={true}
                    angle={155.38}
                    style={(styles.viewElementsInnerF2, styles.IconView)}>
                    <Ionicons name="mail-outline" size={25} color={'#0a0099'} />
                  </LinearGradient>
                  <View style={styles.viewElementsInnerF2}>
                    <Text style={styles.innerTextViewHeadLog}>Email Id</Text>
                    <Text style={styles.innerTextViewLog}>{email}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonLogout} onPress={LogoutButton}>
            <View style={styles.buttonG}>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
export default Profile;
