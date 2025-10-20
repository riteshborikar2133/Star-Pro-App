import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
  Pressable,
  Animated,
  TextInput,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useAuth} from '../context/AuthContext';

// Import vector icons (make sure you install react-native-vector-icons or @expo/vector-icons)
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const BUTTON_SIZE = 70;
const FOCUS_ANIMATION_DURATION = 1000;

interface CustomCameraScreenProps {
  onPhotoConfirmed: (photoUri: string) => void;
  onCancel: () => void;
}

const CustomCameraScreen: React.FC<CustomCameraScreenProps> = ({
  onPhotoConfirmed,
  onCancel,
}) => {
  const cameraRef = useRef<Camera>(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const backDevice = useCameraDevice('back');
  const frontDevice = useCameraDevice('front');
  const [device, setDevice] = useState(backDevice);

  const [loading, setLoading] = useState(true);
  const [flowStep, setFlowStep] = useState<'camera' | 'preview' | 'caption'>(
    'camera',
  );
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [focusPoint, setFocusPoint] = useState<{x: number; y: number} | null>(
    null,
  );
  const focusAnimation = useRef(new Animated.Value(0)).current;
  const [focusCoords, setFocusCoords] = useState<{x: number; y: number} | null>(
    null,
  );
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');

  const {user, token} = useAuth();

  useEffect(() => {
    const requestPerm = async () => {
      const permission = await requestPermission();
      if (!permission) {
        Alert.alert(
          'Permission Required',
          'Camera access is needed to take photos.',
          [{text: 'OK', onPress: onCancel}],
        );
      }
      setLoading(false);
    };
    requestPerm();
  }, [requestPermission, onCancel]);

  useEffect(() => {
    if (device?.position === 'back' && backDevice) setDevice(backDevice);
    else if (device?.position === 'front' && frontDevice)
      setDevice(frontDevice);
  }, [backDevice, frontDevice]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({flash});
        const uri = `file://${photo.path}`;
        setPhotoUri(uri);
        setFlowStep('preview');
      } catch (error) {
        console.error('Failed to take photo:', error);
      }
    }
  };

  const pickFromGallery = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        cropping: false,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });
      setPhotoUri(image.path);
      setFlowStep('preview');
    } catch (e) {
      // Cancelled
    }
  };

  const handleCropWithOriginal = async () => {
    if (!photoUri) return;
    try {
      const cropOptions: any = {
        path: photoUri,
        cropping: true,
        compressImageQuality: 0.8,
      };

      const cropped = await ImageCropPicker.openCropper(cropOptions);
      setPhotoUri(cropped.path);
    } catch (e) {
      console.log('Crop cancelled or failed:', e);
    }
  };

  const onTapToFocus = (event: any) => {
    const {locationX, locationY} = event.nativeEvent;
    const x = locationX / SCREEN_WIDTH;
    const y = locationY / SCREEN_HEIGHT;

    setFocusPoint({x, y});
    setFocusCoords({x: locationX, y: locationY});

    focusAnimation.setValue(1);
    Animated.timing(focusAnimation, {
      toValue: 0,
      duration: FOCUS_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const switchCamera = () => {
    if (device?.position === 'back' && frontDevice) setDevice(frontDevice);
    else if (device?.position === 'front' && backDevice) setDevice(backDevice);
  };

  const toggleFlash = () => {
    if (flash === 'off') setFlash('on');
    else if (flash === 'on') setFlash('auto');
    else setFlash('off');
  };

  const handleConfirm = async () => {
    if (!photoUri) return;

    try {
      const formData = new FormData();
      const extension = photoUri.split('.').pop()?.toLowerCase();
      let mimeType = 'image/jpeg'; // default
      let fileName = 'photo.jpg'; // default

      if (extension === 'png') {
        mimeType = 'image/png';
        fileName = 'photo.png';
      }

      // const formData = new FormData();

      formData.append('image', {
        uri: photoUri,
        name: fileName,
        type: mimeType,
      });

      formData.append('caption', caption);
      formData.append('usercode', `${user?.code}`);

      console.log(token);
      const response = await fetch(
        'https://proxstream.online/auth/post/create-post',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            // Cookie: `accessToken=${token}`,
          },
          body: formData,
        },
      );
      console.log(response);
      if (response.ok) {
        onPhotoConfirmed(photoUri);
        Alert.alert('Success', 'Image uploaded successfully.');
      } else {
        const text = await response.text();
        console.warn('Server response:', text);
        Alert.alert('Upload Failed', 'Something went wrong.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload the image.');
    }
  };

  if (loading || !device) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.permissionText}>
          Waiting for camera permission or device...
        </Text>
      </View>
    );
  }

  if (flowStep === 'preview' && photoUri) {
    return (
      <View style={styles.previewContainer}>
        <Image
          source={{uri: photoUri}}
          style={styles.previewImage}
          resizeMode="contain"
        />

        <View style={styles.previewButtons}>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={() => {
              setPhotoUri(null);
              setFlowStep('camera');
              setFocusPoint(null);
            }}>
            <Ionicons name="refresh" size={24} color="white" />
            <Text style={styles.previewButtonText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.previewButton}
            onPress={handleCropWithOriginal}>
            <Ionicons name="crop" size={24} color="white" />
            <Text style={styles.previewButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.previewButton, {backgroundColor: '#4CAF50'}]}
            onPress={() => setFlowStep('caption')}>
            <Ionicons name="arrow-forward" size={24} color="white" />
            <Text style={[styles.previewButtonText, {color: 'white'}]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (flowStep === 'caption') {
    return (
      <View style={styles.captionContainer}>
        <Image
          source={{uri: photoUri!}}
          style={styles.captionImage}
          resizeMode="contain"
        />
        <Text style={styles.captionLabel}>Enter a caption:</Text>
        <View style={styles.captionInputWrapper}>
          <TextInput
            style={styles.captionInput}
            value={caption}
            onChangeText={setCaption}
            placeholder="Write something..."
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.captionButtons}>
          <TouchableOpacity
            style={[
              styles.previewButton,
              {
                backgroundColor: '#555',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={() => setFlowStep('preview')}>
            <Ionicons name="arrow-back" size={22} color="white" />
            <Text style={[styles.previewButtonText, {marginLeft: 6}]}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.previewButton,
              {
                backgroundColor: '#4CAF50',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={handleConfirm}>
            <Ionicons name="cloud-upload" size={22} color="white" />
            <Text
              style={[
                styles.previewButtonText,
                {color: 'white', marginLeft: 6},
              ]}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Gradient overlay top */}
      <View style={styles.topGradient} pointerEvents="none" />
      {/* Gradient overlay bottom */}
      <View style={styles.bottomGradient} pointerEvents="none" />

      <Pressable style={StyleSheet.absoluteFill} onPress={onTapToFocus}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
          flash={flash}
          focusPoint={focusPoint ?? undefined}
        />

        {focusCoords && (
          <Animated.View
            style={[
              styles.focusCircle,
              {
                left: focusCoords.x - 40,
                top: focusCoords.y - 40,
                opacity: focusAnimation,
                transform: [
                  {
                    scale: focusAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  },
                ],
              },
            ]}
            pointerEvents="none"
          />
        )}
      </Pressable>

      <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
        <Ionicons name="close" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={pickFromGallery}
          activeOpacity={0.7}>
          <Ionicons name="image" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePhoto}
          activeOpacity={0.7}>
          <View style={styles.innerCaptureButton} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={switchCamera}
          activeOpacity={0.7}>
          <Ionicons name="camera-reverse" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.flashButton}
        onPress={toggleFlash}
        activeOpacity={0.7}>
        <Ionicons
          name={
            flash === 'off'
              ? 'flash-off'
              : flash === 'on'
              ? 'flash'
              : 'flash-auto'
          }
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  galleryButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  captureButton: {
    width: BUTTON_SIZE + 20,
    height: BUTTON_SIZE + 20,
    borderRadius: (BUTTON_SIZE + 20) / 2,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
  innerCaptureButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: 'white',
    borderRadius: BUTTON_SIZE / 2,
  },
  switchButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  flashButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 10,
    zIndex: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 5,
    zIndex: 30,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {color: 'white', fontSize: 16, marginTop: 10},
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  previewImage: {width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.75},
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  previewButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  previewButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 6,
  },
  focusCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 40,
  },
  captionContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  captionImage: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.4,
    borderRadius: 8,
  },
  captionLabel: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  captionInputWrapper: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  captionInput: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 10,
  },
  captionButtons: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
    width: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    height: 60,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    height: 150,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
});

export default CustomCameraScreen;
