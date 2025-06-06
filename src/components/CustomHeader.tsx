// components/CustomHeader.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useTheme} from '../constant/ThemeContext';

interface CustomHeaderProps {
  username?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({username}) => {
  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CountriesSettings')}>
        <Image
          source={require('../../assets/Icon/livebutton.png')}
          style={styles.logo}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          {color: theme.primary, fontFamily: theme.starArenaFontSemiBold},
        ]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {!username ? 'Pro Star' : '@' + username}
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
        <Image
          source={require('../../assets/Menu-right.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontFamily: 'starArenaFont',
  },
});
