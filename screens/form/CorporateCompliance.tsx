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
function CorporateCompliance({navigation}): JSX.Element {
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
    setMobile(getResultProfile.mobile);
  };
  // PRODUCT CODE
  const productID = 5;
  // GET INPUT FIELD
  const [msg, setMsg] = useState('');
  const [company, setCompany] = useState('');
  const [mobile, setMobile] = useState('');
  // Validation
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://complyify.in/taxConsultant/tax/service-api-compliance-v1';
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
          msg,
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
    if (!customerName) {
      setErrorName(true);
      setErrorMsg(false);
      setErrorMobile(false);
      setErrorCompany(false);
      return false;
    } else if (customerName.length < 5) {
      setErrorName(true);
      setErrorMsg(false);
      setErrorMobile(false);
      setErrorCompany(false);
      return false;
    } else {
      setErrorName(false);
      setErrorMsg(false);
      setErrorMobile(false);
      setErrorCompany(false);
    }
    if (!mobile) {
      setErrorName(false);
      setErrorMsg(false);
      setErrorCompany(false);
      setErrorMobile(true);
      return false;
    } else if (mobile.length < 10) {
      setErrorName(false);
      setErrorMsg(false);
      setErrorCompany(false);
      setErrorMobile(true);
      return false;
    } else {
      setErrorName(false);
      setErrorMsg(false);
      setErrorCompany(false);
      setErrorMobile(false);
    }
    if (!company) {
      setErrorName(false);
      setErrorMsg(false);
      setErrorMobile(false);
      setErrorCompany(true);
      return false;
    } else if (company.length < 5) {
      setErrorName(false);
      setErrorMsg(false);
      setErrorMobile(false);
      setErrorCompany(true);
      return false;
    } else {
      setErrorName(false);
      setErrorMsg(false);
      setErrorMobile(false);
      setErrorCompany(false);
    }
    if (!msg) {
      setErrorName(false);
      setErrorMsg(true);
      setErrorMobile(false);
      setErrorCompany(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorName(false);
      setErrorMsg(false);
      setErrorMobile(false);
      setErrorCompany(false);
      submit();
      setTimeout(() => {
        setFormLoading(false);
      }, 2000);
    }
  };
  const focus = async () => {
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
                source={require('../../assets/images/corporate.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>Corporate Compliance</Text>
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
                  {errorName ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Name.
                    </Text>
                  ) : null}
                  {errorMobile ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Mobile Number
                    </Text>
                  ) : null}
                  {errorCompany ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Company Name
                    </Text>
                  ) : null}
                  {errorMsg ? (
                    <Text style={styles.errorMsg}>Please Enter Details</Text>
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
                  <Text style={styles.Lable}>Mobile</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Mobile Number"
                    maxLength={14}
                    inputMode="tel"
                    keyboardType="phone-pad"
                    value={mobile}
                    // onPressIn={focus}
                    onChangeText={text => setMobile(text)}
                  />

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
                  <Text style={styles.Lable}>Submit Details</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter Details Within 200 words"
                    inputMode="text"
                    value={msg}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={text => setMsg(text)}
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
export default CorporateCompliance;
