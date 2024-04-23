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

import {Dropdown} from 'react-native-element-dropdown';
import styles from '../../style';
function TradeMark({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);

    return false;
  }, 1000);

  // FETCH STORAGE ID OF CUSTOMER
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [businessType, setBusinessType] = useState(null);
  const businessDrop = [
    {label: 'Individuals', value: 'Individuals'},
    {label: 'Proprietorship firms', value: 'Proprietorship firms'},
    {label: 'Partnership firms', value: 'Partnership firms'},
    {
      label: 'Limited Liability Partnerships',
      value: 'Limited Liability Partnerships',
    },
    {label: 'Indian companies', value: 'Indian companies'},
    {label: 'Foreign companies', value: 'Foreign companies'},
    {label: 'Trusts', value: 'Trusts'},
    {label: 'Societies', value: 'Societies'},
  ];
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
    setEmail(getResultProfile.email);
  };
  // PRODUCT CODE
  const productID = 8;

  // Validation
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [tandc, setTandC] = useState(false);
  const [businessError, setBusinessError] = useState(false);

  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://complyify.in/taxConsultant/tax/registration-api-trademark-v1';
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
          businessType,
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
          amount: getResultEx.Amount,
          amountUI: getResultEx.AmountUI,
          OrderId: getResultEx.OrderId,
          Receipt: getResultEx.Receipt,
          name: getResultEx.Name,
          mobile: getResultEx.Mobile,
          statusPayment: getResultEx.statusPayment,
          // Prefill by api
          emailId: email,
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
      setErrorMobile(false);
      setErrorCompany(false);
      setTandC(false);
      setBusinessError(false);
      return false;
    } else if (customerName.length < 5) {
      setErrorName(true);
      setErrorMobile(false);
      setErrorCompany(false);
      setTandC(false);
      setBusinessError(false);
      return false;
    } else {
      setErrorName(false);
      setErrorMobile(false);
      setErrorCompany(false);
      setTandC(false);
      setBusinessError(false);
    }
    if (!businessType) {
      setErrorName(false);
      setErrorMobile(false);
      setErrorCompany(false);
      setTandC(false);
      setBusinessError(true);
      return false;
    } else {
      setErrorName(false);
      setErrorMobile(false);
      setErrorCompany(false);
      setTandC(false);
      setBusinessError(false);
    }
    if (isEnabled === false) {
      setErrorName(false);
      setTandC(true);
      setErrorMobile(false);
      setBusinessError(false);
      setErrorCompany(false);
      return false;
    } else {
      setTandC(false);
      setErrorName(false);
      setErrorMobile(false);
      setErrorCompany(false);
      setBusinessError(false);
    }
    if (!mobile) {
      setErrorName(false);
      setErrorMobile(true);
      setTandC(false);
      setErrorCompany(false);
      setBusinessError(false);
      return false;
    } else if (mobile.length < 10) {
      setErrorName(false);
      setErrorMobile(true);
      setTandC(false);
      setErrorCompany(false);
      setBusinessError(false);
      return false;
    } else {
      setErrorName(false);
      setErrorCompany(false);
      setBusinessError(false);
      setErrorMobile(false);
      setTandC(false);
    }
    if (!company) {
      setErrorCompany(true);
      setErrorName(false);
      setErrorMobile(false);
      setTandC(false);
      setBusinessError(false);
      return false;
    } else if (company.length < 5) {
      setErrorCompany(true);
      setErrorName(false);
      setErrorMobile(false);
      setTandC(false);
      setBusinessError(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorName(false);
      setErrorCompany(false);
      setBusinessError(false);
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
                source={require('../../assets/images/trademark.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>Trademark Registration</Text>
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
                  {businessError ? (
                    <Text style={styles.errorMsg}>
                      Please Select Business Type
                    </Text>
                  ) : null}

                  <Text style={styles.Lable}>Contact Persone Name</Text>
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

                  <Text style={styles.Lable}>Business Type</Text>
                  <View style={styles.select1}>
                    <Dropdown
                      style={styles.inputPass}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={businessDrop}
                      search
                      maxHeight={200}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Business Type"
                      searchPlaceholder="Search..."
                      value={businessType}
                      onChange={item => {
                        setBusinessType(item.value);
                      }}
                    />
                  </View>
                  <Text style={styles.Lable}>Brand Name</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter Company Name"
                    autoCapitalize="characters"
                    maxLength={28}
                    inputMode="text"
                    value={company}
                    onChangeText={text => setCompany(text)}
                  />
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
export default TradeMark;
