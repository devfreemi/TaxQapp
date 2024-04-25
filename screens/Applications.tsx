import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../style';

function Applications({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1500);

  const FetchDashListApi = async () => {
    const customerIDL = await AsyncStorage.getItem('userId');
    const dashboardListUrl =
      'https://complyify.in/taxConsultant/tax/dashboard-api-service-list-v1';
    let resultDlist = await fetch(dashboardListUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerIDL,
      }),
    });
    let getResultDashList = await resultDlist.json();
    if (getResultDashList.statusCode !== 200) {
      setData(getResultDashList);
    }
  };
  if (isLoading) {
    FetchDashListApi();
  }
  // FetchDashListApi();
  return (
    <SafeAreaView style={styles.ContentViewLOG}>
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
        <>
          <View style={styles.applicationContainer}>
            <Text style={styles.applicationHeadText}>
              Your all Applications
            </Text>
            {/* <Ionicons
              name="refresh-outline"
              size={18}
              color={'#000000'}
              style={styles.refresh}
            /> */}
          </View>

          <View style={styles.homeGridView2}>
            {data.length ? (
              <FlatList
                style={styles.tableTD}
                data={data}
                renderItem={({item}) => (
                  <View style={styles.applicationRec}>
                    <Image
                      source={{uri: 'https://reactjs.org/logo-og.png'}}
                      style={styles.SerPic}
                    />
                    <Text style={styles.itemAppl}>{item.product}</Text>
                    <View style={styles.itemStatus}>
                      {item.status === 'Approved' ? (
                        <View style={styles.itemStatusInnerApproved}>
                          <Text style={styles.itemStatusTextApproved}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item.status === 'Pending' ? (
                        <View style={styles.itemStatusInnerPending}>
                          <Text style={styles.itemStatusTextPending}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item.status === 'Received' ? (
                        <View style={styles.itemStatusInnerApproved}>
                          <Text style={styles.itemStatusTextApproved}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item.status === 'Completed' ? (
                        <View style={styles.itemStatusInnerActive}>
                          <Text style={styles.itemStatusTextActive}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item.status === 'Rejected' ? (
                        <View style={styles.itemStatusInnerReject}>
                          <Text style={styles.itemStatusTextReject}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item.status === 'Pending Payment' ? (
                        <View style={styles.itemStatusInnerPendingPay}>
                          <Text style={styles.itemStatusTextPendingPay}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item.status === 'New Customer' ? (
                        <View style={styles.itemStatusInnerApproved}>
                          <Text style={styles.itemStatusTextApproved}>
                            Submitted
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noService}>
                You have not choose any service!{' '}
              </Text>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
export default Applications;
