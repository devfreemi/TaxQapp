/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginOption from '../screens/LoginOption';
import ServicesView from '../screens/ServicesView';
import IncomeTax from '../screens/form/IncomeTax';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginHome"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      {/* <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="ServicesView"
        component={ServicesView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginHome"
        component={LoginOption}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Income Tax" component={IncomeTax} />
    </Stack.Navigator>
  );
};

export default Navigation;
