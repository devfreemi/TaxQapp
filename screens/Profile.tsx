import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {version} from '../package.json';
import styles from '../style';
function Profile({navigation}): JSX.Element {
  const [name, setName] = useState('Loading...');
  const [photo, setPhoto] = useState(
    'https://www.flaticon.com/free-icon/user_3177440?term=profile&page=1&position=13&origin=tag&related_id=3177440',
  );
  const [isLoading, setLoading] = useState(true);

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
      // console.log(getResultProfile.customerID);
    } else {
      setName(getResultProfile.name);
      setPhoto(getResultProfile.photo);
    }
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
  const openURL = async () => {
    Linking.openURL('https://complyify.in/refundpolicy.php');
  };
  // Share
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Complyify | Compliance Simplyfied',
        message:
          'Complyify | Compliance Simplyfied | Affordable Business Solutions | Download it from Playstore : https://play.google.com/store/apps/details?id=com.taxq',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // share
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
        <ScrollView>
          <View style={styles.profileDiv}>
            <View style={styles.profileImgContainer}>
              <Image source={{uri: photo}} style={styles.profilePic} />
              <Text style={styles.AccountName}>{name}</Text>
            </View>
            <View style={styles.ProfileRow}>
              <TouchableOpacity
                style={styles.divService}
                onPress={() => navigation.navigate('Account')}>
                <View style={[styles.cardIProfile]}>
                  <View style={styles.viewElementsReport}>
                    <View style={styles.viewElementsReportF2}>
                      <Ionicons
                        name="person-circle-outline"
                        size={32}
                        color={'#494F55'}
                      />
                    </View>
                  </View>
                  <Text style={styles.profileName}>Account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.divService}
                onPress={() => navigation.navigate('Support')}>
                <View style={[styles.cardIProfile]}>
                  <View style={styles.viewElementsReport}>
                    <View style={styles.viewElementsReportF2}>
                      <Ionicons
                        name="settings-outline"
                        size={32}
                        color={'#494F55'}
                      />
                    </View>
                  </View>
                  <Text style={styles.profileName}>Settings</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.divService}
                onPress={() => navigation.navigate('Support')}>
                <View style={[styles.cardIProfile]}>
                  <View style={styles.viewElementsReport}>
                    <View style={styles.viewElementsReportF2}>
                      <Ionicons
                        name="headset-outline"
                        size={32}
                        color={'#494F55'}
                      />
                    </View>
                  </View>
                  <Text style={styles.profileName}>Support</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logoutCont}>
            <TouchableOpacity
              style={styles.viewProfileCardFirst}
              onPress={() => navigation.navigate('Become Our Partner')}>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="id-card-outline"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
              <Text style={styles.itemProfile}>Become Our Partner</Text>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewProfileCard}
              onPress={() => navigation.navigate('Terms & Conditions')}>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="document-lock-outline"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
              <Text style={styles.itemProfile}>Terms & Conditions</Text>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewProfileCard}
              onPress={() => navigation.navigate('Privacy & Policy')}>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
              <Text style={styles.itemProfile}>Privacy Policy</Text>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewProfileCard} onPress={openURL}>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="refresh-circle-outline"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
              <Text style={styles.itemProfile}>Refund Policy</Text>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewProfileCard} onPress={onShare}>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
              <Text style={styles.itemProfile}>Share</Text>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewProfileCard}
              onPress={LogoutButton}>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="laptop-outline"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
              <Text style={styles.itemProfile}>Logout</Text>
              <View style={styles.itemStatusProfile}>
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={'#494F55'}
                  style={styles.itemStatusText}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonVersion}>
            <Image
              source={require('../assets/images/appIcon.png')}
              style={styles.appIcon}
            />
            <Text style={styles.versionText}>Version {version}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
export default Profile;
