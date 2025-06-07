import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import NotificationTabScreen from './NotificationTabScreen';
import ChatScreeen from './ChatScreen';

const NotificationScreen = () => {
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState<'Notification' | 'Chats'>(
    'Notification',
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <OtherHeader title={activeTab} />

      {/* Tabs */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            {
              borderColor: theme.card,
              backgroundColor:
                activeTab === 'Notification' ? theme.accent1 : theme.card,
            },
          ]}
          onPress={() => setActiveTab('Notification')}>
          <Text style={[styles.tabText, {color: theme.heading}]}>
            Notification
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            {
              borderColor: theme.card,
              backgroundColor:
                activeTab === 'Chats' ? theme.accent1 : theme.card,
            },
          ]}
          onPress={() => setActiveTab('Chats')}>
          <Text style={[styles.tabText, {color: theme.heading}]}>Chats</Text>
        </TouchableOpacity>
      </View>

      {/* Screens */}
      {activeTab === 'Notification' && <NotificationTabScreen />}
      {activeTab === 'Chats' && <ChatScreeen />}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'white', // Default; will be overridden with theme
  },
  tabText: {
    textAlign: 'center',
    fontFamily: 'starArenaFont', // Make sure this is properly linked
  },
});
