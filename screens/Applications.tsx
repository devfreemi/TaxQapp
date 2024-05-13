import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style';

function Applications({navigation}): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
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
      console.log(getResultDashList);
      setData(getResultDashList);
    }
  };
  if (isLoading) {
    FetchDashListApi();
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchDashListApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const refreshButton = async () => {
    FetchDashListApi();
  };
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
          </View>

          <View style={styles.homeGridView2}>
            {data.length ? (
              <FlatList
                style={styles.tableTD}
                data={data}
                onRefresh={onRefresh}
                refreshing={refreshing}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.outtrtDiv}
                    onPress={() =>
                      navigation.navigate('Application', {
                        productsId: item.productId,
                        product: item.product,
                        jobId: item.jobId,
                        product_image: item.product_image,
                      })
                    }>
                    <View style={styles.applicationRec}>
                      <View style={styles.itemApplIcon}>
                        <Image
                          source={{uri: item.product_image}}
                          style={styles.SerPic}
                        />
                      </View>
                      <Text style={styles.itemAppl}>{item.product}</Text>
                      <View style={styles.itemStatusAppl}>
                        {item.PaymentStatus === 'Payment Success' ? (
                          <View style={styles.itemStatusInnerPaid}>
                            <Text style={styles.itemStatusTextPaid}>Paid</Text>
                          </View>
                        ) : item.PaymentStatus === 'created' ||
                          item.PaymentStatus === 'Pending Payments' ? (
                          <View style={styles.itemStatusInnerCreated}>
                            <Text style={styles.itemStatusTextCreated}>
                              Created
                            </Text>
                          </View>
                        ) : item.PaymentStatus === 'Payment Failed' ? (
                          <View style={styles.itemStatusInnerFailled}>
                            <Text style={styles.itemStatusTextFailled}>
                              Failed
                            </Text>
                          </View>
                        ) : null}
                      </View>
                      <View style={styles.itemSettingIcon}>
                        <Ionicons
                          name="ellipsis-vertical"
                          size={18}
                          color={'#423e3e'}
                          style={styles.refresh}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.noServiceDiv}>
                <Text style={styles.noServiceAppl}>
                  You Have Not Choose Any Service!
                </Text>
                <TouchableOpacity
                  style={styles.buttonRefresh}
                  onPress={refreshButton}>
                  <View style={styles.buttonG}>
                    <Text style={styles.refreshText}>
                      Refresh {'  '}
                      <Ionicons
                        name="reload"
                        size={18}
                        color={'#ffffff'}
                        style={styles.refresh}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
export default Applications;
