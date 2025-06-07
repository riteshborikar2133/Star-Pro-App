import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: {
    card: string;
    heading: string;
    starArenaFont: string;
  };
  postCount: number;
}

const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  postCount,
}) => {
  const [count, setCount] = useState(0);

  const handleTabPress = useCallback((tab: string) => {
    setActiveTab(tab);
    setCount(prev => prev + 1);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleTabPress('Moments')}
        style={[
          styles.button,
          {
            backgroundColor: activeTab === 'Moments' ? 'white' : theme.card,
            borderColor: activeTab === 'Moments' ? 'white' : theme.card,
          },
        ]}>
        <Text
          style={{
            color: activeTab === 'Moments' ? 'black' : theme.heading,
            fontFamily: theme.starArenaFont,
            fontSize: 16,
            textAlign: 'center',
          }}>
          Posts {postCount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleTabPress('Blogs')}
        style={[
          styles.button,
          {
            backgroundColor: activeTab === 'Blogs' ? 'white' : theme.card,
            borderColor: activeTab === 'Blogs' ? 'white' : theme.card,
          },
        ]}>
        <Text
          style={{
            color: activeTab === 'Blogs' ? 'black' : theme.heading,
            fontFamily: theme.starArenaFont,
            fontSize: 16,
            textAlign: 'center',
          }}>
          Clips
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    zIndex: 10,
    elevation: 10,
  },
  button: {
    width: '48%',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
