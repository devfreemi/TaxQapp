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
  const [income, setIncome] = useState('');
  // DOCUMENT PICK
  const [documentData, setDocumentData] = useState('');
  const [documentDataName, setDocumentDataName] = useState('');
  const [documentBrsData, setDocumentBrsData] = useState('');
  const [documentBrsDataName, setDocumentBrsDataName] = useState('');
  // Validation
  const [errorIncome, setErrorIncome] = useState(false);
  const [errorPan, setErrorPan] = useState(false);
  const [errorDoc, setErrorDoc] = useState(false);
  const [errorDocbrs, setErrorDocbrs] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  // DATA RECEIVED FROM API
  const [isFormLoading, setFormLoading] = useState(false);

  const pickImage = async () => {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (response === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.pdf],
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
          type: [DocumentPicker.types.pdf],
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
          income,
          pan,
          downloadURLP1,
          downloadURLBrsU,
        }),
      });
      let getResultEx = await result.json();
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
      console.log(err);
    }
  };
  // DOCUMENT PICK
  // Validation
  const validation = async () => {
    if (!pan) {
      setErrorPan(true);
      setErrorIncome(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else if (pan.length < 10) {
      setErrorPan(true);
      setErrorIncome(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else {
      setErrorMsg(false);
      setErrorPan(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
    }
    if (!income) {
      setErrorIncome(true);
      setErrorPan(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else if (income.length < 5) {
      setErrorIncome(true);
      setErrorPan(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
      return false;
    } else {
      setErrorMsg(false);
      setErrorIncome(false);
      setErrorDoc(false);
      setErrorDocbrs(false);
    }
    if (!documentData) {
      setErrorDoc(true);
      setErrorIncome(false);
      setErrorPan(false);
      setErrorDocbrs(false);
      return false;
    } else {
      setErrorMsg(false);
      setErrorDoc(false);
    }
    if (!documentBrsData) {
      setErrorDocbrs(true);
      setErrorIncome(false);
      setErrorPan(false);
      return false;
    } else {
      setFormLoading(true);
      setErrorDocbrs(false);
      setErrorMsg(false);
      submit();
      setPan('');
      setIncome('');
      setDocumentData('');
      setDocumentBrsData('');
      setTimeout(() => {
        setFormLoading(false);
      }, 15000);
    }
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
                  {errorPan ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid PAN No.
                    </Text>
                  ) : null}
                  {errorIncome ? (
                    <Text style={styles.errorMsg}>
                      Please Enter Valid Income
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
                  <Text style={styles.Lable}>Annual Income</Text>
                  <TextInput
                    style={styles.inputPass}
                    placeholder="10,00,000"
                    autoCapitalize="characters"
                    maxLength={8}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    value={income}
                    onChangeText={text => setIncome(text)}
                  />
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
