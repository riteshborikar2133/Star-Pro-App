import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useTheme} from '../../constant/ThemeContext';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {useAuth} from '../../context/AuthContext';

type MomentScreenProps = {
  setPostCount: (count: number) => void;
};

// const USER_CODE = 'PH103'; // Change if needed

const MomentScreen: React.FC<MomentScreenProps> = ({setPostCount}) => {
  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {user, token} = useAuth();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const getData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://proxstream.online/auth/post/postsbyuser?usercode=${user?.code}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `accessToken=${token}`,
              },
            },
          );

          if (isActive) {
            setData(res.data);
            setPostCount(res.data.length);
          }
        } catch (error) {
          console.error('Data fetch error:', error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      getData();

      return () => {
        isActive = false; // Prevent updates if component unmounts
      };
    }, [user?.code, user?.jwt]),
  );

  const handlePostClick = (index: number) => {
    if (isNavigating) return;
    setIsNavigating(true);

    navigation.navigate('PostDetailScreen', {
      index: index.toString(),
      data: JSON.stringify(data),
    });

    setTimeout(() => setIsNavigating(false), 1000);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePostClick(index)}>
      <Image
        source={{uri: item.imagePath}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardFooter}>
        <Image
          source={require('../../../assets/Icon/Post/like.png')}
          style={styles.likeIcon}
        />
        <Text style={[styles.likeText, {fontFamily: theme.starArenaFont}]}>
          {item.likeCount}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}>
        <ActivityIndicator size="large" color={theme.heading} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      numColumns={3}
      contentContainerStyle={{
        paddingHorizontal: wp(1),
        paddingTop: hp(2),
        paddingBottom: bottom + 60,
        backgroundColor: theme.background,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MomentScreen;

const styles = StyleSheet.create({
  card: {
    width: '32%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: wp(1),
    marginBottom: hp(1),
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    height: '85%',
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardFooter: {
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 4,
  },
  likeIcon: {
    height: 15,
    width: 15,
  },
  likeText: {
    fontSize: 12,
    marginTop: 2,
  },
});
