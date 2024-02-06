/* eslint-disable react/no-unstable-nested-components */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
// import {LineChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native';
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
  const [totalSer, setTotalSer] = useState('');
  const [data, setData] = useState([]);
  const FetchDashApi = async () => {
    const customerID = await AsyncStorage.getItem('userId');
    const dashboardUrl =
      'https://truetechnologies.in/taxConsultant/tax/dashboard-api-v1';
    let resultD = await fetch(dashboardUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerID,
      }),
    });
    let getResultDash = await resultD.json();
    console.log(getResultDash);
    setTotalSer(getResultDash.product);
  };
  const FetchDashListApi = async () => {
    FetchDashApi();
    const customerIDL = await AsyncStorage.getItem('userId');
    const dashboardListUrl =
      'https://truetechnologies.in/taxConsultant/tax/dashboard-api-service-list-v1';
    let resultDlist = await fetch(dashboardListUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerIDL,
      }),
    });
    let getResultDashList = await resultDlist.json();
    setData(getResultDashList);
  };
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1500);
  if (isLoading) {
    FetchDashListApi();
  }
  return (
    <SafeAreaView style={styles.ContentViewHome}>
      <View>
        {isLoading ? (
          <View style={styles.ContentViewHomeChild}>
            <ActivityIndicator
              animating={isLoading}
              size={'large'}
              style={styles.StyleIndicator}
              color={'#6e63ff'}
            />
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.homeGridView}
              onPress={FetchDashListApi}>
              <View style={[styles.card]}>
                <View style={styles.viewElementsInnerF2}>
                  <Text style={styles.innerTextViewHead}>Your Services</Text>
                  <View style={styles.viewElements}>
                    <Text style={styles.innerTextView}>Services</Text>
                    <Text style={styles.innerTextViewStatus}>{totalSer}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.services}>
              <Text style={styles.serviceText}>Services</Text>
            </View>
            <View style={styles.homeGridView2}>
              {data.length ? (
                <FlatList
                  style={styles.tableTD}
                  data={data}
                  renderItem={({item}) => (
                    <View style={styles.viewTableData}>
                      <Text style={styles.item}>{item.product}</Text>
                      <View style={styles.itemStatus}>
                        {item.status === 'Approved' ? (
                          <View style={styles.itemStatusInnerApproved}>
                            <Text style={styles.itemStatusTextApproved}>
                              {item.status}
                            </Text>
                          </View>
                        ) : item.status === 'Pending' ? (
                          <View style={styles.itemStatusInnerPending}>
                            <Text style={styles.itemStatusTextPending}>
                              {item.status}
                            </Text>
                          </View>
                        ) : item.status === 'Received' ? (
                          <View style={styles.itemStatusInnerApproved}>
                            <Text style={styles.itemStatusTextApproved}>
                              {item.status}
                            </Text>
                          </View>
                        ) : item.status === 'Completed' ? (
                          <View style={styles.itemStatusInnerActive}>
                            <Text style={styles.itemStatusTextActive}>
                              {item.status}
                            </Text>
                          </View>
                        ) : item.status === 'Rejected' ? (
                          <View style={styles.itemStatusInnerReject}>
                            <Text style={styles.itemStatusTextReject}>
                              {item.status}
                            </Text>
                          </View>
                        ) : item.status === 'Pending Payment' ? (
                          <View style={styles.itemStatusInnerPendingPay}>
                            <Text style={styles.itemStatusTextPendingPay}>
                              {item.status}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  )}
                />
              ) : null}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
// Backhandler

export default HomeScreen;
