// components/OtherHeader.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../constant/ThemeContext';

interface CustomHeaderProps {
  title?: string;
  source?: string;
}

const OtherHeader: React.FC<CustomHeaderProps> = ({title}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, {backgroundColor: theme.background}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        activeOpacity={0.7}>
        <Image
          source={require('../../assets/Icon/back.png')}
          style={styles.logo}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          {color: theme.primary, fontFamily: theme.starArenaFontSemiBold},
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default OtherHeader;

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    position: 'absolute',
    left: 10,
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    height: '50%',
    marginRight: 20,
  },
});
