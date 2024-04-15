import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../style';
function SignUp({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);

    return false;
  }, 1000);
  // FETCH STORAGE ID OF CUSTOMER
  // GET INPUT FIELD
  const [customerName, setCustomerName] = useState('');
  const [customerLName, setCustomerLName] = useState('');
  const [emailId, setEmail] = useState('');
  const [mobileId, setMobile] = useState('');
  const FetchStorageData = async () => {
    const mobileNumber = await AsyncStorage.getItem('mobile');
    const mobileID = mobileNumber;
    const dashboardUrl =
      'https://complyify.in/taxConsultant/tax/mobile-count-api-v1';
    let resultD = await fetch(dashboardUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileID,
      }),
    });
    let getResultDash = await resultD.json();
    if (getResultDash.status === 'Fetched') {
      AsyncStorage.setItem('userId', getResultDash.uniqid);
      navigation.navigate('ServicesView');
    } else {
      navigation.navigate('SignUp');
    }
    setMobile(mobileNumber);
  };
  FetchStorageData();

  const [errorName, setErrorName] = useState(false);
  const [errorLName, setErrorLName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  // Validation

  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);
  function generateRandom21DigitNumber() {
    // Get the minimum and maximum number of 21 digits in variable min and max respectively.
    const min = 1000000000;
    const max = 9999999999;

    // Generate a random number using Math.random()(value lies between 0 and 1).
    const randomNum = Math.random();
    // Multiply the number by (max-min+1), get its floor value and then add min value to it.
    const randomNumber = Math.floor(randomNum * (max - min + 1)) + min;

    // Return the random number.
    return randomNumber;
  }
  const submit = async () => {
    try {
      // SET USER DATA
      const uniqidG = generateRandom21DigitNumber();
      const uniqid = uniqidG.toString();
      const loginWith = 'Mobile Number';
      const familyName = customerLName;
      const givenName = customerName;
      const name = customerName + ' ' + customerLName;
      const photo =
        'https://complyify.in/taxConsultant/assets/img/avatars/user.png';
      const email = emailId;
      const uniqidMobile = await AsyncStorage.getItem('uidMobile');
      const mobile = mobileId;

      // SET ASYNC STORAGE
      AsyncStorage.setItem('userId', uniqid);
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('name', name);
      AsyncStorage.setItem('photo', photo);
      // API CALL
      const loginUrl =
        'https://complyify.in/taxConsultant/tax/mobile-login-api-v1';
      let result = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          uniqid,
          loginWith,
          email,
          familyName,
          givenName,
          name,
          photo,
          mobile,
          uniqidMobile,
        }),
      });
      let getResultEx = await result.json();
      if (getResultEx) {
        console.log(getResultEx);
      } else {
        console.log('Internal Failure. Contact to Tech Team');
      }
      console.log(
        JSON.stringify({
          uniqid,
          loginWith,
          email,
          familyName,
          givenName,
          name,
          photo,
          mobile,
          uniqidMobile,
        }),
      );
      // Navigate
      navigation.navigate('ServicesView');
    } catch (err) {
      console.log('error: ' + err);
    }
  };
  // DOCUMENT PICK
  // Validation
  const validation = async () => {
    let sampleRegEmail: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!customerName) {
      setErrorName(true);
      setErrorLName(false);
      setErrorEmail(false);
      return false;
    } else if (customerName.length < 3) {
      setErrorName(true);
      setErrorLName(false);
      setErrorEmail(false);
      return false;
    } else {
      setErrorName(false);
      setErrorLName(false);
      setErrorEmail(false);
    }
    if (!customerLName) {
      setErrorLName(true);
      setErrorName(false);
      setErrorEmail(false);
      return false;
    } else if (customerLName.length < 3) {
      setErrorLName(true);
      setErrorName(false);
      setErrorEmail(false);
      return false;
    } else {
      setErrorLName(false);
      setErrorName(false);
      setErrorEmail(false);
    }
    if (!emailId) {
      setErrorEmail(true);
      setErrorLName(false);
      setErrorName(false);
      return false;
    } else if (!sampleRegEmail.test(emailId)) {
      setErrorEmail(true);
      setErrorLName(false);
      setErrorName(false);
      return false;
    } else {
      setErrorEmail(false);
      setErrorLName(false);
      setErrorName(false);
      submit();
      setTimeout(() => {
        setFormLoading(false);
      }, 2000);
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
              color={'#745bff'}
            />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.formSingupdiv}>
              <Text style={styles.signupHeadForm}>Create Account</Text>
              <Text style={styles.signupHead2}>Signup to get started.</Text>
            </View>
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
                <View style={styles.datePicker}>
                  {errorName ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid First Name
                    </Text>
                  ) : null}
                  {errorLName ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Last Name
                    </Text>
                  ) : null}
                  {errorEmail ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Email Address
                    </Text>
                  ) : null}

                  <Text style={styles.Lable}>First Name</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter First Name"
                    autoCapitalize="words"
                    maxLength={28}
                    inputMode="text"
                    value={customerName}
                    onChangeText={text => setCustomerName(text)}
                  />
                  <Text style={styles.Lable}>Last Name</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter Last Name"
                    autoCapitalize="words"
                    maxLength={28}
                    inputMode="text"
                    value={customerLName}
                    onChangeText={text => setCustomerLName(text)}
                  />
                  <Text style={styles.Lable}>Email Address</Text>
                  <TextInput
                    style={styles.inputPass}
                    autoCapitalize="none"
                    placeholder="Email Address"
                    inputMode="email"
                    keyboardType="phone-pad"
                    value={emailId}
                    onChangeText={text => setEmail(text)}
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
export default SignUp;
