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
function DigitalSignature({navigation}): JSX.Element {
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
  const productID = 3;
  // GET INPUT FIELD
  const [pan, setPan] = useState('');
  const [adhar, setAdhar] = useState('');
  // Validation
  const [errorAdhar, setErrorAdhar] = useState(false);
  const [errorPan, setErrorPan] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://complyify.in/taxConsultant/tax/service-api-dsc-v1';
      let result = await fetch(serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          productID,
          customerID,
          customerName,
          adhar,
          pan,
        }),
      });
      console.log(
        JSON.stringify({
          productID,
          customerID,
          customerName,
          adhar,
          pan,
        }),
      );

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
    let sampleRegEx: RegExp = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    let sampleRegExAadhaar: RegExp = /[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    if (!pan) {
      setErrorPan(true);
      setErrorAdhar(false);

      return false;
    } else if (pan.length < 10) {
      setErrorPan(true);
      setErrorAdhar(false);

      return false;
    } else if (!sampleRegEx.test(pan)) {
      setErrorPan(true);
      setErrorAdhar(false);

      return false;
    } else {
      setErrorMsg(false);
      setErrorPan(false);
    }
    if (!adhar) {
      setErrorAdhar(true);
      setErrorPan(false);
      return false;
    } else if (adhar.length < 10) {
      setErrorAdhar(true);
      setErrorPan(false);
      return false;
    } else if (!sampleRegExAadhaar.test(adhar)) {
      setErrorAdhar(true);
      setErrorPan(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorMsg(false);
      setErrorAdhar(false);
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
              color={'#745bff'}
            />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.formImagediv}>
              <Image
                source={require('../../assets/images/signature.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>Digital Signature</Text>
            {isFormLoading ? (
              <View style={styles.TableLoading}>
                <ActivityIndicator
                  animating={isFormLoading}
                  size={'small'}
                  style={styles.StyleIndicator}
                  color={'#745bff'}
                />

                <Text style={styles.loadingText}>
                  Your Application is in the Queue!
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.reportHead2}>Enter Your Details</Text>
                <View style={styles.datePicker}>
                  {errorPan ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid PAN Number
                    </Text>
                  ) : null}
                  {errorAdhar ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Aadhaar Number
                    </Text>
                  ) : null}
                  {errorMsg ? (
                    <Text style={styles.errorMsg}>
                      Your Login Username or Password is Invalid
                    </Text>
                  ) : null}

                  <Text style={styles.Lable}>PAN Number</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter PAN Number"
                    autoCapitalize="characters"
                    maxLength={10}
                    inputMode="text"
                    value={pan}
                    onPressIn={focus}
                    onChangeText={text => setPan(text)}
                  />
                  <Text style={styles.Lable}>Aadhaar Number</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter Your Trade Name"
                    autoCapitalize="characters"
                    maxLength={12}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    keyboardAppearance="default"
                    value={adhar}
                    onChangeText={text => setAdhar(text)}
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
export default DigitalSignature;
