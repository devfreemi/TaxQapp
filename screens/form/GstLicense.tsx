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
function GstLicense({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);

    return false;
  }, 1000);
  // RADIO Button
  const [selectRadio, setRadio] = useState('Proprietorship');
  // FETCH STORAGE ID OF CUSTOMER
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  // const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
  const FetchStorageData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setCustomerID(userId);
  };
  FetchStorageData();

  // PRE DATA CHECK
  const FetchStorageDataSer = async () => {
    const customerIDP = await AsyncStorage.getItem('userId');
    const profileUrl =
      'https://truetechnologies.in/taxConsultant/tax/profile-api-v1';
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
    setMobile(getResultProfile.mobile);
  };
  // PRODUCT CODE
  const productID = 6;

  // Validation
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [tandc, setTandC] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://truetechnologies.in/taxConsultant/tax/license-api-gst-v1';
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
          mobile,
          company,
          selectRadio,
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
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // Validation
  const validation = async () => {
    if (!company) {
      setErrorName(false);
      setErrorMobile(false);
      setErrorCompany(true);
      setTandC(false);
      return false;
    } else if (company.length < 5) {
      setErrorName(false);
      setErrorMobile(false);
      setErrorCompany(true);
      setTandC(false);
      return false;
    } else {
      setErrorName(false);
      setErrorMobile(false);
      setErrorCompany(false);
      setTandC(false);
    }
    if (!customerName) {
      setErrorName(true);
      setErrorCompany(false);
      setErrorMobile(false);
      setTandC(false);
      return false;
    } else if (customerName.length < 5) {
      setErrorName(true);
      setErrorCompany(false);
      setErrorMobile(false);
      setTandC(false);
      return false;
    } else {
      setErrorName(false);
      setErrorCompany(false);
      setErrorMobile(false);
      setTandC(false);
    }

    if (isEnabled === false) {
      setErrorName(false);
      setErrorCompany(false);
      setTandC(true);
      setErrorMobile(false);
      return false;
    } else {
      setTandC(false);
      setErrorName(false);
      setErrorCompany(false);
      setErrorMobile(false);
    }
    if (!mobile) {
      setErrorName(false);
      setErrorCompany(false);
      setErrorMobile(true);
      setTandC(false);
      return false;
    } else if (mobile.length < 10) {
      setErrorName(false);
      setErrorCompany(false);
      setErrorMobile(true);
      setTandC(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorName(false);
      setErrorCompany(false);
      setErrorMobile(false);
      setTandC(false);
      submit();
      setTimeout(() => {
        setFormLoading(false);
      }, 2000);
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
                source={require('../../assets/images/gstReg.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>GST Registration</Text>
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
                  {errorCompany ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Trade Name
                    </Text>
                  ) : null}
                  {tandc ? (
                    <Text style={styles.errorMsg}>
                      Please Accept Terms and Conditions!
                    </Text>
                  ) : null}
                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      style={styles.Radio}
                      onPress={() => setRadio('Proprietorship')}>
                      <View style={styles.radioWrap}>
                        <View style={styles.radioButton}>
                          {selectRadio === 'Proprietorship' ? (
                            <View style={styles.radioInner}></View>
                          ) : null}
                        </View>
                        <Text style={styles.radioText}>Proprietorship</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.Radio}
                      onPress={() => setRadio('Partnership')}>
                      <View style={styles.radioWrap}>
                        <View style={styles.radioButton}>
                          {selectRadio === 'Partnership' ? (
                            <View style={styles.radioInner}></View>
                          ) : null}
                        </View>
                        <Text style={styles.radioText}>Partnership</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.Lable}>Company Name</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter Company Name"
                    autoCapitalize="characters"
                    maxLength={28}
                    inputMode="text"
                    value={company}
                    onChangeText={text => setCompany(text)}
                  />
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

                  <Text style={styles.Lable}>Required Documents</Text>
                  <Text style={styles.list}>
                    1. Electricity Bills of office or Shop of business
                  </Text>
                  <Text style={styles.list}>2. Rent agreement</Text>

                  <View style={styles.container}>
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
export default GstLicense;
