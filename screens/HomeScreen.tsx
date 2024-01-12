/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
// import {LineChart} from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style';
import Profile from './Profile';
import ServicesView from './ServicesView';
const Tab = createBottomTabNavigator();
function HomeScreen({navigation}): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'reader' : 'reader-outline';
          } else if (route.name === 'Services') {
            iconName = focused
              ? 'file-tray-stacked'
              : 'file-tray-stacked-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1ec677',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: '#1ec677',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen name="Services" component={ServicesView} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
// Backhandler
function Home() {
  // console.log(props.route.params);
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
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 1500);

  //
  return (
    <SafeAreaView style={styles.ContentViewHome}>
      <View>
        {isLoading ? (
          <View style={styles.ContentViewHomeChild}>
            <ActivityIndicator
              animating={isLoading}
              size={'large'}
              style={styles.StyleIndicator}
              color={'#2E5AAB'}
            />
          </View>
        ) : (
          <>
            <ScrollView>
              <View style={styles.homeGridView}>
                <View style={[styles.card]}>
                  <View style={styles.viewElementsInnerF2}>
                    <Text style={styles.innerTextViewHead}>Your Services</Text>
                    <View style={styles.viewElements}>
                      <Text style={styles.innerTextView}>Services</Text>
                      <Text style={styles.innerTextViewStatus}>02</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.services}>
                <Text style={styles.serviceText}>Services</Text>
              </View>
              <View style={styles.homeGridView2}>
                <View style={styles.tableTDHead}>
                  <View style={styles.viewTableHead}>
                    <Text style={styles.itemHead}>Service</Text>
                    <Text style={styles.itemHead}>Status </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
