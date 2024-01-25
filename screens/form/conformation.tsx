import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from '../../style';

function Conformation({route, navigation}): JSX.Element {
  const {itemId, otherParam} = route.params;
  return (
    <SafeAreaView style={styles.ContentViewSuccess}>
      <View style={styles.SuccCont}>
        <Text style={styles.SuccessHead}>Thanks for using our service !</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      </View>
    </SafeAreaView>
  );
}
export default Conformation;
