/* eslint-disable react/no-unstable-nested-components */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
// import {LineChart} from 'react-native-chart-kit';
import styles from '../style';
function HomeScreen({navigation}): JSX.Element {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Stop', 'Are you sure You want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, []);
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1500);
  return (
    <SafeAreaView style={styles.ContentViewHome}>
      <View>
        {isLoading ? (
          <View style={styles.ContentViewHomeChild}>
            <ActivityIndicator
              animating={isLoading}
              size={'large'}
              style={styles.StyleIndicator}
              color={'#2E5AAB'}
            />
          </View>
        ) : (
          <>
            <ScrollView>
              <View style={styles.homeGridView}>
                <View style={[styles.card]}>
                  <View style={styles.viewElementsInnerF2}>
                    <Text style={styles.innerTextViewHead}>Your Services</Text>
                    <View style={styles.viewElements}>
                      <Text style={styles.innerTextView}>Services</Text>
                      <Text style={styles.innerTextViewStatus}>02</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.services}>
                <Text style={styles.serviceText}>Services</Text>
              </View>
              <View style={styles.homeGridView2}>
                <View style={styles.viewTableData}>
                  <Text style={styles.item}>GST Filling</Text>
                  <View style={styles.itemStatus}>
                    <View style={styles.itemStatusInnerPending}>
                      <Text style={styles.itemStatusTextPending}>Pending</Text>
                    </View>
                  </View>
                  <Text style={styles.item}>Income Tax Audit</Text>
                  <View style={styles.itemStatus}>
                    <View style={styles.itemStatusInnerActive}>
                      <Text style={styles.itemStatusTextActive}>Active</Text>
                    </View>
                  </View>
                </View>
                {/* <View style={styles.tableTDHeadErr}>
                  <View style={styles.viewTableHeadErr}>
                    <Text style={styles.itemHeadAll}>
                      You haven't any active service.
                    </Text>
                  </View>
                </View> */}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
// Backhandler

export default HomeScreen;
