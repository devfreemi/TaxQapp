/* eslint-disable react/no-unstable-nested-components */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
// import {LineChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const [productName, setProductName] = useState('');
  const [amountUI, setAmountUI] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [jobID, setJobID] = useState('');
  const [data, setData] = useState([]);
  const FetchDashApi = async () => {
    const customerID = await AsyncStorage.getItem('userId');
    const dashboardUrl =
      'https://complyify.in/taxConsultant/tax/dashboard-api-v1';
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
    if (getResultDash.status === 201) {
      setTotalSer('0');
    } else {
      setTotalSer(getResultDash.product);
    }
  };

  const FetchDashListApi = async () => {
    FetchDashApi();
    const customerIDL = await AsyncStorage.getItem('userId');
    const dashboardListUrl =
      'https://complyify.in/taxConsultant/tax/dashboard-api-service-list-v1';
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
    if (getResultDashList.statusCode !== 200) {
      setData(getResultDashList);
    }
  };
  const FetchPaymentApi = async () => {
    const customerIPL = await AsyncStorage.getItem('userId');
    const paymentUrl = 'https://complyify.in/taxConsultant/tax/payment-api-v1';
    let resultPaymet = await fetch(paymentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerIPL,
      }),
    });
    console.log(
      JSON.stringify({
        customerIPL,
      }),
    );

    let getResultPayment = await resultPaymet.json();
    if (getResultPayment) {
      setAmountUI(getResultPayment.AmountUI);
      setProductName(getResultPayment.product);
      setPaymentStatus(getResultPayment.status);
      setJobID(getResultPayment.applicationId);
      console.log(getResultPayment);
    }
  };
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1500);

  const refresh = async () => {
    FetchDashListApi();
    FetchPaymentApi();
    FetchDashApi();
  };
  if (isLoading) {
    FetchDashListApi();
    FetchPaymentApi();
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
              color={'#745bff'}
            />
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.homeGridView} onPress={refresh}>
              <View style={[styles.card]}>
                {/* <Ionicons
                  name="refresh-outline"
                  size={18}
                  color={'#ffffff'}
                  style={styles.refresh}
                /> */}
                <View style={styles.viewElementsInnerF2}>
                  <Text style={styles.innerTextViewHead}>Your Services</Text>
                  <View style={styles.viewElements}>
                    <Text style={styles.innerTextView}>Total Services</Text>
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
                        ) : item.status === 'New Customer' ? (
                          <View style={styles.itemStatusInnerApproved}>
                            <Text style={styles.itemStatusTextApproved}>
                              Submitted
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.noService}>
                  You have not choose any service!{' '}
                </Text>
              )}
            </View>
            <ScrollView>
              <View style={styles.paymentDiv}>
                <Text style={styles.paymentText}>Payments</Text>
              </View>

              {paymentStatus === 'Payment Success' ? (
                <View style={[styles.homeGridView3]}>
                  <TouchableOpacity
                    style={[styles.elevationPro, styles.cardI]}
                    onPress={() => navigation.navigate('Applications')}>
                    <Text style={styles.itemPay}>{productName}</Text>
                    <Text style={styles.itemPayAmountRev}>
                      Rs. {amountUI}.00
                    </Text>
                    <View style={styles.innerViewPay}>
                      <Ionicons
                        name="ellipse"
                        size={14}
                        color={'#18b47a'}
                        style={styles.dot}
                      />
                      <Text style={styles.paymentR}>
                        Your Last payment is Successfull !
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : paymentStatus === 'Signature Verification Failed' ? (
                <View style={[styles.homeGridView3]}>
                  <TouchableOpacity
                    style={[styles.elevationPro, styles.cardI]}
                    onPress={() => navigation.navigate('Applications')}>
                    <Text style={styles.itemPay}>{productName}</Text>
                    <Text style={styles.itemPayAmountRev}>
                      Rs. {amountUI}.00
                    </Text>
                    <View style={styles.innerViewPay}>
                      <Ionicons
                        name="ellipse"
                        size={14}
                        color={'#dc143c'}
                        style={styles.dot}
                      />
                      <Text style={styles.paymentR}>
                        Your Last payment is Failled !
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.noService}>
                  You have not any pending payments.
                </Text>
              )}
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
// Backhandler

export default HomeScreen;
