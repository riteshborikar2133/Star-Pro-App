import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import {Alert} from 'react-native';

const EditProfileScreen: React.FC = () => {
  const {theme} = useTheme();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState({
    name: '',
    username: '',
    age: '',
    dob: '',
    bio: '',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({...form, [key]: value});
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      const uri = response.assets?.[0]?.uri;
      if (uri) setProfilePic(uri);
      setModalVisible(false);
    });
  };

  const handleSave = () => {
    // Replace with your save logic (e.g., API call)
    console.log('Saving profile:', {profilePic, ...form});
    Alert.alert('Profile saved!');
  };

  return (
    <>
      <OtherHeader title="Profile" />

      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={styles.profilePicContainer}
            onPress={() => setModalVisible(true)}>
            <Image
              source={
                profilePic
                  ? {uri: profilePic}
                  : require('../../../assets/person.png')
              }
              style={styles.profilePic}
            />
          </TouchableOpacity>

          {['name', 'username', 'age', 'dob', 'bio'].map(key => (
            <View key={key} style={styles.inputGroup}>
              <Text style={[styles.label, {color: theme.subheading}]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <TextInput
                value={form[key as keyof typeof form]}
                onChangeText={text =>
                  handleChange(key as keyof typeof form, text)
                }
                keyboardType={key === 'age' ? 'numeric' : 'default'}
                multiline={key === 'bio'}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.card,
                    color: theme.heading,
                    height: key === 'bio' ? 80 : undefined,
                  },
                ]}
              />
            </View>
          ))}

          <TouchableOpacity
            style={[styles.saveButton, {backgroundColor: theme.accent1}]}
            onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>

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
              <TouchableOpacity
                onPress={openGallery}
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
    padding: 20,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
