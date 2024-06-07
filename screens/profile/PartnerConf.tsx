import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../style';
function PartnerConf({route, navigation}): JSX.Element {
  const {agentID, statusCode} = route.params;
  console.log(statusCode);

  const date = new Date().toLocaleString();

  return (
    <SafeAreaView style={styles.ContentViewSuccess}>
      <View style={styles.SuccCont}>
        <Text style={styles.SuccessHead}>Thanks for Choosing Us!</Text>
        <View style={styles.conImagediv}>
          <Image
            source={require('../../assets/images/check.png')}
            style={styles.formImage}
          />
        </View>
        {statusCode === 200 ? (
          <Text style={styles.SuccessHead}>Profile Created</Text>
        ) : statusCode === 301 ? (
          <Text style={styles.SuccessHead}>Profile Alreday Created</Text>
        ) : null}

        <Text style={styles.conHead2}>Thanks for Joining Hand With Us !</Text>

        <View style={styles.homeGridView2}>
          <View style={styles.viewTableData}>
            <Text style={styles.paramHead}>Your Partner ID</Text>
            <View style={styles.itemStatus}>
              <View>
                <Text style={styles.paramStatus}>{agentID}</Text>
              </View>
            </View>
            <Text style={styles.paramHead}>Date / Time</Text>
            <View style={styles.itemStatus}>
              <View>
                <Text style={styles.paramStatus}>{date}</Text>
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
export default PartnerConf;
