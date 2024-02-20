/* eslint-disable react/react-in-jsx-scope */
import {Image, View} from 'react-native';
import styles from '../style';
var bg = require('../assets/images/appLogo.png');

const SplashScreen = () => {
  return (
    <View style={styles.SplshView}>
      <Image source={bg} style={styles.SplshImg} />
    </View>
  );
};

export default SplashScreen;
