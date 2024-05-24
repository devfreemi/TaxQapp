import React, {useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../style';

function PrivacyNpolicy(): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const openURL = async () => {
    Linking.openURL('https://complyify.in/privacyandpolicy.php');
  };
  setTimeout(() => {
    setLoading(false);
    return false;
  }, 300);

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
        <ScrollView>
          <View style={styles.applicationContainer}>
            <Text style={styles.applicationHeadText}>Our Privacy & Policy</Text>
            <Text style={styles.TandCText}>
              {' '}
              <Ionicons
                name="time-outline"
                size={13}
                color={'#2f3337'}
                style={styles.itemStatusText}
              />{' '}
              Last updated February 20, 2024
            </Text>
            <Text style={styles.TandCText}>
              This privacy notice for True Technologies (doing business as
              Complyify) ('we', 'us', or 'our'), describes how and why we might
              collect, store, use, and/or share ('process') your information
              when you use our services ('Services'), such as when you:{'\n'}{' '}
              {'\n'}
              <Ionicons
                name="ellipse"
                size={10}
                color={'#2f3337'}
                style={styles.itemStatusText}
              />{' '}
              Visit our website at https://complyify.in , or any website of ours
              that links to this privacy notice
              {'\n'}
              {'\n'}
              <Ionicons
                name="ellipse"
                size={10}
                color={'#2f3337'}
                style={styles.itemStatusText}
              />{' '}
              Download and use our mobile application (Complyifi) , our Facebook
              application, or any other application of ours that links to this
              privacy notice
              {'\n'}
              {'\n'}
              <Ionicons
                name="ellipse"
                size={10}
                color={'#2f3337'}
                style={styles.itemStatusText}
              />{' '}
              Engage with us in other related ways, including any sales,
              marketing, or events
              {'\n'}
            </Text>
            <Text style={styles.tcHead}>SUMMARY OF KEY POINTS</Text>
            <Text style={styles.TandCText}>
              This summary provides key points from our privacy notice, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our table of
              contents below to find the section you are looking for.
              {'\n'}
              What personal information do we process? When you visit, use, or
              navigate our Services, we may process personal information
              depending on how you interact with us and the Services, the
              choices you make, and the products and features you use. Learn
              more about personal information you disclose to us.
              {'\n'}
              Do we process any sensitive personal information? We may process
              sensitive personal information when necessary with your consent or
              as otherwise permitted by applicable law. Learn more about
              sensitive information we process.
              {'\n'}
              Do we receive any information from third parties? We may receive
              information from public databases, marketing partners, social
              media platforms, and other outside sources. Learn more about
              information collected from other sources.
              {'\n'}
              How do we process your information? We process your information to
              provide, improve, and administer our Services, communicate with
              you, for security and fraud prevention, and to comply with law. We
              may also process your information for other purposes with your
              consent. We process your information only when we have a valid
              legal reason to do so. Learn more about how we process your
              information.
              {'\n'}
              In what situations and with which types of parties do we share
              personal information? We may share information in specific
              situations and with specific categories of third parties. Learn
              more about when and with whom we share your personal information.
              {'\n'}
              How do we keep your information safe? We have organisational and
              technical processes and procedures in place to protect your
              personal information. However, no electronic transmission over the
              internet or information storage technology can be guaranteed to be
              100% secure, so we cannot promise or guarantee that hackers,
              cybercriminals, or other unauthorised third parties will not be
              able to defeat our security and improperly collect, access, steal,
              or modify your information. Learn more about how we keep your
              information safe.
              {'\n'}
              What are your rights? Depending on where you are located
              geographically, the applicable privacy law may mean you have
              certain rights regarding your personal information. Learn more
              about your privacy rights.
              {'\n'}
              How do you exercise your rights? The easiest way to exercise your
              rights is by visiting http://www.cpmplify.in , or by contacting
              us. We will consider and act upon any request in accordance with
              applicable data protection laws.
              {'\n'}
              Want to learn more about what we do with any information we
              collect? Review the privacy notice in full.
            </Text>
            <Text style={styles.tcHead}>TABLE OF CONTENTS</Text>
            <Text style={styles.TandCText}>
              1. WHAT INFORMATION DO WE COLLECT?
              {'\n'}
              2. HOW DO WE PROCESS YOUR INFORMATION?
              {'\n'}
              3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
              {'\n'}
              4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
              {'\n'}
              5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
              {'\n'}
              6. HOW LONG DO WE KEEP YOUR INFORMATION?
              {'\n'}
              7. HOW DO WE KEEP YOUR INFORMATION SAFE?
              {'\n'}
              8. DO WE COLLECT INFORMATION FROM MINORS?
              {'\n'}
              9. WHAT ARE YOUR PRIVACY RIGHTS?
              {'\n'}
              10. CONTROLS FOR DO-NOT-TRACK FEATURES
              {'\n'}
              11. DO WE MAKE UPDATES TO THIS NOTICE?
              {'\n'}
              12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
              {'\n'}
              13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </Text>
            <TouchableOpacity style={styles.buttonReadmore} onPress={openURL}>
              <View>
                <Text style={styles.readText}>Read More</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
export default PrivacyNpolicy;
