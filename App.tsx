/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {getAnalytics, logEvent} from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, StatusBar} from 'react-native';
import {checkVersion} from 'react-native-check-version';
import Navigation from './fragments/Navigation';
import SplashScreen from './screens/SplashScreen';
// import userPermission from './utils/notifiction';
function App({navigation}): React.JSX.Element {
  const versionCheck = async () => {
    const version = await checkVersion();
    console.log('Got version info:', version);

    if (version.needsUpdate) {
      Alert.alert(`App has a ${version.updateType} update pending.`);
      // console.log(`App has a ${version.updateType} update pending.`);
    }
  };
  versionCheck();
  const [isLoading, setLoading] = useState(true);
  // Initialize Analytics and get a reference to the service
  const analytics = getAnalytics();
  logEvent(analytics, 'SplashScreen', {
    firebase_screen: SplashScreen,
    // firebase_screen_class: screenClass,
  });
  console.log(analytics);

  setTimeout(() => {
    setLoading(false);
  }, 1500);
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
        </>
      )}
    </>
  );
}

export default App;
