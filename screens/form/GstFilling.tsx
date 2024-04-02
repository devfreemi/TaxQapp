import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../style';
function GstFilling({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);

    return false;
  }, 1000);
  // FETCH STORAGE ID OF CUSTOMER
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const FetchStorageData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setCustomerID(userId);
  };
  FetchStorageData();
  // PRE DATA CHECK
  const FetchStorageDataSer = async () => {
    const customerIDP = await AsyncStorage.getItem('userId');
    const profileUrl = 'https://complyify.in/taxConsultant/tax/profile-api-v1';
    let resultDlist = await fetch(profileUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerIDP,
      }),
    });
    let getResultProfile = await resultDlist.json();
    console.log(getResultProfile.name);
    setCustomerName(getResultProfile.name);
  };
  // PRODUCT CODE
  const productID = 2;
  // GET INPUT FIELD
  const [gst, setGst] = useState('');
  const [trade, setTrade] = useState('');
  // Validation
  const [errorTrade, setErrorTrade] = useState(false);
  const [errorGst, setErrorGst] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://complyify.in/taxConsultant/tax/service-api-gst-v1';
      let result = await fetch(serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          productID,
          customerID,
          trade,
          gst,
          customerName,
        }),
      });

      let getResultEx = await result.json();
      console.log(getResultEx);
      if (getResultEx) {
        console.log(getResultEx);
        navigation.navigate('Application Status', {
          appId: getResultEx.uniqid,
          status: getResultEx.status,
          category: getResultEx.product_id,
        });
      } else {
        console.log('Internal Failure. Contact to Tech Team');
      }
    } catch (err) {
      console.log('error: ' + err);
    }
  };
  // DOCUMENT PICK
  // Validation
  const validation = async () => {
    let sampleRegEx: RegExp =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gst) {
      setErrorGst(true);
      setErrorTrade(false);

      return false;
    } else if (gst.length < 15) {
      setErrorGst(true);
      setErrorTrade(false);

      return false;
    } else if (!sampleRegEx.test(gst)) {
      setErrorGst(true);
      setErrorTrade(false);

      return false;
    } else {
      setErrorMsg(false);
      setErrorGst(false);
    }
    if (!trade) {
      setErrorTrade(true);
      setErrorGst(false);
      return false;
    } else if (trade.length < 5) {
      setErrorTrade(true);
      setErrorGst(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorMsg(false);
      setErrorTrade(false);
      submit();
      setTimeout(() => {
        setFormLoading(false);
      }, 15000);
    }
  };
  const focus = async () => {
    setCustomerName('');
    FetchStorageDataSer();
  };
  return (
    <SafeAreaView style={styles.ContentViewReport}>
      <View>
        {isLoading ? (
          <View style={styles.ContentViewHomeChild}>
            <ActivityIndicator
              animating={isLoading}
              size={'small'}
              style={styles.StyleIndicator}
              color={'#6e63ff'}
            />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.formImagediv}>
              <Image
                source={require('../../assets/images/gst.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>GST Return</Text>
            {isFormLoading ? (
              <View style={styles.TableLoading}>
                <ActivityIndicator
                  animating={isFormLoading}
                  size={'small'}
                  style={styles.StyleIndicator}
                  color={'#6e63ff'}
                />

                <Text style={styles.loadingText}>
                  Your Application is in the Queue!
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.reportHead2}>
                  Enter Your Financial Details
                </Text>
                <View style={styles.datePicker}>
                  {errorGst ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid GST No.
                    </Text>
                  ) : null}
                  {errorTrade ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Trade Name
                    </Text>
                  ) : null}
                  {errorMsg ? (
                    <Text style={styles.errorMsg}>
                      Your Login Username or Password is Invalid
                    </Text>
                  ) : null}

                  <Text style={styles.Lable}>GST Number</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter GST Number"
                    autoCapitalize="characters"
                    maxLength={15}
                    inputMode="text"
                    value={gst}
                    onPressIn={focus}
                    onChangeText={text => setGst(text)}
                  />
                  <Text style={styles.Lable}>Trade Name</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter Your Trade Name"
                    autoCapitalize="characters"
                    maxLength={64}
                    inputMode="text"
                    value={trade}
                    onChangeText={text => setTrade(text)}
                  />

                  <TouchableOpacity
                    style={styles.buttonReport}
                    onPress={validation}>
                    <View>
                      <Text style={styles.submitText}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
export default GstFilling;
