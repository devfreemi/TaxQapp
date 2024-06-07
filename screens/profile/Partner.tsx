import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../style';
function Partner({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);

    return false;
  }, 1000);
  // FETCH STORAGE ID OF CUSTOMER
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pan, setPan] = useState('');
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
    setEmail(getResultProfile.email);
    setMobile(getResultProfile.mobile);
  };

  // Validation
  const [errorName, setErrorName] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPan, setErrorPan] = useState(false);
  const [tandc, setTandC] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://complyify.in/taxConsultant/tax/partner-api-v1';
      let result = await fetch(serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          customerID,
          customerName,
          email,
          mobile,
          pan,
        }),
      });

      let getResultEx = await result.json();
      console.log(getResultEx);
      if (getResultEx) {
        // console.log(getResultEx);
        navigation.navigate('Partner Application', {
          agentID: getResultEx.agentID,
          statusCode: getResultEx.statusCode,
        });
      } else {
        console.log('Internal Failure. Contact to Tech Team');
      }
    } catch (err) {
      console.log('error: ' + err);
    }
  };
  // DOCUMENT PICK
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // Validation
  const validation = async () => {
    if (!customerName) {
      setErrorName(true);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
      return false;
    } else if (customerName.length < 5) {
      setErrorName(true);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
      return false;
    } else {
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
    }
    if (!mobile) {
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(true);
      setTandC(false);
      return false;
    } else if (mobile.length < 10) {
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(true);
      setTandC(false);
      return false;
    } else {
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
    }
    if (isEnabled === false) {
      setErrorName(false);
      setErrorEmail(false);
      setTandC(true);
      setErrorMobile(false);
      return false;
    } else {
      setTandC(false);
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
    }

    if (!email) {
      setErrorName(false);
      setErrorEmail(true);
      setErrorMobile(false);
      setTandC(false);
      return false;
    } else {
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
    }
    let sampleRegEx: RegExp = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    if (!pan) {
      setErrorPan(true);
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
      return false;
    } else if (pan.length < 10) {
      setErrorPan(true);
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
      return false;
    } else if (!sampleRegEx.test(pan)) {
      setErrorPan(true);
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorPan(false);
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
      setErrorPan(false);
      submit();
      setTimeout(() => {
        setFormLoading(false);
      }, 2800);
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
            <View style={styles.formImagedivPertner}>
              <Image
                source={require('../../assets/images/partnerMod.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>Join With Us</Text>
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
                <Text style={styles.reportHead2}>Enter Your Details Here</Text>
                <View style={styles.datePicker}>
                  {errorName ? (
                    <Text style={styles.errorMsg}>Please Enter Valid Name</Text>
                  ) : null}
                  {errorMobile ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Mobile Number
                    </Text>
                  ) : null}
                  {errorEmail ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Email Id
                    </Text>
                  ) : null}
                  {tandc ? (
                    <Text style={styles.errorMsg}>
                      Please Agree Terms and Conditions!
                    </Text>
                  ) : null}
                  {errorPan ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid PAN Number
                    </Text>
                  ) : null}
                  <Text style={styles.Lable}>Contact Person Name</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter Name"
                    autoCapitalize="characters"
                    maxLength={28}
                    inputMode="text"
                    value={customerName}
                    onPressIn={focus}
                    onChangeText={text => setCustomerName(text)}
                  />
                  <Text style={styles.Lable}>Email</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Email Address"
                    maxLength={64}
                    inputMode="text"
                    value={email}
                    onChangeText={text => setEmail(text)}
                  />
                  <Text style={styles.Lable}>Mobile</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Mobile Number"
                    maxLength={14}
                    inputMode="tel"
                    keyboardType="phone-pad"
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                  />
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
                  <View style={styles.containerPartner}>
                    <Switch
                      trackColor={{false: '#767577', true: '#745bff'}}
                      thumbColor={isEnabled ? '#0a0099' : '#f4f3f4'}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                    <Text style={styles.condition}>
                      Our executive will ask you for all above the documents
                      over Email / Mobile.
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.buttonReport}
                    onPress={validation}>
                    <View>
                      <Text style={styles.submitText}>
                        Get Detailed Quotes Now
                      </Text>
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
export default Partner;
