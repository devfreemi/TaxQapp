import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style';
function ApplicationView({route, navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const {jobId, product, product_image} = route.params;
  const [status, setStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [receipt, setReceipt] = useState('');
  const [amount, setAmount] = useState('');
  const [amountUi, setAmountUi] = useState('');
  const [payeeName, setPayeeName] = useState('');
  const [payeeEmail, setPayeeEmail] = useState('');
  const [payeeMobile, setPayeeMobile] = useState('');
  const [dateTime, setdatetime] = useState('');
  const FetchApplication = async () => {
    const jobID = jobId;
    const applicationUrl =
      'https://complyify.in/taxConsultant/tax/application-api-view-v1';
    let resultApplicationlist = await fetch(applicationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobID,
      }),
    });
    let result = await resultApplicationlist.json();

    if (result.status === 'Fetched') {
      setStatus(result.applicationStatus);
      setPaymentStatus(result.paymentStatus);
      setOrderId(result.orderID);
      setReceipt(result.receipt);
      setAmount(result.amount);
      setAmountUi(result.AmountUI);
      setPayeeName(result.name);
      setPayeeEmail(result.email);
      setPayeeMobile(result.mobile);
      setdatetime(result.dateTime);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchApplication();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  FetchApplication();
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1000);
  const pay = async () => {
    const appId = jobId;
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
        navigation.navigate('Dashboard');
      })
      .catch(async error => {
        // handle failure
        const razorpay_signature_id = error.error.reason;
        const razorpay_order_res = orderId;
        const razorpay_payment_res = error.error.reason;
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
        navigation.navigate('Application');
      });
  };
  return (
    <SafeAreaView style={styles.ContentViewAppl}>
      <View>
        {isLoading ? (
          <View style={styles.ContentViewHomeChild}>
            <ActivityIndicator
              animating={isLoading}
              size={'small'}
              style={styles.StyleIndicator}
              color={'#745bff'}
            />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.applImagediv}>
              <Image source={{uri: product_image}} style={styles.formImage} />
            </View>
            <Text style={styles.reportHeadForm}>{product}</Text>
            <View style={styles.homeGridViewAppl}>
              <View style={styles.viewTableData}>
                <Text style={styles.paramHead}>Application Number</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>{jobId}</Text>
                  </View>
                </View>
                <Text style={styles.paramHead}>Application Status</Text>
                <View style={styles.itemStatus}>
                  <View>
                    {status === 'New Customer' ? (
                      <Text style={styles.paramStatusSubmit}>Submitted</Text>
                    ) : status === 'Rejected' ? (
                      <Text style={styles.paramStatusFail}>{status}</Text>
                    ) : (
                      <Text style={styles.paramStatusSuccess}>{status}</Text>
                    )}
                  </View>
                </View>
                <Text style={styles.paramHead}>Payment Status</Text>
                <View style={styles.itemStatus}>
                  <View>
                    {paymentStatus === 'Payment Success' ? (
                      <Text style={styles.paramStatusSuccess}>
                        {paymentStatus}
                      </Text>
                    ) : paymentStatus === 'Payment Failed' ? (
                      <Text style={styles.paramStatusFail}>
                        {paymentStatus}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>

              <View style={styles.viewTableData}>
                <Text style={styles.reportApllText}>Payment Details</Text>
              </View>
              <View style={styles.viewTableData}>
                <Text style={styles.paramHead}>Order Id</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>{orderId}</Text>
                  </View>
                </View>
                <Text style={styles.paramHead}>Receipt</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>{receipt}</Text>
                  </View>
                </View>
                <Text style={styles.paramHead}>Amount</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>Rs. {amountUi}.00</Text>
                  </View>
                </View>
                <Text style={styles.paramHead}>Date</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>{dateTime}</Text>
                  </View>
                </View>
              </View>
            </View>
            {paymentStatus === 'Payment Failed' ? (
              <View style={[styles.homeGridView3]}>
                <View style={[styles.elevationPro, styles.cardI]}>
                  <Text style={styles.itemPay}>{product}</Text>
                  <Text style={styles.itemPayAmount}>Rs. {amountUi}.00</Text>

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
                  <View style={styles.innerViewPay}>
                    <Ionicons
                      name="ellipse"
                      size={14}
                      color={'#DC143C'}
                      style={styles.dot}
                    />
                    <Text style={styles.paymentR}>
                      Your Last payment is Failed !
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
export default ApplicationView;
