import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../style';

function MobileVerification({navigation}): JSX.Element {
  const [confirm, setConfirm] = useState(null);
  const [sendOTPbtn, setsendOTPbtn] = useState('Send OTP');
  const [cnfmOTPbtn, setCnfmOTPbtn] = useState('Confirm OTP');
  const [mobile, setMobile] = useState('');
  const [mobileErr, setMobileErr] = useState(false);
  const [codeErr, setCodeErr] = useState(false);

  // MOBILE VERIFIED CHECK
  const tokenLogin = async () => {
    const customerID = await AsyncStorage.getItem('userId');
    const mobileID = await AsyncStorage.getItem('mobile');
    const dashboardUrl =
      'https://truetechnologies.in/taxConsultant/tax/mobile-api-v1';
    let resultD = await fetch(dashboardUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerID,
      }),
    });
    let getResultDash = await resultD.json();
    if (mobileID !== null) {
      // navigation.navigate('ServicesView');
      console.log('Already Verified ');
    } else if (getResultDash.mobileNumber !== null) {
      // navigation.navigate('ServicesView');
      console.log('Already Verified ');
    } else {
      navigation.navigate('MobileVerification');
      console.log('Not Verified ');
    }
  };
  tokenLogin();
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };
  const validation = async () => {
    tokenLogin();
    let sampleRegEx: RegExp = /^[6789]\d{9}$/;
    if (!sampleRegEx.test(mobile)) {
      setMobileErr(true);
      return false;
    } else {
      setMobile(mobile);
      setMobileErr(false);
      setsendOTPbtn('Sending....');
      signInWithPhoneNumber('+91 ' + mobile);
    }
  };
  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      setCnfmOTPbtn('Validating....');
      navigation.navigate('ServicesView');
      // const res = await confirm.confirm(code);
      // setCnfmOTPbtn('Validating....');
      // Navigation
      // Mobile Update
      // console.log(res);
      // Alert.alert('Mobile Number Verified');
      // const mobileNumber = res.user.phoneNumber;
      // AsyncStorage.setItem('mobile', mobileNumber);
      // const uniqid = res.user.uid;
      // const customerIDM = await AsyncStorage.getItem('userId');
      // const mobileUrl =
      //   'https://truetechnologies.in/taxConsultant/tax/mobile-api-update-v1';
      // let result = await fetch(mobileUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Cache-Control': 'max-age=3600',
      //   },
      //   body: JSON.stringify({
      //     uniqid,
      //     mobileNumber,
      //     customerIDM,
      //   }),
      // });
    } catch (error) {
      if (error.code === 'auth/invalid-verification-code') {
        setCodeErr(true);
      }
    }
    Alert.alert('res');
  };

  if (!confirm) {
    return (
      <>
        <SafeAreaView style={styles.ContentView}>
          <View style={styles.hImageOTP}>
            <Image
              source={require('../assets/images/otpVer.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.headerTitle}>Verify Your Mobile Number</Text>
          {/* <Text style={styles.brand}> TaxQ</Text> */}
          <ScrollView>
            <View style={styles.formViewOTP}>
              {mobileErr ? (
                <Text style={styles.errorMsg}>
                  Please Enter Valid Mobile No.
                </Text>
              ) : null}
              <Text style={styles.Lable}>Mobile Number</Text>
              <TextInput
                style={styles.inputPass}
                placeholder="Enter Mobile Number"
                autoCapitalize="characters"
                maxLength={10}
                inputMode="numeric"
                keyboardType="number-pad"
                value={mobile}
                onChangeText={text => setMobile(text)}
              />
              <TouchableOpacity
                style={styles.buttonOTP}
                // onPress={() => signInWithPhoneNumber('+91 ' + mobile)}
                onPress={validation}>
                <View style={styles.buttonG}>
                  <Image
                    source={require('../assets/images/phone.png')}
                    style={styles.googleImage}
                  />
                  <Text style={styles.submitText}>{sendOTPbtn}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.ContentView}>
        <View style={styles.hImageOTP}>
          <Image
            source={require('../assets/images/otpVer.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerTitle}>Verify Your Mobile Number</Text>

        <ScrollView>
          <View style={styles.formViewOTP}>
            {codeErr ? (
              <Text style={styles.errorMsg}>
                OTP is Invalid. Please Enter Correct OTP !
              </Text>
            ) : (
              <Text style={styles.brandOTP}>
                {' '}
                OTP Sent to Your Mobile Number
              </Text>
            )}
            <TextInput
              style={styles.inputPass}
              placeholder="Enter OTP"
              autoCapitalize="characters"
              maxLength={6}
              inputMode="numeric"
              keyboardType="number-pad"
              value={code}
              onChangeText={text => setCode(text)}
            />
            <TouchableOpacity
              style={styles.buttonOTP}
              onPress={() => confirmCode()}>
              <View style={styles.buttonG}>
                <Image
                  source={require('../assets/images/otp.png')}
                  style={styles.googleImage}
                />
                <Text style={styles.submitText}>{cnfmOTPbtn}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
    //   <TextInput value={code} onChangeText={text => setCode(text)} />
    //   <Button title="Confirm Code" onPress={() => confirmCode()} />
  );
}

export default MobileVerification;
