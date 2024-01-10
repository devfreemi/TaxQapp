/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Navigation from './fragments/Navigation';
import SplashScreen from './screens/SplashScreen';

function App({navigation}): React.JSX.Element {
  const [isLoading, setLoading] = useState(true);

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
