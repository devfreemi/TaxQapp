/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {getAnalytics, logEvent} from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navigation from './fragments/Navigation';
import SplashScreen from './screens/SplashScreen';
import styles from './style';
import userPermission from './utils/notifiction';
function App({navigation}): React.JSX.Element {
  const [isLoading, setLoading] = useState(true);
  // Initialize Analytics and get a reference to the service
  const analytics = getAnalytics();
  logEvent(analytics, 'SplashScreen', {
    firebase_screen: SplashScreen,
    // firebase_screen_class: screenClass,
  });
  console.log(analytics);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationBody, setNotificationBody] = useState('');
  useEffect(() => {
    // _retriveData();
    userPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setModalVisible(true);
      setNotificationTitle(remoteMessage.notification.title);
      setNotificationBody(remoteMessage.notification.body);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const STYLES = 'dark-content';
  const statusBarStyle = STYLES;
  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          <NavigationContainer>
            <StatusBar backgroundColor="#ffffff" barStyle={statusBarStyle} />
            <Navigation />
          </NavigationContainer>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={'#000000'}
                    style={styles.closeModal}
                  />
                </TouchableOpacity>
                <Text style={styles.modalText}>{notificationTitle}</Text>
                <View style={styles.modalGridView}>
                  <Text style={styles.modalTextBody}>{notificationBody}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.taxq',
                    );
                  }}>
                  <Text style={styles.textStyle}>Tap to update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
}

export default App;
