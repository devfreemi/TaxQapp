import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {firebase} from '@react-native-firebase/messaging';
// FCM
const userPermission = async () => {
  const authStatus = await firebase.messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getDeviceToken();
  }
};
const getDeviceToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old Fcm Token:', fcmToken);
  if (!fcmToken) {
    try {
      const fcmTokenNew = await firebase.messaging().getToken();
      if (fcmTokenNew) {
        console.log('New Generated FCM Token:', fcmTokenNew);
        await AsyncStorage.setItem('fcmToken', fcmTokenNew);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default userPermission;
