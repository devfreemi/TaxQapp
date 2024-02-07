import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style';

function Profile({navigation}): JSX.Element {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const FetchStorageData = async () => {
    const nameVal = await AsyncStorage.getItem('name');
    const photoUrl = await AsyncStorage.getItem('photo');
    setName(nameVal);
    setPhoto(photoUrl);
  };
  FetchStorageData();
  const LogoutButton = async () => {
    await AsyncStorage.removeItem('userId');
    await GoogleSignin.signOut();
    navigation.navigate('LoginHome');
  };

  return (
    <SafeAreaView style={styles.ContentViewLOG}>
      <View style={styles.profileImgContainer}>
        <Image source={{uri: photo}} style={styles.profilePic} />
        <Text style={styles.ProfileName}>{name}</Text>
      </View>
      <View style={styles.logoutCont}>
        <View style={styles.homeGridViewLog}>
          <View style={[styles.cardLog, styles.elevationPro]}>
            <View style={styles.viewElements}>
              <LinearGradient
                colors={['#e7e6ff', '#e7e6ff']}
                useAngle={true}
                angle={155.38}
                style={(styles.viewElementsInnerF2, styles.IconView)}>
                <Ionicons name="person-outline" size={25} color={'#0a0099'} />
              </LinearGradient>
              <View style={styles.viewElementsInnerF2}>
                <Text style={styles.innerTextViewHeadLog}>Customer Id</Text>
                <Text style={styles.innerTextViewLog}>123456789 </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.homeGridViewLog}>
          <View style={[styles.cardLog, styles.elevationPro]}>
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
                <Text style={styles.innerTextViewHeadLog}>Mobile Number</Text>
                <Text style={styles.innerTextViewLog}>8240145941</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.homeGridViewLog}>
          <View style={[styles.cardLog, styles.elevationPro]}>
            <View style={styles.viewElements}>
              <LinearGradient
                colors={['#e7e6ff', '#e7e6ff']}
                useAngle={true}
                angle={155.38}
                style={(styles.viewElementsInnerF2, styles.IconView)}>
                <Ionicons name="at-outline" size={25} color={'#0a0099'} />
              </LinearGradient>
              <View style={styles.viewElementsInnerF2}>
                <Text style={styles.innerTextViewHeadLog}>Email Id</Text>
                <Text style={styles.innerTextViewLog}>asd@gmail.com</Text>
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
    </SafeAreaView>
  );
}
export default Profile;
