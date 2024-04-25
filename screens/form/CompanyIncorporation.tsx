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
function CompanyIncorporation({navigation}): JSX.Element {
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
  // PRODUCT CODE
  const productID = 4;

  // Validation
  const [errorName, setErrorName] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [tandc, setTandC] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const submit = async () => {
    try {
      const serviceUrl =
        'https://complyify.in/taxConsultant/tax/service-api-company-v1';
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
          email,
          mobile,
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
          priceCommnets: getResultEx.ProductPriceCommnets,
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
      setFormLoading(true);
      setErrorName(false);
      setErrorEmail(false);
      setErrorMobile(false);
      setTandC(false);
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
            <View style={styles.formImagediv}>
              <Image
                source={require('../../assets/images/brand.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>Company Incorporation</Text>
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

                  <Text style={styles.Lable}>
                    Required Documents{' '}
                    <Text style={styles.listHead}>
                      (for Two no of Directors with 10 lac Capitals)
                    </Text>
                  </Text>
                  <Text style={styles.list}>1. Voter Id Card</Text>
                  <Text style={styles.list}>
                    2. Two copy of photo of each directors
                  </Text>
                  <Text style={styles.list}>
                    3. Address proof of registered office
                  </Text>
                  <Text style={styles.list}>
                    4. Electricity bill (not older than one month)
                  </Text>
                  <Text style={styles.list}>
                    5. Current tax bill of registered office
                  </Text>
                  <Text style={styles.list}>
                    6. Deed or rent agreement of registered office
                  </Text>
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
export default CompanyIncorporation;
