import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Image as RNImage,
} from 'react-native';
import {useTheme} from '../constant/ThemeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomCameraScreen from './CustomCameraScreen'; // your custom camera component

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  postCount: number;
  onMediaSelected?: (media: any) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  setActiveTab,
  postCount,
  onMediaSelected,
}) => {
  const {theme} = useTheme();

  // Modal states
  const [uploadOptionsVisible, setUploadOptionsVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  // Store the final confirmed photo URI here
  const [finalPhotoUri, setFinalPhotoUri] = useState<string | null>(null);

  // Tab button press handler
  const handleTabPress = useCallback(
    (tab: string) => {
      setActiveTab(tab);
    },
    [setActiveTab],
  );

  // Open camera modal and close upload options modal
  const openUploadPicture = () => {
    setUploadOptionsVisible(false);
    setCameraVisible(true);
  };

  // Placeholder for video upload
  const openUploadVideo = () => {
    setUploadOptionsVisible(false);
    Alert.alert('Coming soon', 'Video upload not implemented yet.');
  };

  // When photo is confirmed from CustomCameraScreen
  const handlePhotoConfirmed = (photoUri: string) => {
    setCameraVisible(false);
    setFinalPhotoUri(photoUri);

    // You can upload here or pass to parent
    if (onMediaSelected) {
      onMediaSelected({path: photoUri});
    }
    // Alert.alert('Photo Selected', 'You can now upload or use this photo.');
  };

  // Close camera modal
  const handleCameraCancel = () => {
    setCameraVisible(false);
  };

  return (
    <>
      <View style={[styles.tabHeader, {borderColor: theme.subheading}]}>
        <TouchableOpacity
          style={[styles.tabButton, {width: wp(45)}]}
          onPress={() => handleTabPress('Post')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Post'
                ? styles.activeTabText
                : styles.unactiveTabText,
              {fontFamily: theme.starArenaFont},
            ]}>
            Posts {postCount}
          </Text>
        </TouchableOpacity>

        <View style={{height: '100%', width: wp(0.1),backgroundColor:theme.subheading}} />
        {/* Upload/Add button */}
        <TouchableOpacity
          onPress={() => setUploadOptionsVisible(true)}
          style={[
            styles.tabButton,
            {width: wp(45), flexDirection: 'row', justifyContent: 'center'},
          ]}>
          <Image
            source={require('../../assets/Icon/livebutton.png')}
            style={{
              height: hp(2.5),
              width: hp(2.5),
              marginHorizontal: 10,
            }}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.tabButton, {width: wp(45)}]}
          onPress={() => handleTabPress('Clips')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Clips'
                ? styles.activeTabText
                : styles.unactiveTabText,
              {fontFamily: theme.starArenaFont},
            ]}>
            Clips
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Upload options modal */}
      <Modal
        transparent
        animationType="slide"
        visible={uploadOptionsVisible}
        onRequestClose={() => setUploadOptionsVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setUploadOptionsVisible(false)}
          activeOpacity={1}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={openUploadPicture}
              style={styles.sheetOption}>
              <Text style={styles.sheetText}>Upload Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openUploadVideo}
              style={styles.sheetOption}>
              <Text style={styles.sheetText}>Upload Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUploadOptionsVisible(false)}
              style={[styles.sheetOption, {backgroundColor: '#f66'}]}>
              <Text style={[styles.sheetText, {color: '#fff'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Camera modal */}
      <Modal
        visible={cameraVisible}
        animationType="slide"
        onRequestClose={handleCameraCancel}>
        <CustomCameraScreen
          onPhotoConfirmed={handlePhotoConfirmed}
          onCancel={handleCameraCancel}
        />
      </Modal>

      {/* Optional: Show last selected photo thumbnail */}
      {/* {finalPhotoUri && (
        <View style={styles.thumbnailContainer}>
          <Text style={{ color: 'white', marginBottom: 5 }}>Last selected photo:</Text>
          <RNImage
            source={{ uri: finalPhotoUri }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
        </View>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: hp(1),
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabText: {
    textAlign: 'center',
    fontSize: hp(1.7),
  },
  activeTabText: {
    color: '#fff',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    fontWeight: '700',
  },
  unactiveTabText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#111',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetOption: {
    paddingVertical: 15,
    borderRadius: 40,
  },
  sheetText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default TabBar;
