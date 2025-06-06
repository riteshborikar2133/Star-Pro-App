import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';

// Define navigation prop type for this screen
type NotificationSettingScreenProp =
  NativeStackNavigationProp<RootStackParamList>;

const NotificationScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<NotificationSettingScreenProp>();

  // State for toggles
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState<boolean>(false);

  return (
    <>
      <OtherHeader title="Notification" />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={{paddingVertical: 5, paddingHorizontal: 12}}>
          <Text style={{color: theme.subheading, fontSize: 15}}>
            Live Streams
          </Text>
          <View style={{paddingVertical: 10}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LiveNotificationScreen');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}>
                    Live Notification
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: 14,
                      fontFamily: theme.starArenaFont,
                    }}>
                    Get notified when your friends are live
                  </Text>
                </View>
                <Image
                  source={require('../../../assets/Icon/Settings/forward.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sound & Vibration Settings */}
        <View style={{paddingVertical: 5, paddingHorizontal: 12}}>
          <Text style={{color: theme.subheading, fontSize: 15}}>
            Preferences
          </Text>

          {/* In-App Sound Toggle */}
          <View style={{paddingVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 18,
                  fontFamily: theme.starArenaFont,
                }}>
                In-App Sound
              </Text>
              <Switch
                value={isSoundEnabled}
                onValueChange={setIsSoundEnabled}
                trackColor={{false: '#767577', true: theme.accent2}}
                thumbColor={isSoundEnabled ? theme.accent1 : '#f4f3f4'}
              />
            </View>
          </View>

          {/* In-App Vibration Toggle */}
          <View style={{paddingVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 18,
                  fontFamily: theme.starArenaFont,
                }}>
                In-App Vibrations
              </Text>
              <Switch
                value={isVibrationEnabled}
                onValueChange={setIsVibrationEnabled}
                trackColor={{false: '#767577', true: theme.accent2}}
                thumbColor={isVibrationEnabled ? theme.accent1 : '#f4f3f4'}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
