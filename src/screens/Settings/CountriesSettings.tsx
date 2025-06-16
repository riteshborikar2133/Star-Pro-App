// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {useTheme} from '../../constant/ThemeContext'; // ✅ Assume this is defined correctly
// import CheckBox from '@react-native-community/checkbox';

// const CountriesSettings = () => {
//   const {theme} = useTheme();
//   const navigation = useNavigation();

//   const countries = [
//     'United States',
//     'Canada',
//     'Brazil',
//     'United Kingdom',
//     'Germany',
//     'France',
//     'Italy',
//     'South Africa',
//     'Egypt',
//     'India',
//     'China',
//     'Japan',
//     'South Korea',
//     'Australia',
//     'New Zealand',
//     'Mexico',
//     'Argentina',
//     'Nigeria',
//     'Russia',
//     'Indonesia',
//   ];

//   const [selected, setSelected] = useState<{[key: string]: boolean}>({});

//   const toggleSelection = (country: string) => {
//     setSelected(prev => ({...prev, [country]: !prev[country]}));
//   };

//   return (
//     <>
//       {/* Header */}
//       <View style={[styles.header, {backgroundColor: theme.background}]}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={require('../../../assets/Close.png')}
//             style={{height: 20, width: 20}}
//           />
//         </TouchableOpacity>
//         <Text style={[styles.title, {color: theme.primary}]}>Pro Star</Text>
//         <Image
//           source={require('../../../assets/Menu-right.png')}
//           style={styles.logo}
//         />
//       </View>

//       {/* Body */}
//       <View style={[styles.container, {backgroundColor: theme.background}]}>
//         <Text style={{color: theme.subheading, marginBottom: 10}}>
//           Select Countries
//         </Text>

//         <View
//           style={{
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-evenly',
//             gap: 10,
//             marginTop: 12,
//           }}>
//           {countries.map((item, index) => (
//             <View
//               key={index}
//               style={{
//                 width: '48%',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 paddingVertical: 8,
//                 gap: 10,
//               }}>
//               <CheckBox
//                 value={!!selected[item]}
//                 onValueChange={() => toggleSelection(item)}
//                 tintColors={{
//                   true: '#FFFFFF', // checked
//                   false: '#FFFFFF', // unchecked
//                 }}
//                 style={{
//                   width: 20,
//                   height: 20,
//                 }}
//               />
//               <Text
//                 style={{
//                   color: theme.heading,
//                   fontFamily: theme.starArenaFont,
//                   fontSize: 14,
//                 }}>
//                 {item}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </>
//   );
// };

// export default CountriesSettings;

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//   },
//   logo: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 18,
//     textAlign: 'center',
//     flex: 1,
//     fontFamily: 'starArenaFont',
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardTypeOptions,
} from 'react-native';
import OtherHeader from '../../components/OtherHeader';
import {useTheme} from '../../constant/ThemeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

type TabType = 'GoLive' | 'JoinParty' | null;

interface NationalityItem {
  label: string;
  value: string;
}
const CountriesSettings: React.FC = () => {
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>(null);

  const [nationalityOpen, setNationalityOpen] = useState<boolean>(false);
  const [nationality, setNationality] = useState<string | null>(null);
  const [nationalityItems, setNationalityItems] = useState<NationalityItem[]>([
    {label: 'Indian', value: 'indian'},
    {label: 'American', value: 'american'},
    {label: 'Other', value: 'other'},
  ]);

  const renderInput = (
    label: string,
    placeholder: string,
    keyboardType: KeyboardTypeOptions = 'default',
  ) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, {color: theme.subheading}]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.heading}
        keyboardType={keyboardType}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.heading,
            fontFamily: theme.starArenaFont,
          },
        ]}
      />
    </View>
  );

  useEffect(() => {
    setActiveTab(null);
  }, []);

  return (
    <>
      <OtherHeader title="Live" />
      {activeTab === null && (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
          <TouchableOpacity onPress={() => setActiveTab('GoLive')}>
            <View style={[styles.button, {backgroundColor: theme.accent1}]}>
              <Text
                style={[
                  styles.buttonText,
                  {color: theme.heading, fontFamily: theme.starArenaFont},
                ]}>
                Go Live
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('JoinParty')}>
            <View style={[styles.button, {backgroundColor: theme.accent1}]}>
              <Text
                style={[
                  styles.buttonText,
                  {color: theme.heading, fontFamily: theme.starArenaFont},
                ]}>
                Join Party
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {activeTab === 'GoLive' && (
        <ScrollView
          style={{flex: 1, backgroundColor: theme.background}}
          contentContainerStyle={{padding: wp(5)}}
          showsVerticalScrollIndicator={false}>
          {renderInput('Name', 'Enter your name')}
          {renderInput('Date of Birth', 'DD/MM/YYYY', 'numeric')}

          <View style={styles.inputGroup}>
            <Text style={[styles.label, {color: theme.subheading}]}>
              Nationality
            </Text>
            <DropDownPicker
              open={nationalityOpen}
              value={nationality}
              items={nationalityItems}
              setOpen={setNationalityOpen}
              setValue={setNationality}
              setItems={setNationalityItems}
              placeholder="Select Nationality"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.card,
              }}
              textStyle={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
              }}
              dropDownContainerStyle={{backgroundColor: theme.card}}
              listItemLabelStyle={{color: theme.heading}}
              placeholderStyle={{color: theme.heading}}
            />
          </View>

          {renderInput('Email ID', 'Enter your email', 'email-address')}
          {renderInput('WhatsApp Number', 'Enter WhatsApp number', 'phone-pad')}
          {renderInput('Aadhaar Card Number', 'XXXX-XXXX-XXXX', 'numeric')}

          <View style={styles.uploadRow}>
            <View style={[styles.uploadColumn]}>
              <Text style={[styles.label, {color: theme.subheading}]}>
                Upload Document 1
              </Text>
              <TouchableOpacity
                style={[
                  styles.uploadBox,
                  {backgroundColor: theme.card, borderColor: theme.subheading},
                ]}>
                <Text style={{color: theme.heading}}>Upload File</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.uploadColumn]}>
              <Text style={[styles.label, {color: theme.subheading}]}>
                Upload Document 2
              </Text>
              <TouchableOpacity
                style={[
                  styles.uploadBox,
                  {backgroundColor: theme.card, borderColor: theme.subheading},
                ]}>
                <Text style={{color: theme.heading}}>Upload File</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: theme.card}]}
              onPress={() => setActiveTab(null)} // go back to previous view
            >
              <Text
                style={[
                  styles.actionButtonText,
                  {color: theme.heading, fontFamily: theme.starArenaFont},
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: theme.accent1}]}
              onPress={() => {
                // handle submission logic here
              }}>
              <Text
                style={[
                  styles.actionButtonText,
                  {color: theme.heading, fontFamily: theme.starArenaFont},
                ]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(1.5),
    borderRadius: 10,
    margin: hp(2),
    width: wp(40),
  },
  buttonText: {
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: hp(2),
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    height: hp(6),
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  uploadBox: {
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(3), // Optional spacing between columns
    marginBottom: hp(2),
  },
  uploadColumn: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    gap: wp(3),
  },
  actionButton: {
    flex: 1,
    paddingVertical: hp(1.5),
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
  },
});

export default CountriesSettings;
