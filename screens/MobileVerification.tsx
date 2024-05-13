import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {removeListener, startOtpListener} from 'react-native-otp-verify';
import styles from '../style';

function MobileVerification({navigation}): JSX.Element {
  const [confirm, setConfirm] = useState(null);
  const [sendOTPbtn, setsendOTPbtn] = useState('Send OTP');
  const [disabled, setDisabled] = useState(false);
  const [cnfmOTPbtn, setCnfmOTPbtn] = useState('Confirm OTP');
  const [otpDisabled, setOtpDisabled] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileErr, setMobileErr] = useState(false);
  const [codeErr, setCodeErr] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [mobileCheck, setMobileCheck] = useState('');
  // MOBILE VERIFIED CHECK
  const tokenLogin = async () => {
    const customerID = await AsyncStorage.getItem('userId');
    // const mobileID = await AsyncStorage.getItem('mobile');
    const dashboardUrl = 'https://complyify.in/taxConsultant/tax/mobile-api-v1';
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
    if (getResultDash.mobileNumber !== null) {
      navigation.navigate('ServicesView');
    } else {
      const mobileID = '+91' + mobile;
      const mobileCheckUrl =
        'https://complyify.in/taxConsultant/tax/mobile-count-api-v1';
      let resultMbCh = await fetch(mobileCheckUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileID,
        }),
      });
      let getResultCheck = await resultMbCh.json();
      if (getResultCheck.status === 'Fetched') {
        console.log(getResultCheck);

        AsyncStorage.setItem('userId', getResultCheck.uniqid);
        setMobileCheck('Y');
      } else {
        setMobileCheck('N');
      }
      navigation.navigate('MobileVerification');
    }
  };
  tokenLogin();
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1500);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

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
    } else if (mobileCheck === 'Y') {
      setsendOTPbtn('Validating....');
      setDisabled(true);

      Alert.alert('Congrats!', 'Mobile Number Already Verified!', [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('ServicesView'),
        },
      ]);
    } else if (mobileCheck === 'N') {
      setMobile(mobile);
      setMobileErr(false);
      setsendOTPbtn('Sending....');
      signInWithPhoneNumber('+91 ' + mobile);
      AsyncStorage.setItem('mobile', mobile);
      setDisabled(true);
    }
  };

  //AUTO OTP VERIFICATION
  // const [otpCode, setOtpCode] = useState('');
  async function getOtpCode(message: string) {
    if (message) {
      const otp = /(\d{6})/g.exec(message)![1];
      setCode(otp);
      setOtpDisabled(true);
      setCnfmOTPbtn('Validating....');
      const customerIDM = await AsyncStorage.getItem('userId');
      let mobileNumberC = await AsyncStorage.getItem('mobile');
      const mobileNumber = '+91' + mobileNumberC;
      const uniqid = 'Auto Verified.';
      const mobileUrl =
        'https://complyify.in/taxConsultant/tax/mobile-api-update-v1';
      let result = await fetch(mobileUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          uniqid,
          mobileNumber,
          customerIDM,
        }),
      });
      let getResultUpdate = await result.json();
      if (getResultUpdate.mobile !== null) {
        await firebase
          .app()
          .database(
            'https://taxq-cfaf0-default-rtdb.asia-southeast1.firebasedatabase.app/',
          )
          .ref('/user/' + customerIDM)
          .update({
            mobile: mobileNumber,
          })
          .then(() => console.log('Data set.'));
        // Navigation
        navigation.navigate('ServicesView');
      } else {
        Alert.alert('Internal Failure. Contact to Tech Team');
      }
    } else {
      setCode('');
      setOtpDisabled(false);
    }
  }
  useEffect(() => {
    // getHash().then(hash => console.log('Message Hash=> ', hash));
    startOtpListener(message => getOtpCode(message));
    return () => removeListener();
  }, []);

  const confirmCode = async () => {
    try {
      const res = await confirm.confirm(code);
      setOtpDisabled(true);
      setCnfmOTPbtn('Validating....');
      // Navigation
      navigation.navigate('ServicesView');
      // Mobile Update
      const mobileNumber = res.user.phoneNumber;
      AsyncStorage.setItem('mobile', mobileNumber);
      const uniqid = res.user.uid;
      const customerIDM = await AsyncStorage.getItem('userId');
      const mobileUrl =
        'https://complyify.in/taxConsultant/tax/mobile-api-update-v1';
      let result = await fetch(mobileUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          uniqid,
          mobileNumber,
          customerIDM,
        }),
      });
      // console.log(res);
      // console.log(getResultMupdate);
      await firebase
        .app()
        .database(
          'https://taxq-cfaf0-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/user/' + customerIDM)
        .update({
          mobile: mobileNumber,
        })
        .then(() => console.log('Data set.'));
    } catch (error) {
      if (error.code === 'auth/invalid-verification-code') {
        setCodeErr(true);
        setOtpDisabled(false);
      }
    }
  };
  const editMobile = async () => {
    setDisabled(false);
    setOtpDisabled(false);
    setConfirm(null);
    setsendOTPbtn('Send OTP');
    setCnfmOTPbtn('Confirm OTP');
    setCode('');
    setCodeErr(false);
    await AsyncStorage.removeItem('mobile');
    console.log('Edit');
    // navigation.navigate('MobileVerification');
  };
  if (!confirm) {
    return (
      <>
        {isLoading ? (
          <View style={styles.ContentViewHomeChild}>
            <ActivityIndicator
              animating={isLoading}
              size={'large'}
              style={styles.StyleIndicator}
              color={'#745bff'}
            />
          </View>
        ) : (
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
                  disabled={disabled}
                  onPress={validation}>
                  <View style={styles.buttonG}>
                    <Image
                      source={require('../assets/images/phone.png')}
                      style={styles.buttonImage}
                    />
                    <Text style={styles.submitText}>{sendOTPbtn}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
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
              disabled={otpDisabled}
              onPress={() => confirmCode()}>
              <View style={styles.buttonG}>
                <Image
                  source={require('../assets/images/otp.png')}
                  style={styles.buttonImage}
                />
                <Text style={styles.submitText}>{cnfmOTPbtn}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editMobile()}>
              <Text style={styles.editMobile}>Edit Mobile Number</Text>
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
