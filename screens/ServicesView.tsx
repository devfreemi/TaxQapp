import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-reanimated-carousel';

import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import styles from '../style';
import Applications from './Applications';
import Profile from './Profile';
const Tab = createBottomTabNavigator();
function ServicesView({navigation}): JSX.Element {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Stop', 'Are you sure You want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Services') {
            iconName = focused
              ? 'file-tray-stacked'
              : 'file-tray-stacked-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'reader' : 'reader-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Applications') {
            iconName = focused ? 'documents' : 'documents-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#745bff',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Services" component={Service} />
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="Applications" component={Applications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
function Service({navigation}) {
  const [isLoading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
    return false;
  }, 900);
  const comingSoon = () =>
    Alert.alert('Coming Soon!', 'Unlocking Possibilities, Coming Soon!', [
      {text: 'Close', onPress: () => console.log('OK Pressed')},
    ]);
  // Refresh
  const width = Dimensions.get('window').width;
  const [data, setData] = useState([]);
  const FetchImageSlider = async () => {
    const dashboardListUrl =
      'https://complyify.in/taxConsultant/tax/image-api-v1';
    let resultDlist = await fetch(dashboardListUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let getResultDashList = await resultDlist.json();
    if (getResultDashList.statusCode !== 200) {
      setData(getResultDashList);
    }
  };
  if (isLoading) {
    FetchImageSlider();
  }

  return (
    <SafeAreaView style={styles.ContentViewReport}>
      <View>
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
            <View style={styles.banner}>
              <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                mode="parallax"
                // modeConfig={{
                //   parallaxScrollingScale: 0.9,
                //   parallaxScrollingOffset: 50,
                // }}
                data={data}
                scrollAnimationDuration={1000}
                // autoPlayInterval={1000}
                renderItem={({item}) => (
                  <View style={styles.slider}>
                    <Image
                      source={{uri: item.product_image}}
                      style={styles.slidePic}
                    />
                  </View>
                )}
              />
            </View>
            <Text style={styles.reportHead}>Select Our Services</Text>
            <ScrollView style={styles.ServiceScroll}>
              <Text style={styles.serviceNamein}>Services</Text>
              <View style={styles.reportGridView}>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={() => navigation.navigate('Income Tax')}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/incometax.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>Income{'\n'}Tax</Text>
                </View>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={() => navigation.navigate('Gst Return')}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/gst.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>
                    Gst {'\n'}
                    Return
                  </Text>
                </View>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={() => navigation.navigate('Digital Signature')}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/signature.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>Digital{'\n'}Signature</Text>
                </View>

                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={() =>
                        navigation.navigate('Company Incorporation')
                      }>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/brand.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>
                    Company{'\n'}Incorporation
                  </Text>
                </View>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={() =>
                        navigation.navigate('Corporate Compliance')
                      }>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/corporate.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>
                    Corporate{'\n'}Compliance
                  </Text>
                </View>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={comingSoon}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/tds.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>TDS{'\n'}</Text>
                </View>
              </View>
              {/* NEXT DIV */}
              <Text style={styles.serviceNamein2}>Licensing</Text>
              <View style={styles.reportGridView2}>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={() => navigation.navigate('GST Registration')}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/gstReg.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>GST{'\n'}Registration</Text>
                </View>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={() => navigation.navigate('Trade License')}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/trade.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>
                    Trade{'\n'}
                    License
                  </Text>
                </View>

                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={() =>
                        navigation.navigate('Trademark Registration')
                      }>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/trademark.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>
                    Trademark{'\n'}Registration
                  </Text>
                </View>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={comingSoon}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/idea.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>
                    Startup{'\n'}Registration
                  </Text>
                </View>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity
                      style={styles.viewElementsReport}
                      onPress={comingSoon}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/fssai.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>
                    FSSAI{'\n'}Registration
                  </Text>
                </View>

                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity style={styles.viewElementsReport}>
                      <View style={styles.viewElementsReportF2}>
                        <Ionicons
                          name="grid-outline"
                          size={32}
                          color={'#745bff'}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>More{'\n'}</Text>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
export default ServicesView;
