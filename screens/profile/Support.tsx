import React, {useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../style';

function Support(): JSX.Element {
  const [isLoading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
    return false;
  }, 300);
  const openURL = async () => {
    Linking.openURL('https://complyify.in/');
  };
  const openEmail = async () => {
    Linking.openURL('mailto:complyify1@gmail.com');
  };
  const openMobile = async () => {
    Linking.openURL('tel:+917439890955');
  };
  const chat = async () => {
    Linking.openURL('sms:+917439890955');
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
              Welcome to Help & Support
            </Text>
            <Text style={styles.supportText}>
              Hi, What can we help you with?
            </Text>
          </View>

          <View style={styles.homeGridSupport}>
            <View style={[styles.cardLog]}>
              <View style={styles.viewSupportIcon}>
                <Ionicons name="headset" size={32} color={'#494F55'} />
              </View>
              <View style={styles.homeGridViewLog}>
                <TouchableOpacity
                  style={[styles.cardSupport]}
                  onPress={openEmail}>
                  <View style={styles.viewElements}>
                    <View style={(styles.viewElementsInnerF2, styles.IconView)}>
                      <Ionicons name="mail" size={22} color={'#0a0099'} />
                    </View>
                    <View style={styles.viewElementsInnerF2}>
                      <Text style={styles.innerTextViewHeadLog}>
                        Email address
                      </Text>
                      <Text style={styles.innerTextViewLog}>
                        complyify1@gmail.com
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.homeGridViewLog}>
                <TouchableOpacity
                  style={[styles.cardSupport]}
                  onPress={openMobile}>
                  <View style={styles.viewElements}>
                    <View style={(styles.viewElementsInnerF2, styles.IconView)}>
                      <Ionicons
                        name="phone-portrait"
                        size={22}
                        color={'#0a0099'}
                      />
                    </View>
                    <View style={styles.viewElementsInnerF2}>
                      <Text style={styles.innerTextViewHeadLog}>
                        Phone number
                      </Text>
                      <Text style={styles.innerTextViewLog}>+917439890955</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.homeGridViewLog}>
                <TouchableOpacity
                  style={[styles.cardSupport]}
                  onPress={openURL}>
                  <View style={styles.viewElements}>
                    <View style={(styles.viewElementsInnerF2, styles.IconView)}>
                      <Ionicons name="link" size={22} color={'#0a0099'} />
                    </View>
                    <View style={styles.viewElementsInnerF2}>
                      <Text style={styles.innerTextViewHeadLog}>Website</Text>
                      <Text style={styles.innerTextViewLog}>
                        www.complyify.in
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.buttonChat} onPress={chat}>
                <View style={styles.buttonG}>
                  <Text style={styles.chatText}>Chat With Us</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
export default Support;
