import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../style';

function Conformation({route, navigation}): JSX.Element {
  const {appId, status, category} = route.params;
  const statusText = JSON.stringify(status);
  const statusTextString = statusText.replace(/\"/g, '');
  const date = new Date().toLocaleString();
  const product = JSON.stringify(category);

  return (
    <SafeAreaView style={styles.ContentViewSuccess}>
      <View style={styles.SuccCont}>
        <Text style={styles.SuccessHead}>Thanks for using our service !</Text>
        <View style={styles.conImagediv}>
          <Image
            source={require('../../assets/images/check.png')}
            style={styles.formImage}
          />
        </View>
        <Text style={styles.SuccessHead}>{statusTextString}</Text>
        <Text style={styles.conHead2}>Your Happiness Is Our Pleasure</Text>

        <View style={styles.homeGridView2}>
          <View style={styles.viewTableData}>
            <Text style={styles.paramHead}>Application Number</Text>
            <View style={styles.itemStatus}>
              <View>
                <Text style={styles.paramStatus}>{appId}</Text>
              </View>
            </View>
            <Text style={styles.paramHead}>Date / Time</Text>
            <View style={styles.itemStatus}>
              <View>
                <Text style={styles.paramStatus}>{date}</Text>
              </View>
            </View>
            <Text style={styles.paramHead}>Category</Text>
            <View style={styles.itemStatus}>
              <View>
                {product === '1' ? (
                  <Text style={styles.paramStatus}>Income Tax</Text>
                ) : product === '2' ? (
                  <Text style={styles.paramStatus}>GST Return</Text>
                ) : product === '3' ? (
                  <Text style={styles.paramStatus}>Digital Signature</Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonCos}
        onPress={() => navigation.navigate('Dashboard')}>
        <View>
          <Text style={styles.submitText}>Home</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default Conformation;
