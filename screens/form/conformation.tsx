import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import styles from '../../style';
function Conformation({route, navigation}): JSX.Element {
  const {
    appId,
    status,
    category,
    amount,
    amountUI,
    OrderId,
    Receipt,
    statusPayment,
    name,
    mobile,
    emailId,
  } = route.params;
  const statusText = JSON.stringify(status);
  const statusTextString = statusText.replace(/\"/g, '');
  const date = new Date().toLocaleString();
  const product = JSON.stringify(category);
  const pay = async () => {
    var options = {
      description: 'Credits towards consultation',
      image:
        'https://complyify.in/taxConsultant/assets/img/icons/brands/appLogo.png',
      currency: 'INR',
      key: 'rzp_test_nM0gkKKYwEqjex',
      amount: amount,
      name: 'Complyify',
      order_id: OrderId,
      prefill: {
        email: emailId,
        contact: mobile,
        name: name,
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
      .catch(error => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };
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
                ) : product === '4' ? (
                  <Text style={styles.paramStatus}>Company Incorporation</Text>
                ) : product === '5' ? (
                  <Text style={styles.paramStatus}>Corporate Compliance</Text>
                ) : product === '6' ? (
                  <Text style={styles.paramStatus}>GST Registration</Text>
                ) : product === '7' ? (
                  <Text style={styles.paramStatus}>Trade License</Text>
                ) : product === '8' ? (
                  <Text style={styles.paramStatus}>Trademark Registration</Text>
                ) : null}
              </View>
            </View>
            {statusPayment === 'created' ? (
              <>
                <Text style={styles.paramHead}>Application Fees</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>Rs. {amountUI}.00</Text>
                  </View>
                </View>
                <Text style={styles.paramHead}>Receipt Number</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>{Receipt}</Text>
                  </View>
                </View>
              </>
            ) : statusPayment === 'Payment Success' ? (
              <>
                <Text style={styles.paramHead}>Payment</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>Payment Completed</Text>
                  </View>
                </View>
              </>
            ) : statusPayment === 'Payment Failed' ? (
              <>
                <Text style={styles.paramHead}>Payment</Text>
                <View style={styles.itemStatus}>
                  <View>
                    <Text style={styles.paramStatus}>{statusPayment}</Text>
                  </View>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </View>

      {statusPayment === 'created' ? (
        <>
          <View>
            <Text style={styles.condition}>
              Simplify Your Transactions: Pay Application Fees with Ease
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonCos} onPress={pay}>
            <View>
              <Text style={styles.submitText}>Pay</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View>
            <Text style={styles.conditionPayment}>
              Your Last Payment is Successfully Completed.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonCos}
            onPress={() => navigation.navigate('Dashboard')}>
            <View>
              <Text style={styles.submitText}>Home</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}
export default Conformation;
