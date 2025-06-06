import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../constant/ThemeContext';
import { RootStackParamList } from '../navigation/RootNavigator';

interface CustomHeaderProps {
  title?: string;
}

const OtherHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
          source={require('../../assets/Icon/back.png')}
          style={styles.logo}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          {
            color: theme.primary,
            fontFamily: theme.starArenaFontSemiBold,
          },
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
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
    paddingHorizontal: 10,
    // borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  backButton: {
    // position: 'absolute',
    left: 10,
    top: 13,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
  },
});
