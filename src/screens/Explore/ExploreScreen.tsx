import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../constant/ThemeContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAuth} from '../../context/AuthContext';

type ExploreScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

const Explore = () => {
  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const {user} = useAuth();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (search: string) => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `https://shubhamkohad.site/auth/user/search`,
        {
          params: {query: search},
          headers: {
            Authorization: `Bearer ${user?.jwt}`, // ✅ Add auth token here
          },
        },
      );

      console.log(res.data);

      setSearchResults((res.data || []).filter((u: any) => u.id !== user?.id));
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search with useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSearchResults(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const UserCard = ({user}: {user: any}) => (
    <View style={styles.card}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: theme.subheading,
            height: 50,
            width: 50,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingVertical: 2,
            paddingHorizontal: 15,
            width: '69%',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ExploreUser', {
                username: user.name,
                id: user.id,
              })
            }>
            <Text
              style={{
                color: 'white',
                fontSize: hp(1.7),
                fontFamily: theme.starArenaFont,
              }}>
              {user.name}
            </Text>
            <Text
              style={{
                color: theme.subheading,
                fontFamily: theme.starArenaFont,
                marginBottom: 5,
                fontSize: hp(1.5),
              }}>
              #{user.code || user.id}
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', gap: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image
                source={require('../../../assets/Icon/diamond.png')}
                style={{height: 12, width: 12}}
              />
              <Text style={{color: theme.heading, fontSize: 12}}>
                {user.diamond || '0'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image
                source={require('../../../assets/Icon/duoProfile.png')}
                style={{height: 12, width: 12}}
              />
              <Text style={{color: theme.heading, fontSize: 12}}>
                {user.myfollowers || '0'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Text
          style={{
            borderColor: theme.subheading,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 8,
            color: theme.heading,
            fontFamily: theme.starArenaFont,
            fontSize: hp(1.4),
          }}>
          Follow
        </Text>
      </View> */}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 10,
        paddingBottom: bottom,
      }}>
      <View style={[styles.header, {backgroundColor: theme.background}]}>
        <Text
          style={[
            styles.title,
            {
              color: theme.primary,
              fontFamily: theme.starArenaFontSemiBold,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          Explore
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../../../assets/Icon/Searchbutton.png')}
            style={{width: 25, height: '100%'}}
            resizeMode="contain"
          />
          <TextInput
            placeholder="@username / #userid"
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            style={[styles.input, {fontFamily: theme.starArenaFont}]}
          />
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.accent1}
            style={{marginTop: 20}}
          />
        ) : (
          <>
            <Text
              style={[
                {color: theme.subheading, marginVertical: 10, fontSize: 14},
              ]}>
              {query ? 'Search Results' : 'Suggested users for you'}
            </Text>

            <View>
              {(query ? searchResults : []).map((user, index) => (
                <UserCard key={index} user={user} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 22,
    gap: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  cardContainer: {
    paddingBottom: 60,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    borderStyle: 'solid',
    paddingHorizontal: 5,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
  },
});
