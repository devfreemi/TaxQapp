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
import {removeListener, startOtpListener} from 'react-native-otp-verify';
import styles from '../style';
function MobileVerification({navigation}): JSX.Element {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  // const [sendOTPbtn, setsendOTPbtn] = useState('Send OTP');
  // const [cnfmOTPbtn, setCnfmOTPbtn] = useState('Confirm OTP');
  const [mobile, setMobile] = useState('');
  const [cnfmOTPbtn, setCnfmOTPbtn] = useState('');

  // const [mobileErr, setMobileErr] = useState(false);
  // const [codeErr, setCodeErr] = useState(false);
  // Handle login
  // function onAuthStateChanged(user) {
  //   if (user) {
  //     // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
  //     // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
  //     // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
  //     // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // Handle the button press
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };
  // OTP VER
  const [otpCode, setOtpCode] = useState('');
  function getOtpCode(message: string) {
    if (message) {
      // console.log('Message Captured=>', message);
      const otp = /(\d{6})/g.exec(message)![1];
      setOtpCode(otp);
      Alert.alert('OTP' + otp);
    }
  }
  useEffect(() => {
    // getHash().then(hash => console.log('Message Hash=> ', hash));
    startOtpListener(message => getOtpCode(message));
    return () => removeListener();
  }, []);
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      const res = await confirm.confirm(code);
      Alert.alert('Pass' + res.phoneNumber);
      // console.log(res);
    } catch (error) {
      setCnfmOTPbtn(error.code);
      Alert.alert(error.code);
    }
  }
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
              {/* {mobileErr ? (
                <Text style={styles.errorMsg}>
                  Please Enter Valid Mobile No.
                </Text>
              ) : null} */}
              <Text style={styles.Lable}>Mobile Number</Text>
              <TextInput
                style={styles.inputPass}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#57585b"
                autoCapitalize="characters"
                maxLength={10}
                inputMode="numeric"
                keyboardType="number-pad"
                value={mobile}
                onChangeText={text => setMobile(text)}
              />
              <TouchableOpacity
                style={styles.buttonOTP}
                onPress={() => signInWithPhoneNumber('+91 ' + mobile)}
                // onPress={() => signInWithPhoneNumber(mobile)}
              >
                <View style={styles.buttonG}>
                  <Image
                    source={require('../assets/images/phone.png')}
                    style={styles.googleImage}
                  />
                  <Text style={styles.submitText}>SEND OTP</Text>
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
            {/* {codeErr ? (
              <Text style={styles.errorMsg}>
                OTP is Invalid. Please Enter Correct OTP !
              </Text>
            ) : (
              <Text style={styles.brandOTP}>
                {' '}
                OTP Sent to Your Mobile Number
              </Text>
            )} */}
            <Text style={styles.errorMsg}>{cnfmOTPbtn}</Text>
            {/* <TextInput
              style={styles.inputPass}
              placeholder="Enter OTP"
              placeholderTextColor="#57585b"
              autoCapitalize="characters"
              maxLength={6}
              inputMode="numeric"
              keyboardType="number-pad"
              value={code}
              onChangeText={text => setCode(text)}
            /> */}
            <TextInput value={otpCode[0]} />
            <TextInput value={otpCode[1]} />
            <TextInput value={otpCode[2]} />
            <TextInput value={otpCode[3]} />
            <TextInput value={otpCode[4]} />
            <TextInput value={otpCode[5]} />
            <TouchableOpacity
              style={styles.buttonOTP}
              onPress={() => confirmCode()}>
              <View style={styles.buttonG}>
                <Image
                  source={require('../assets/images/otp.png')}
                  style={styles.googleImage}
                />
                <Text style={styles.submitText}>Confirm</Text>
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
