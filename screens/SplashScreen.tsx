/* eslint-disable react/react-in-jsx-scope */
import {Image, StatusBar, View} from 'react-native';
import styles from '../style';
var bg = require('../assets/images/appLogo.png');

const SplashScreen = () => {
  const STYLES = 'dark-content';
  const statusBarStyle = STYLES;
  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle={statusBarStyle} />
      <View style={styles.SplshView}>
        <Image source={bg} style={styles.SplshImg} />
      </View>
    </>
  );
};

export default SplashScreen;
