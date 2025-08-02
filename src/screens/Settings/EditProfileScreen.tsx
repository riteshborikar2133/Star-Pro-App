import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {PermissionsAndroid, Platform} from 'react-native';

const EditProfileScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {user} = useAuth();
  // console.log(user);

  const [form, setForm] = useState({
    name: '',
    id: '',
    gender: '',
    region: '',
    state: '',
    birthday: '',
    bio: '',
  });

  const [imageData, setImageData] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({...form, [key]: value});
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://shubhamkohad.site/auth/user/getByid',
        {
          params: {
            id: user?.id || 0,
          },
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        },
      );

      const data = response.data;

      setForm({
        name: data.name || '',
        code: data.code?.toString() || '',
        gender: data.gender || '',
        region: data.region || '',
        state: data.state || '',
        birthday: data.dob || '', // assuming 'dob' is used on backend
        bio: data.bio || '',
      });
      // setProfilePic(data.profilePic || null);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      Alert.alert('Error', 'Failed to fetch profile data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilePic = async () => {
    console.log('pic');
    if (!user?.code || !user?.jwt) return;

    try {
      const res = await axios.get(
        `https://shubhamkohad.site/auth/user/profilepic/${user.code}`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            Cookie: `accessToken=${user.jwt}`,
          },
        },
      );
      const imageUrl = res.data; // assuming the backend returns a plain URL string

      if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
        setProfilePic(imageUrl);
      }
    } catch (error) {
      console.error('Error fetching profile pic:', error?.response || error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile(); // fetch all form data
      fetchProfilePic(); // always re-fetch profile picture
    }, []),
  );

  // const openGallery = async () => {
  //   const result = await launchImageLibrary({
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     selectionLimit: 1,
  //     presentationStyle: 'fullScreen',
  //   });

  //   if (result.didCancel) {
  //     console.log('User cancelled image picker');
  //     return;
  //   }

  //   if (result.errorCode) {
  //     console.log('ImagePicker Error: ', result.errorMessage);
  //     Alert.alert('Error', 'Failed to pick image.');
  //     return;
  //   }

  //   const asset = result.assets?.[0];
  //   if (asset?.uri) {
  //     setProfilePic(asset.uri); // Show the image immediately

  //     // Prepare data for upload
  //     const uri = asset.uri;
  //     let fileName = asset.fileName;
  //     let fileType = asset.type;

  //     // Sometimes fileName or type might be missing, handle that:
  //     if (!fileName) {
  //       // Extract filename from uri for Android/iOS
  //       fileName = uri.split('/').pop() || 'profile.jpg';
  //     }

  //     if (!fileType) {
  //       // You can use mime library or fallback to image/jpeg
  //       fileType = mime.lookup(fileName) || 'image/jpeg';
  //     }

  //     setImageData({
  //       uri,
  //       name: fileName,
  //       type: fileType,
  //     });

  //     setModalVisible(false);
  //   }
  // };

  const openGallery = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      if (image?.path) {
        const uri = image.path;
        const fileName = uri.split('/').pop() || 'profile.jpg';
        const fileType = image.mime || 'image/jpeg';

        setProfilePic(uri); // Show cropped image immediately
        setImageData({
          uri,
          name: fileName,
          type: fileType,
        });
      }

      setModalVisible(false);
    } catch (error) {
      console.log('Image crop cancelled or failed:', error);
      Alert.alert('Error', 'Image selection was cancelled or failed.');
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const androidVersion = parseInt(Platform.Version, 10);

        let permissionToRequest;

        if (androidVersion >= 33) {
          // Android 13 and above
          permissionToRequest =
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
        } else {
          // Android 12 and below
          permissionToRequest =
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        }

        const granted = await PermissionsAndroid.request(permissionToRequest, {
          title: 'Storage Permission',
          message:
            'App needs access to your gallery to select a profile picture.',
          buttonPositive: 'OK',
        });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Gallery permission granted');
          openGallery(); // now call your image picker
        } else {
          console.warn('Gallery permission denied');
          Alert.alert(
            'Permission Required',
            'Please allow gallery access to upload profile photo.',
          );
        }
      } catch (err) {
        console.warn('Permission error:', err);
      }
    } else {
      // iOS - no permission required for gallery
      openGallery();
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      // 1) Call updateprofile API with your form data
      const payload = {
        ...form,
        dob: form.birthday,
        email: user?.email,
      };

      await axios.put(
        `https://shubhamkohad.site/auth/user/updateprofile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        },
      );

      // 2) If imageData exists, upload image via saveprofile API
      if (imageData) {
        console.log('change in profile pic');
        const formData = new FormData();

        formData.append('imageFile', {
          uri:
            Platform.OS === 'android'
              ? imageData.uri
              : imageData.uri.replace('file://', ''),
          name: imageData.name,
          type: imageData.type,
        } as any);

        // Assuming 'usercode' is form.code or form.id (confirm exact field)
        formData.append('usercode', user?.code || '');

        const imgpres = await axios.post(
          `https://shubhamkohad.site/auth/user/saveprofile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.jwt}`,
              'Content-Type': 'multipart/form-data',
              Cookie: `accessToken=${user?.jwt}`, // ← custom cookie
            },
          },
        );

        console.log(imgpres);
      }

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.navigate('MainTabs', {screen: 'Profile'});
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <OtherHeader title="Profile" />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.accent1} />
        ) : (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{borderWidth: 0, borderColor: 'red'}}>
            <TouchableOpacity
              style={styles.profilePicContainer}
              onPress={() => setModalVisible(true)}>
              {/* <Image
                source={
                  profilePic
                    ? {uri: profilePic}
                    : require('../../../assets/person.png')
                }
                style={styles.profilePic}
              /> */}

              <Image
                source={
                  profilePic
                    ? {uri: profilePic}
                    : require('../../../assets/person.png')
                }
                style={styles.profilePic}
              />
            </TouchableOpacity>

            {/* Text Fields */}
            {[
              {key: 'name', label: 'Name'},
              {key: 'code', label: 'ID'},
              {key: 'gender', label: 'Gender'},
              {key: 'region', label: 'Region'},
              {key: 'state', label: 'State'},
            ].map(({key, label}) => (
              <View key={key} style={styles.inputGroup}>
                <Text style={[styles.label, {color: theme.subheading}]}>
                  {label}
                </Text>
                <TextInput
                  value={form[key as keyof typeof form]}
                  editable={key !== 'code'} // <-- Make ID (code) field uneditable
                  onChangeText={text =>
                    handleChange(key as keyof typeof form, text)
                  }
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.card,
                      color: theme.heading,
                    },
                  ]}
                />
              </View>
            ))}

            {/* Birthday Picker */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, {color: theme.subheading}]}>
                Birthday
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.card,
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={{color: theme.heading}}>
                  {form.birthday || 'Select Date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={form.birthday ? new Date(form.birthday) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const iso = selectedDate.toISOString().split('T')[0];
                      handleChange('birthday', iso);
                    }
                  }}
                />
              )}
            </View>

            {/* Bio */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, {color: theme.subheading}]}>Bio</Text>
              <TextInput
                value={form.bio}
                onChangeText={text => handleChange('bio', text)}
                multiline
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.card,
                    color: theme.heading,
                    height: 80,
                  },
                ]}
              />
            </View>

            <TouchableOpacity
              style={[styles.saveButton, {backgroundColor: theme.accent1}]}
              onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* Modal for Upload Option */}
        <Modal
          transparent
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              {/* <TouchableOpacity
                onPress={openGallery}
                style={styles.sheetOption}>
                <Text style={styles.sheetText}>Upload from Gallery</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={requestGalleryPermission}
                style={styles.sheetOption}>
                <Text style={styles.sheetText}>Upload from Gallery</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  sheetOption: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  sheetText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
