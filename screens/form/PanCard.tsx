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
function PanCard({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);

    return false;
  }, 1000);
  // RADIO Button
  const [selectRadio, setRadio] = useState('Individuals');
  // FETCH STORAGE ID OF CUSTOMER
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
  const [adhar, setAdhar] = useState('');

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
    setMobile(getResultProfile.mobile);
  };
  // PRODUCT CODE
  const productID = 8;

  // Validation
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorAdhar, setErrorAdhar] = useState(false);
  const [tandc, setTandC] = useState(false);

  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://complyify.in/taxConsultant/tax/license-api-pan-v1';
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
          selectRadio,
          adhar,
          company,
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
    let sampleRegExAadhaar: RegExp = /[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    if (selectRadio === 'Non Individual') {
      if (!company) {
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(true);
        setTandC(false);
        setErrorAdhar(false);
        return false;
      } else if (company.length < 5) {
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(true);
        setTandC(false);
        setErrorAdhar(false);
        return false;
      } else {
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        setErrorAdhar(false);
      }
      if (!customerName) {
        setErrorName(true);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        setErrorAdhar(false);
        return false;
      } else if (customerName.length < 5) {
        setErrorName(true);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        setErrorAdhar(false);
        return false;
      } else {
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        setErrorAdhar(false);
      }
      if (isEnabled === false) {
        setErrorName(false);
        setTandC(true);
        setErrorMobile(false);
        setErrorAdhar(false);
        setErrorCompany(false);
        return false;
      } else {
        setTandC(false);
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setErrorAdhar(false);
      }
      if (!mobile) {
        setErrorName(false);
        setErrorMobile(true);
        setTandC(false);
        setErrorCompany(false);
        setErrorAdhar(false);
        return false;
      } else if (mobile.length < 10) {
        setErrorName(false);
        setErrorMobile(true);
        setTandC(false);
        setErrorCompany(false);
        setErrorAdhar(false);
        return false;
      } else {
        setFormLoading(true);
        setErrorName(false);
        setErrorCompany(false);
        setErrorAdhar(false);
        setErrorMobile(false);
        setTandC(false);
        submit();
        setTimeout(() => {
          setFormLoading(false);
        }, 2000);
      }
    } else {
      if (!customerName) {
        setErrorName(true);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        setErrorAdhar(false);
        return false;
      } else if (customerName.length < 5) {
        setErrorName(true);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        setErrorAdhar(false);
        return false;
      } else {
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        setErrorAdhar(false);
      }
      if (!adhar) {
        setErrorAdhar(true);
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        return false;
      } else if (adhar.length < 10) {
        setErrorAdhar(true);
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        return false;
      } else if (!sampleRegExAadhaar.test(adhar)) {
        setErrorAdhar(true);
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
        return false;
      } else {
        setErrorAdhar(false);
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setTandC(false);
      }
      if (isEnabled === false) {
        setErrorName(false);
        setTandC(true);
        setErrorMobile(false);
        setErrorAdhar(false);
        setErrorCompany(false);
        return false;
      } else {
        setTandC(false);
        setErrorName(false);
        setErrorMobile(false);
        setErrorCompany(false);
        setErrorAdhar(false);
      }
      if (!mobile) {
        setErrorName(false);
        setErrorMobile(true);
        setTandC(false);
        setErrorCompany(false);
        setErrorAdhar(false);
        return false;
      } else if (mobile.length < 10) {
        setErrorName(false);
        setErrorMobile(true);
        setTandC(false);
        setErrorCompany(false);
        setErrorAdhar(false);
        return false;
      } else {
        setFormLoading(true);
        setErrorName(false);
        setErrorCompany(false);
        setErrorAdhar(false);
        setErrorMobile(false);
        setTandC(false);
        submit();
        setTimeout(() => {
          setFormLoading(false);
        }, 2000);
      }
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
                source={require('../../assets/images/pan.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>Pan Card Application</Text>
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
                  {errorAdhar ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Aadhaar Number
                    </Text>
                  ) : null}
                  {tandc ? (
                    <Text style={styles.errorMsg}>
                      Please Accept Terms and Conditions!
                    </Text>
                  ) : null}
                  {errorCompany ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Company Name
                    </Text>
                  ) : null}
                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      style={styles.Radio}
                      onPress={() => setRadio('Individuals')}>
                      <View style={styles.radioWrap}>
                        <View style={styles.radioButton}>
                          {selectRadio === 'Individuals' ? (
                            <View style={styles.radioInner}></View>
                          ) : null}
                        </View>
                        <Text style={styles.radioText}>Individuals</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.Radio}
                      onPress={() => setRadio('Non Individual')}>
                      <View style={styles.radioWrap}>
                        <View style={styles.radioButton}>
                          {selectRadio === 'Non Individual' ? (
                            <View style={styles.radioInner}></View>
                          ) : null}
                        </View>
                        <Text style={styles.radioText}>Non Individual</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {selectRadio === 'Non Individual' ? (
                    <View>
                      <Text style={styles.Lable}>Company</Text>
                      <TextInput
                        style={styles.inputPass}
                        placeholder="Enter Name"
                        autoCapitalize="characters"
                        maxLength={28}
                        inputMode="text"
                        value={company}
                        onPressIn={focus}
                        onChangeText={text => setCompany(text)}
                      />
                    </View>
                  ) : null}
                  <Text style={styles.Lable}>Name</Text>
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
                  {selectRadio === 'Individuals' ? (
                    <View>
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
                    </View>
                  ) : null}

                  {selectRadio === 'Non Individual' ? (
                    <View>
                      <Text style={styles.Lable}>Required Documents</Text>
                      <Text style={styles.list}>1. Partnership deed</Text>
                      <Text style={styles.list}>2. Club & Society</Text>
                      <Text style={styles.list}>
                        3. Registration certificate
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.Lable}>Required Documents</Text>
                      <Text style={styles.list}>1. Two copy photo</Text>
                      <Text style={styles.list}>2. Aadhar card</Text>
                    </View>
                  )}

                  <View style={styles.container}>
                    <Switch
                      trackColor={{false: '#767577', true: '#745bff'}}
                      thumbColor={isEnabled ? '#0a0099' : '#f4f3f4'}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                    <Text style={styles.condition}>
                      Our executive will ask you some documents{'\n'}over Email
                      / Mobile.
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
export default PanCard;
