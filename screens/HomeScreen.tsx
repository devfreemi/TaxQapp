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
import RazorpayCheckout from 'react-native-razorpay';
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
  const [orderId, setOrderId] = useState('');
  const [productName, setProductName] = useState('');
  const [payeeName, setPayeeName] = useState('');
  const [payeeEmail, setPayeeEmail] = useState('');
  const [payeeMobile, setPayeeMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [amountUI, setAmountUI] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [appId, setAppID] = useState('555');
  // const [err, setErr] = useState(false);
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

    let getResultPayment = await resultPaymet.json();
    if (getResultPayment) {
      setAmount(getResultPayment.Amount);
      setAmountUI(getResultPayment.AmountUI);
      setOrderId(getResultPayment.OrderId);
      setProductName(getResultPayment.product);
      setPayeeName(getResultPayment.Name);
      setPayeeEmail(getResultPayment.Email);
      setPayeeMobile(getResultPayment.Mobile);
      setPaymentStatus(getResultPayment.status);
      setAppID(getResultPayment.applicationId);
      console.log(getResultPayment);
    }
  };
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1500);

  const pay = async () => {
    var options = {
      description: 'Credits towards consultation',
      image:
        'https://complyify.in/taxConsultant/assets/img/icons/brands/appLogo.png',
      currency: 'INR',
      key: 'rzp_test_nM0gkKKYwEqjex',
      amount: amount,
      name: 'Complyify',
      order_id: orderId,
      prefill: {
        email: payeeEmail,
        contact: payeeMobile,
        name: payeeName,
      },
      theme: {color: '#745bff'},
    };
    RazorpayCheckout.open(options)
      .then(async dataPay => {
        console.log(JSON.stringify(dataPay));
        const razorpay_signature_id = dataPay.razorpay_signature;
        const razorpay_order_res = dataPay.razorpay_order_id;
        const razorpay_payment_res = dataPay.razorpay_payment_id;
        const paymentResUrl =
          'https://complyify.in/taxConsultant/tax/payment-response-api-v1';
        let resultPaymetres = await fetch(paymentResUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_signature_id,
            razorpay_order_res,
            razorpay_payment_res,
            appId,
          }),
        });
        let getResultPaymentRes = await resultPaymetres.json();
        console.log(getResultPaymentRes);
        // handle success
      })
      .catch(error => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };
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
                <Text style={styles.paymentText}>Pending Payments</Text>
              </View>

              {paymentStatus === 'created' ? (
                <View style={[styles.homeGridView3]}>
                  <View style={[styles.elevationPro, styles.cardI]}>
                    <Text style={styles.itemPay}>{productName}</Text>
                    <Text style={styles.itemPayAmount}>Rs. {amountUI}.00</Text>

                    <View style={styles.innerViewPay}>
                      <TouchableOpacity style={styles.buttonPayReject}>
                        <View>
                          <Text style={styles.rejectText}>Reject</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.buttonPay} onPress={pay}>
                        <View>
                          <Text style={styles.submitText}>Pay</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : paymentStatus === 'Payment Success' ? (
                <View style={[styles.homeGridView3]}>
                  <View style={[styles.elevationPro, styles.cardI]}>
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
                  </View>
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
