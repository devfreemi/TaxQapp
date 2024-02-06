import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useState } from 'react';
import {
  ActivityIndicator,
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
import Profile from './Profile';
const Tab = createBottomTabNavigator();
function ServicesView({navigation}): JSX.Element {
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
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6e63ff',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Services" component={Service} />
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
function Service({navigation}) {
  const [isLoading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1000);
  return (
    <SafeAreaView style={styles.ContentViewReport}>
      <View>
        {isLoading ? (
          <View style={styles.ContentViewHomeChild}>
            <ActivityIndicator
              animating={isLoading}
              size={'large'}
              style={styles.StyleIndicator}
              color={'#6e63ff'}
            />
          </View>
        ) : (
          <>
            <Image
              source={require('../assets/images/banner2.jpg')}
              style={styles.banner}
            />

            <Text style={styles.reportHead}>
              What service are you looking for?
            </Text>
            <ScrollView>
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
                    <TouchableOpacity style={styles.viewElementsReport}>
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
                    <TouchableOpacity style={styles.viewElementsReport}>
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
              </View>
              {/* NEXT DIV */}
              <Text style={styles.serviceNamein2}>Licensing</Text>
              <View style={styles.reportGridView2}>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity style={styles.viewElementsReport}>
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
                    <TouchableOpacity style={styles.viewElementsReport}>
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
                    <TouchableOpacity style={styles.viewElementsReport}>
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
                    <TouchableOpacity style={styles.viewElementsReport}>
                      <View style={styles.viewElementsReportF2}>
                        <Image
                          source={require('../assets/images/pan.png')}
                          style={styles.SerPic}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceName}>
                    Pancard{'\n'}Application
                  </Text>
                </View>
                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity style={styles.viewElementsReport}>
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

                <View style={styles.divService}>
                  <View style={[styles.cardIReport]}>
                    <TouchableOpacity style={styles.viewElementsReport}>
                      <View style={styles.viewElementsReportF2}>
                        <Ionicons
                          name="grid-outline"
                          size={32}
                          color={'#6e63ff'}
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
