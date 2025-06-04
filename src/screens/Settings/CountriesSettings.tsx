import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../constant/ThemeContext'; // ✅ Assume this is defined correctly
import CheckBox from '@react-native-community/checkbox';

const CountriesSettings = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const countries = [
    'United States',
    'Canada',
    'Brazil',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'South Africa',
    'Egypt',
    'India',
    'China',
    'Japan',
    'South Korea',
    'Australia',
    'New Zealand',
    'Mexico',
    'Argentina',
    'Nigeria',
    'Russia',
    'Indonesia',
  ];

  const [selected, setSelected] = useState<{[key: string]: boolean}>({});

  const toggleSelection = (country: string) => {
    setSelected(prev => ({...prev, [country]: !prev[country]}));
  };

  return (
    <>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/Close.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
        <Text style={[styles.title, {color: theme.primary}]}>Pro Star</Text>
        <Image
          source={require('../../../assets/Menu-right.png')}
          style={styles.logo}
        />
      </View>

      {/* Body */}
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={{color: theme.subheading, marginBottom: 10}}>
          Select Countries
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            gap: 10,
            marginTop: 12,
          }}>
          {countries.map((item, index) => (
            <View
              key={index}
              style={{
                width: '48%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                gap: 10,
              }}>
              <CheckBox
                value={!!selected[item]}
                onValueChange={() => toggleSelection(item)}
                tintColors={{
                  true: '#FFFFFF', // checked
                  false: '#FFFFFF', // unchecked
                }}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: 14,
                }}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default CountriesSettings;

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
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
