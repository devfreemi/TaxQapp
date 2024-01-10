import * as React from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from '../style';
function ServicesView({navigation}): JSX.Element {
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
              color={'#2E5AAB'}
            />
          </View>
        ) : (
          <>
            <ScrollView>
              <Text style={styles.reportHead}>Categories</Text>
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
export default ServicesView;
