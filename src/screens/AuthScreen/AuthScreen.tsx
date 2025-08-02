// screens/Auth/AuthScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../constant/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useAuth} from '../../context/AuthContext';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';

type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Auth'
>;

const AuthScreen: React.FC = () => {
  const {theme} = useTheme();
  const {loginWithGoogle, normalLogin} = useAuth();
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await loginWithGoogle();
      if (response?.type !== 'Existing User') {
        navigation.navigate('EditProfileScreen');
      } else {
        Alert.alert('Login Successful', 'Welcome back!');
      }
      Alert.alert('Login Successful', 'Welcome!');
    } catch (error) {
      console.log('Google sign-in error:', error);
      Alert.alert('Login Failed', 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email) {
      Alert.alert('Validation', 'Please enter your email');
      return;
    }
    if (!password) {
      Alert.alert('Validation', 'Please enter your password');
      return;
    }

    try {
      setIsLoading(true);

      const user = await normalLogin(email, password);
      Alert.alert('Login Successful', `Welcome, ${user.name || 'User'}!`);

      // Navigate if needed
      // navigation.navigate('Home');
    } catch (error: any) {
      console.error('Login error:', error?.response || error?.message || error);
      const errorMessage =
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={[styles.header, {backgroundColor: theme.background}]}>
          <Text style={[styles.headerTitle, {color: theme.accent1}]}>
            Login
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/splashIcon.jpeg')}
            style={{height: hp(15), width: wp(25), marginBottom: hp(3)}}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.subheading, color: theme.heading},
            ]}
            placeholder="Email"
            placeholderTextColor={theme.subheading}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.subheading, color: theme.heading},
            ]}
            placeholder="Password"
            placeholderTextColor={theme.subheading}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.accent1}]}
          onPress={handleLogin}
          disabled={isLoading}>
          <Text style={[styles.buttonText, {color: theme.heading}]}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.googleButton, {borderColor: theme.primary}]}
          onPress={handleGoogleLogin}
          disabled={isLoading}>
          <Image
            source={require('../../../assets/Icon/Settings/google.png')}
            style={styles.googleIcon}
          />
          <Text style={[styles.googleButtonText, {color: theme.primary}]}>
            {isLoading ? 'Signing in with Google...' : 'Sign in with Google'}
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={[styles.registerText, {color: theme.subheading}]}>
            Don't have an account?
          </Text>
          <TouchableOpacity
          // onPress={() => navigation.navigate('Signup')}
          >
            <Text style={[styles.registerLink, {color: theme.primary}]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  scrollView: {
    paddingBottom: 30,
  },
  header: {
    height: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(3),
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'starArenaFontSemiBold',
  },
  inputContainer: {
    marginVertical: hp(2),
  },
  input: {
    height: hp(6),
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: wp(4),
    marginBottom: hp(1.5),
    fontSize: 16,
    fontFamily: 'starArenaFont',
  },
  button: {
    height: hp(6),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'starArenaFontSemiBold',
  },
  googleButton: {
    height: hp(6),
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: wp(2),
  },
  googleButtonText: {
    fontSize: 18,
    fontFamily: 'starArenaFontSemiBold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'starArenaFont',
  },
  registerLink: {
    fontSize: 14,
    fontFamily: 'starArenaFontSemiBold',
    marginLeft: 4,
  },
});

export default AuthScreen;
