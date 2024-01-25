import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from '../../style';

function Conformation({route, navigation}): JSX.Element {
  const {itemId, otherParam} = route.params;
  return (
    <SafeAreaView style={styles.ContentView}>
      <View style={styles.logoutCont}>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      </View>
    </SafeAreaView>
  );
}
export default Conformation;
