/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginOption from '../screens/LoginOption';
import MobileLogin from '../screens/MobileLogin';
import MobileVerification from '../screens/MobileVerification';
import ServicesView from '../screens/ServicesView';
import SignUp from '../screens/SignUp';
import CompanyIncorporation from '../screens/form/CompanyIncorporation';
import CorporateCompliance from '../screens/form/CorporateCompliance';
import DigitalSignature from '../screens/form/DigitalSignature';
import GstFilling from '../screens/form/GstFilling';
import GstLicense from '../screens/form/GstLicense';
import IncomeTax from '../screens/form/IncomeTax';
import PanCard from '../screens/form/PanCard';
import TradeLicense from '../screens/form/TradeLicense';
import Conformation from '../screens/form/conformation';
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
        name="MobileVerification"
        component={MobileVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MobileLogin"
        component={MobileLogin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
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
      <Stack.Screen name="Gst Return" component={GstFilling} />
      <Stack.Screen name="Digital Signature" component={DigitalSignature} />
      <Stack.Screen
        name="Company Incorporation"
        component={CompanyIncorporation}
      />
      <Stack.Screen
        name="Corporate Compliance"
        component={CorporateCompliance}
      />
      <Stack.Screen name="GST Registration" component={GstLicense} />
      <Stack.Screen name="Trade License" component={TradeLicense} />
      <Stack.Screen name="Pan Card Application" component={PanCard} />
      <Stack.Screen name="Application Status" component={Conformation} />
    </Stack.Navigator>
  );
};

export default Navigation;
