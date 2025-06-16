// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   KeyboardTypeOptions,
// } from 'react-native';
// import OtherHeader from '../../components/OtherHeader';
// import {useTheme} from '../../constant/ThemeContext';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import DropDownPicker from 'react-native-dropdown-picker';

// type TabType = 'GoLive' | 'JoinParty' | null;

// interface NationalityItem {
//   label: string;
//   value: string;
// }

// const LiveScreen: React.FC = () => {
//   const {theme} = useTheme();
//   const [activeTab, setActiveTab] = useState<TabType>(null);

//   const [nationalityOpen, setNationalityOpen] = useState<boolean>(false);
//   const [nationality, setNationality] = useState<string | null>(null);
//   const [nationalityItems, setNationalityItems] = useState<NationalityItem[]>([
//     {label: 'Indian', value: 'indian'},
//     {label: 'American', value: 'american'},
//     {label: 'Other', value: 'other'},
//   ]);

//   const renderInput = (
//     label: string,
//     placeholder: string,
//     keyboardType: KeyboardTypeOptions = 'default',
//   ) => (
//     <View style={styles.inputGroup}>
//       <Text style={[styles.label, {color: theme.subheading}]}>{label}</Text>
//       <TextInput
//         placeholder={placeholder}
//         placeholderTextColor={theme.heading}
//         keyboardType={keyboardType}
//         style={[
//           styles.input,
//           {
//             backgroundColor: theme.card,
//             color: theme.heading,
//             fontFamily: theme.starArenaFont,
//           },
//         ]}
//       />
//     </View>
//   );

//   useEffect(() => {
//     setActiveTab(null);
//   }, []);

//   return (
//     <>
//       <OtherHeader title="Live" />
//       {activeTab === null && (
//         <View style={[styles.container, {backgroundColor: theme.background}]}>
//           <TouchableOpacity onPress={() => setActiveTab('GoLive')}>
//             <View style={[styles.button, {backgroundColor: theme.accent1}]}>
//               <Text
//                 style={[
//                   styles.buttonText,
//                   {color: theme.heading, fontFamily: theme.starArenaFont},
//                 ]}>
//                 Go Live
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => setActiveTab('JoinParty')}>
//             <View style={[styles.button, {backgroundColor: theme.accent1}]}>
//               <Text
//                 style={[
//                   styles.buttonText,
//                   {color: theme.heading, fontFamily: theme.starArenaFont},
//                 ]}>
//                 Join Party
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       )}

//       {activeTab === 'GoLive' && (
//         <ScrollView
//           style={{flex: 1, backgroundColor: theme.background}}
//           contentContainerStyle={{padding: wp(5)}}
//           showsVerticalScrollIndicator={false}>
//           {renderInput('Name', 'Enter your name')}
//           {renderInput('Date of Birth', 'DD/MM/YYYY', 'numeric')}

//           <View style={styles.inputGroup}>
//             <Text style={[styles.label, {color: theme.subheading}]}>
//               Nationality
//             </Text>
//             <DropDownPicker
//               open={nationalityOpen}
//               value={nationality}
//               items={nationalityItems}
//               setOpen={setNationalityOpen}
//               setValue={setNationality}
//               setItems={setNationalityItems}
//               placeholder="Select Nationality"
//               style={{
//                 backgroundColor: theme.card,
//                 borderColor: theme.card,
//               }}
//               textStyle={{
//                 color: theme.heading,
//                 fontFamily: theme.starArenaFont,
//               }}
//               dropDownContainerStyle={{backgroundColor: theme.card}}
//               listItemLabelStyle={{color: theme.heading}}
//               placeholderStyle={{color: theme.heading}}
//             />
//           </View>

//           {renderInput('Email ID', 'Enter your email', 'email-address')}
//           {renderInput('WhatsApp Number', 'Enter WhatsApp number', 'phone-pad')}
//           {renderInput('Aadhaar Card Number', 'XXXX-XXXX-XXXX', 'numeric')}

//           <View style={styles.uploadRow}>
//             <View style={[styles.uploadColumn]}>
//               <Text style={[styles.label, {color: theme.subheading}]}>
//                 Upload Document 1
//               </Text>
//               <TouchableOpacity
//                 style={[
//                   styles.uploadBox,
//                   {backgroundColor: theme.card, borderColor: theme.subheading},
//                 ]}>
//                 <Text style={{color: theme.heading}}>Upload File</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={[styles.uploadColumn]}>
//               <Text style={[styles.label, {color: theme.subheading}]}>
//                 Upload Document 2
//               </Text>
//               <TouchableOpacity
//                 style={[
//                   styles.uploadBox,
//                   {backgroundColor: theme.card, borderColor: theme.subheading},
//                 ]}>
//                 <Text style={{color: theme.heading}}>Upload File</Text>
//               </TouchableOpacity>
//             </View>

//           </View>
//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={[styles.actionButton, {backgroundColor: theme.card}]}
//               onPress={() => setActiveTab(null)} // go back to previous view
//             >
//               <Text
//                 style={[
//                   styles.actionButtonText,
//                   {color: theme.heading, fontFamily: theme.starArenaFont},
//                 ]}>
//                 Cancel
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.actionButton, {backgroundColor: theme.accent1}]}
//               onPress={() => {
//                 // handle submission logic here
//               }}>
//               <Text
//                 style={[
//                   styles.actionButtonText,
//                   {color: theme.heading, fontFamily: theme.starArenaFont},
//                 ]}>
//                 Submit
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     paddingHorizontal: wp(10),
//     paddingVertical: hp(1.5),
//     borderRadius: 10,
//     margin: hp(2),
//     width: wp(40),
//   },
//   buttonText: {
//     textAlign: 'center',
//   },
//   inputGroup: {
//     marginBottom: hp(2),
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 14,
//   },
//   input: {
//     height: hp(6),
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     fontSize: 14,
//   },
//   uploadBox: {
//     height: hp(6),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     borderWidth: 1,
//   },
//   uploadRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: wp(3), // Optional spacing between columns
//     marginBottom: hp(2),
//   },
//   uploadColumn: {
//     flex: 1,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: hp(2),
//     gap: wp(3),
//   },
//   actionButton: {
//     flex: 1,
//     paddingVertical: hp(1.5),
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   actionButtonText: {
//     fontSize: 16,
//   },
// });

// export default LiveScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  AppState,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../constant/ThemeContext';
import {useIsFocused} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const sampleReels = [
  {
    id: '1',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    user: 'user1',
    caption: 'Nice view at the beach!',
  },
  {
    id: '2',
    uri: 'https://www.w3schools.com/html/movie.mp4',
    user: 'user2',
    caption: 'Skateboarding like a pro 🛹',
  },
  {
    id: '3',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    user: 'user3',
    caption: 'Trying out a new recipe 🍝',
  },
];

const sampleComments = [
  {id: '1', user: 'user1', text: 'Nice reel!'},
  {id: '2', user: 'user2', text: 'Amazing video!'},
  {id: '3', user: 'user3', text: 'Loved this!'},
];

const LiveScreen: React.FC = () => {
  const {theme} = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const isFocused = useIsFocused();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', nextState =>
      setAppState(nextState),
    );
    return () => sub.remove();
  }, []);

  const onProgress = (data: {
    currentTime: number;
    playableDuration: number;
  }) => {
    if (data.playableDuration > 0) {
      setProgress(data.currentTime / data.playableDuration);
    }
  };

  const toggleLike = () => setLiked(!liked);

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof sampleReels)[0];
    index: number;
  }) => (
    <View
      style={{
        height: Dimensions.get('window').height - hp(6.5),
        width: wp('100%'),
      }}>
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Video
          source={{uri: item.uri}}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={!isFocused || appState !== 'active' || index !== activeIndex}
          onProgress={onProgress}
        />

        <View style={styles.bottomLeftInfo}>
          <Text style={[styles.username, {color: theme.heading}]}>
            @{item.user}
          </Text>
          <Text
            style={[styles.caption, {color: theme.subheading}]}
            numberOfLines={2}>
            {item.caption}
          </Text>
        </View>

        <View
          style={[styles.progressBarContainer, {backgroundColor: theme.card}]}>
          <View
            style={[
              styles.progressBar,
              {width: `${progress * 100}%`, backgroundColor: theme.accent1},
            ]}
          />
        </View>

        <View style={styles.rightButtons}>
          <TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              size={hp('4%')}
              color={liked ? theme.accent1 : theme.subheading}
            />
            <Text style={[styles.iconText, {color: theme.subheading}]}>
              123K
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCommentsVisible(true)}
            style={styles.iconButton}>
            <Icon
              name="chatbubble-outline"
              size={hp('4%')}
              color={theme.subheading}
            />
            <Text style={[styles.iconText, {color: theme.subheading}]}>
              500
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Icon
              name="paper-plane-outline"
              size={hp('4%')}
              color={theme.subheading}
            />
            <Text style={[styles.iconText, {color: theme.subheading}]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <FlatList
        data={sampleReels}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          const index = Math.round(e.nativeEvent.contentOffset.y / hp('100%'));
          setActiveIndex(index);
          setProgress(0);
        }}
        scrollEventThrottle={16}
      />

      <Modal
        visible={isCommentsVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCommentsVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalWrapper}>
          <View style={[styles.modalContent, {backgroundColor: theme.card}]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, {color: theme.heading}]}>
                Comments
              </Text>
              <TouchableOpacity onPress={() => setCommentsVisible(false)}>
                <Icon name="close" size={28} color={theme.subheading} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={sampleComments}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.commentItem}>
                  <Text style={[styles.commentUser, {color: theme.accent1}]}>
                    @{item.user}
                  </Text>
                  <Text style={[styles.commentText, {color: theme.heading}]}>
                    {item.text}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              style={styles.commentsList}
            />

            <View
              style={[
                styles.commentInputContainer,
                {borderTopColor: theme.subheading},
              ]}>
              <TextInput
                placeholder="Add a comment..."
                placeholderTextColor={theme.subheading}
                style={[
                  styles.commentInput,
                  {
                    backgroundColor: theme.background,
                    color: theme.heading,
                  },
                ]}
              />
              <TouchableOpacity style={styles.sendButton}>
                <Icon name="send" size={22} color={theme.accent1} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomLeftInfo: {
    position: 'absolute',
    bottom: hp('5%'),
    left: wp('3%'),
    width: wp('70%'),
  },
  username: {
    fontWeight: 'bold',
    fontSize: hp('2%'),
    marginBottom: hp('0.5%'),
  },
  caption: {
    fontSize: hp('1.8%'),
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: hp('0.4%'),
    width: '100%',
  },
  progressBar: {
    height: '100%',
  },
  rightButtons: {
    position: 'absolute',
    bottom: hp('6%'),
    right: wp('3%'),
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  iconText: {
    marginTop: 4,
    fontSize: hp('1.5%'),
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: hp('60%'),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  modalTitle: {
    fontSize: hp('2.3%'),
    fontWeight: 'bold',
  },
  commentsList: {
    flexGrow: 0,
    marginBottom: hp('1%'),
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: hp('1%'),
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: wp('2%'),
  },
  commentText: {
    flex: 1,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: hp('1%'),
  },
  commentInput: {
    flex: 1,
    height: hp('5%'),
    borderRadius: 20,
    paddingHorizontal: wp('4%'),
  },
  sendButton: {
    marginLeft: wp('2%'),
  },
});

export default LiveScreen;
