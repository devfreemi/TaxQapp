import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
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
    <SafeAreaView style={styles.ContentView}>
      <View style={styles.profileImgContainer}>
        <Image source={{uri: photo}} style={styles.profilePic} />
        <Text style={styles.ProfileName}>{name}</Text>
      </View>
      <View style={styles.logoutCont}>
        <Text style={styles.logoutTextHead}>You want to Logout?</Text>
        <TouchableOpacity style={styles.buttonLogout} onPress={LogoutButton}>
          <View style={styles.buttonG}>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Profile;
