/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {getAnalytics, logEvent} from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Navigation from './fragments/Navigation';
import SplashScreen from './screens/SplashScreen';
function App({navigation}): React.JSX.Element {
  const [isLoading, setLoading] = useState(true);
  // Initialize Analytics and get a reference to the service
  const analytics = getAnalytics();
  logEvent(analytics, 'SplashScreen', {
    firebase_screen: SplashScreen,
    // firebase_screen_class: screenClass,
  });
  console.log(analytics);

  useEffect(() => {
    // _retriveData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </>
      )}
    </>
  );
}

export default App;
