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
  const FetchStorageData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setCustomerID(userId);
  };
  FetchStorageData();
  // PRODUCT CODE
  const productID = 2;
  // GET INPUT FIELD
  const [pan, setPan] = useState('');
  const [income, setIncome] = useState('');
  // Validation
  const [errorIncome, setErrorIncome] = useState(false);
  const [errorPan, setErrorPan] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://truetechnologies.in/taxConsultant/tax/service-api-gst-v1';
      let result = await fetch(serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          productID,
          customerID,
          income,
          pan,
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
    if (!pan) {
      setErrorPan(true);
      setErrorIncome(false);

      return false;
    } else if (pan.length < 10) {
      setErrorPan(true);
      setErrorIncome(false);

      return false;
    } else {
      setErrorMsg(false);
      setErrorPan(false);
    }
    if (!income) {
      setErrorIncome(true);
      setErrorPan(false);
      return false;
    } else if (income.length < 5) {
      setErrorIncome(true);
      setErrorPan(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorMsg(false);
      setErrorIncome(false);
      submit();
      setTimeout(() => {
        setFormLoading(false);
      }, 15000);
    }
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
                  {errorPan ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid PAN No.
                    </Text>
                  ) : null}
                  {errorIncome ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Income
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
                    placeholder="ADFGH1564C"
                    autoCapitalize="characters"
                    maxLength={10}
                    inputMode="text"
                    value={pan}
                    onChangeText={text => setPan(text)}
                  />
                  <Text style={styles.Lable}>Annual Income</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="10,00,000"
                    autoCapitalize="characters"
                    maxLength={8}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    value={income}
                    onChangeText={text => setIncome(text)}
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
