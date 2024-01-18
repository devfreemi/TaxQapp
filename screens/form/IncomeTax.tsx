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
function IncomeTax(): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);

    return false;
  }, 1000);
  // RADIO Button
  const [selectRadio, setRadio] = useState('SE');

  // DOCUMENT PICK
  const [documentData, setDocumentData] = useState('');
  const [documentDataName, setDocumentDataName] = useState('');
  const pickImage = async () => {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (response === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.images],
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
  const submit = async () => {
    try {
      const upload = await storage()
        .ref('/Form16/' + documentDataName)
        .putFile(documentData);
      const downloadURL = await storage()
        .ref('/Form16/' + documentDataName)
        .getDownloadURL();
      console.log(upload);
      console.log(downloadURL);
    } catch (err) {
      console.log(err);
    }
  };
  // DOCUMENT PICK
  return (
    <SafeAreaView style={styles.ContentViewReport}>
      <View>
        {isLoading ? (
          <View style={styles.ContentViewHomeChild}>
            <ActivityIndicator
              animating={isLoading}
              size={'small'}
              style={styles.StyleIndicator}
              color={'#2E5AAB'}
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
            <Text style={styles.reportHead2}>Enter Your Financial Details</Text>
            <View style={styles.datePicker}>
              <View style={styles.radioMain}>
                <TouchableOpacity
                  style={styles.Radio}
                  onPress={() => setRadio('SE')}>
                  <View style={styles.radioWrap}>
                    <View style={styles.radioButton}>
                      {selectRadio === 'SE' ? (
                        <View style={styles.radioInner}></View>
                      ) : null}
                    </View>
                    <Text style={styles.radioText}>Salaried</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Radio}
                  onPress={() => setRadio('SR')}>
                  <View style={styles.radioWrap}>
                    <View style={styles.radioButton}>
                      {selectRadio === 'SR' ? (
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
              />
              <Text style={styles.Lable}>Annual Income</Text>
              <TextInput
                style={styles.inputPass}
                placeholder="10,00,000"
                autoCapitalize="characters"
                maxLength={8}
                inputMode="numeric"
                keyboardType="number-pad"
              />
              <View style={styles.reportGridViewForm}>
                <View style={styles.divServiceForm}>
                  <View style={[styles.cardIReport]}>
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
                  <Text style={styles.serviceNameForm}>
                    Upload{'\n'}Form 16 (Page 1)
                  </Text>
                </View>
                <View style={styles.divServiceForm}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity style={styles.viewElementsReport}>
                      <View style={styles.viewElementsReportF2}>
                        <Ionicons
                          name="document-text-outline"
                          size={32}
                          color={'#6e63ff'}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceNameForm}>
                    Upload{'\n'}Form 16 (Page 2)
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.buttonReport} onPress={submit}>
                <View>
                  <Text style={styles.submitText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
export default IncomeTax;
