import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {
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
  const [mobile, setMobile] = useState('');

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
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
    console.log(confirmation);
  };

  const confirmCode = async () => {
    try {
      const res = await confirm.confirm(code);
      console.log(res);
      // Navigate
      navigation.navigate('ServicesView');
    } catch (error) {
      console.log(error);
    }
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
                onPress={() => signInWithPhoneNumber('+91 ' + mobile)}>
                <View style={styles.buttonG}>
                  <Image
                    source={require('../assets/images/phone.png')}
                    style={styles.googleImage}
                  />
                  <Text style={styles.submitText}>Send OTP</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.Footer}>
            <Text style={styles.FooterText}>
              Made With &#10084; By
              <Text style={styles.FooterBrand}> FindSoftware4U</Text>
            </Text>
          </View>
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
        {/* <Text style={styles.brand}> TaxQ</Text> */}
        <ScrollView>
          <View style={styles.formViewOTP}>
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
                <Text style={styles.submitText}>Confirm OTP</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.Footer}>
          <Text style={styles.FooterText}>
            Made With &#10084; By
            <Text style={styles.FooterBrand}> FindSoftware4U</Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
    //   <TextInput value={code} onChangeText={text => setCode(text)} />
    //   <Button title="Confirm Code" onPress={() => confirmCode()} />
  );
}

export default MobileVerification;
