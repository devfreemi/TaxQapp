import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../style';
function IncomeTax({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);

    return false;
  }, 1000);
  // FETCH STORAGE ID OF CUSTOMER
  const [customerID, setCustomerID] = useState('');
  const FetchStorageData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setCustomerID(userId);
  };
  FetchStorageData();
  // RADIO Button
  const [selectRadio, setRadio] = useState('SR');
  // PRODUCT CODE
  const productID = 1;
  // GET INPUT FIELD
  const [pan, setPan] = useState('');
  const [name, setName] = useState('');
  // DOCUMENT PICK
  const [documentData, setDocumentData] = useState('');
  const [documentDataName, setDocumentDataName] = useState('');
  const [documentBrsData, setDocumentBrsData] = useState('');
  const [documentBrsDataName, setDocumentBrsDataName] = useState('');
  // Validation
  const [errorName, setErrorName] = useState(false);
  const [errorPan, setErrorPan] = useState(false);
  const [errorDoc, setErrorDoc] = useState(false);
  const [errorDocbrs, setErrorDocbrs] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);
  // 80C & D Check
  const [eightC, setEightC] = useState(true);
  // const [eightCstring, setEightCstring] = useState('Y');
  const [eightD, setEightD] = useState(true);

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
    setName(getResultProfile.name);
  };

  const pickImage = async () => {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (response === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await DocumentPicker.pickSingle({
          // type: [DocumentPicker.types.pdf],
          copyTo: 'cachesDirectory',
        });
        console.log(result);
        setDocumentData(result.fileCopyUri);
        setDocumentDataName(result.name);
      } catch (err) {
        console.log(err);
      }
    }
  };
  // Bank Statement upload
  const brs = async () => {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (response === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const resultBrs = await DocumentPicker.pickSingle({
          // type: [DocumentPicker.types.pdf],
          copyTo: 'cachesDirectory',
        });
        console.log(resultBrs);
        setDocumentBrsData(resultBrs.fileCopyUri);
        setDocumentBrsDataName(resultBrs.name);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const submit = async () => {
    try {
      const upload = await storage()
        .ref('/Form16/' + customerID + documentDataName)
        .putFile(documentData);
      const downloadURL = await storage()
        .ref('/Form16/' + customerID + documentDataName)
        .getDownloadURL();
      const downloadURLP1 = downloadURL;
      // BRS upload
      const uploadBrs = await storage()
        .ref('/BankStatement/' + documentBrsDataName)
        .putFile(documentBrsData);
      const downloadURLBrs = await storage()
        .ref('/BankStatement/' + documentBrsDataName)
        .getDownloadURL();
      const downloadURLBrsU = downloadURLBrs;
      // BBRS
      const eightyC = eightC.toString();
      const eightyD = eightD.toString();
      const serviceUrl =
        'https://truetechnologies.in/taxConsultant/tax/service-api-v1';
      let result = await fetch(serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600',
        },
        body: JSON.stringify({
          productID,
          customerID,
          selectRadio,
          name,
          pan,
          downloadURLP1,
          downloadURLBrsU,
          eightyC,
          eightyD,
        }),
      });

      let getResultEx = await result.json();
      if (getResultEx) {
        // console.log(getResultEx);
        navigation.navigate('Application Status', {
          appId: getResultEx.uniqid,
          status: getResultEx.status,
          category: getResultEx.product_id,
        });
      } else {
        console.log('Internal Failure. Contact to Tech Team');
      }
    } catch (err) {
      console.log(err);
    }
  };
  // DOCUMENT PICK
  // Validation
  const validation = async () => {
    let sampleRegEx: RegExp = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    if (!name) {
      setErrorName(true);
      setErrorPan(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else if (name.length < 5) {
      setErrorName(true);
      setErrorPan(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else {
      setErrorMsg(false);
      setErrorName(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
    }
    if (!pan) {
      setErrorPan(true);
      setErrorName(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else if (pan.length < 10) {
      setErrorPan(true);
      setErrorName(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else if (!sampleRegEx.test(pan)) {
      setErrorPan(true);
      setErrorName(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else {
      setErrorMsg(false);
      setErrorPan(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
    }
    if (!documentData) {
      setErrorDoc(true);
      setErrorName(false);
      setErrorPan(false);
      setErrorDocbrs(false);
      return false;
    } else {
      setErrorMsg(false);
      setErrorDoc(false);
    }
    if (!documentBrsData) {
      setErrorDocbrs(true);
      setErrorName(false);
      setErrorPan(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorDocbrs(false);
      setErrorMsg(false);
      submit();
      setPan('');
      setName('');
      setDocumentData('');
      setDocumentBrsData('');
      setTimeout(() => {
        setFormLoading(false);
      }, 15000);
    }
  };

  const focus = async () => {
    setName('');
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
                source={require('../../assets/images/incometax.png')}
                style={styles.formImage}
              />
            </View>
            <Text style={styles.reportHeadForm}>Income Tax</Text>
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
                    <Text style={styles.errorMsg}>Please Enter Valid Name</Text>
                  ) : null}
                  {errorPan ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid PAN No.
                    </Text>
                  ) : null}
                  {errorDoc ? (
                    <Text style={styles.errorMsg}>Please Select Form 16</Text>
                  ) : null}
                  {errorDocbrs ? (
                    <Text style={styles.errorMsg}>
                      Please Select Bank Statement
                    </Text>
                  ) : null}
                  {errorMsg ? (
                    <Text style={styles.errorMsg}>
                      Your Login Username or Password is Invalid
                    </Text>
                  ) : null}
                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      style={styles.Radio}
                      onPress={() => setRadio('SR')}>
                      <View style={styles.radioWrap}>
                        <View style={styles.radioButton}>
                          {selectRadio === 'SR' ? (
                            <View style={styles.radioInner}></View>
                          ) : null}
                        </View>
                        <Text style={styles.radioText}>Salaried</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.Radio}
                      onPress={() => setRadio('SE')}>
                      <View style={styles.radioWrap}>
                        <View style={styles.radioButton}>
                          {selectRadio === 'SE' ? (
                            <View style={styles.radioInner}></View>
                          ) : null}
                        </View>
                        <Text style={styles.radioText}>Self Employeed</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.Lable}>Name</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="Enter Your Name"
                    maxLength={28}
                    inputMode="text"
                    value={name}
                    onPressIn={focus}
                    onChangeText={text => setName(text)}
                  />
                  <Text style={styles.Lable}>PAN Number</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="ADFGH1564C"
                    autoCapitalize="characters"
                    maxLength={10}
                    inputMode="text"
                    value={pan}
                    onChangeText={text => setPan(text)}
                  />
                  {selectRadio === 'SR' ? (
                    <View style={styles.CheckBoxDiv}>
                      <View style={styles.CheckBox}>
                        <Text style={styles.LableCheck}>80C Applicable</Text>
                        <BouncyCheckbox
                          fillColor="#6e63ff"
                          isChecked={eightC}
                          style={styles.CheckBoxInner}
                          onPress={() => setEightC(!eightC)}
                        />
                      </View>
                      <View style={styles.CheckBox}>
                        <Text style={styles.LableCheck}>80D Applicable</Text>
                        <BouncyCheckbox
                          fillColor="#6e63ff"
                          isChecked={eightD}
                          style={styles.CheckBoxInner}
                          onPress={() => setEightD(!eightD)}
                        />
                      </View>
                    </View>
                  ) : null}

                  <Text style={styles.Lable}>Upload Required Documents</Text>
                  <View style={styles.reportGridViewForm}>
                    <View style={styles.divServiceForm}>
                      <View style={[styles.cardSReport]}>
                        <TouchableOpacity
                          style={styles.viewElementsReport}
                          onPress={pickImage}>
                          <View style={styles.viewElementsReportF2}>
                            <Ionicons
                              name="document-text-outline"
                              size={32}
                              color={'#6e63ff'}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      {documentData ? (
                        <View style={styles.SuccessDiv}>
                          <Text style={styles.serviceNameFormSuccess}>
                            Selected
                          </Text>
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color={'#1ec677'}
                          />
                        </View>
                      ) : (
                        <Text style={styles.serviceNameForm}>
                          Upload{'\n'}Form 16
                        </Text>
                      )}
                    </View>
                    <View style={styles.divServiceForm}>
                      <View style={[styles.cardSReport]}>
                        <TouchableOpacity
                          style={styles.viewElementsReport}
                          onPress={brs}>
                          <View style={styles.viewElementsReportF2}>
                            <Ionicons
                              name="document-text-outline"
                              size={32}
                              color={'#6e63ff'}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      {documentBrsData ? (
                        <View style={styles.SuccessDiv}>
                          <Text style={styles.serviceNameFormSuccess}>
                            Selected
                          </Text>
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color={'#1ec677'}
                          />
                        </View>
                      ) : (
                        <Text style={styles.serviceNameForm}>
                          Bank{'\n'}Statement
                        </Text>
                      )}
                    </View>
                  </View>
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
export default IncomeTax;
