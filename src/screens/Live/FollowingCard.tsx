import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTheme} from '../../constant/ThemeContext';

type FollowingCardProps = {
  type: string;
};

const FollowingCard: React.FC<FollowingCardProps> = ({type = 'Vs'}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.cardContainer, {backgroundColor: theme.heading}]}>
      {/* Top Card Section */}
      <View style={[styles.innerCard, {backgroundColor: '#2B2B2B'}]}>
        {/* View Count */}
        <View
          style={[
            styles.viewCountContainer,
            {borderWidth: 0, borderColor: 'red'},
          ]}>
          <Image
            source={require('../../../assets/Icon/Eye.png')}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text style={[styles.viewCountText, {color: theme.subheading}]}>
            10k
          </Text>
          <Text style={{color: theme.subheading}}>{type}</Text>
        </View>

        {/* User Info */}
        <View style={styles.userInfoRow}>
          <View style={styles.avatarPlaceholder} />
          <View>
            <Text
              style={[
                styles.username,
                {color: theme.heading, fontFamily: theme.starArenaFontSemiBold},
              ]}>
              UserName
            </Text>
            <View style={styles.diamondRow}>
              <Image
                source={require('../../../assets/Icon/diamond.png')}
                style={styles.diamondIcon}
              />
              <Text style={[styles.diamondText, {color: theme.subheading}]}>
                11.4M
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Rating Stars */}
      <View style={styles.starsRow}>
        <Image
          source={require('../../../assets/Icon/StarFill.png')}
          style={styles.starIcon}
        />
        <Image
          source={require('../../../assets/Icon/StarFill.png')}
          style={styles.starIcon}
        />
        <Image
          source={require('../../../assets/Icon/StarFill.png')}
          style={styles.starIcon}
        />
        <Image
          source={require('../../../assets/Icon/Star.png')}
          style={styles.starIcon}
        />
        <Image
          source={require('../../../assets/Icon/Star.png')}
          style={styles.starIcon}
        />
      </View>
    </View>
  );
};

export default FollowingCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 280,
    width: '48%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  innerCard: {
    borderRadius: 8,
    height: '90%',
    padding: 10,
    justifyContent: 'space-between',
  },
  viewCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    height: 14,
    width: 14,
    marginRight: 4,
  },
  viewCountText: {
    fontSize: 13,
    flex: 1,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  avatarPlaceholder: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  username: {
    fontSize: 14,
    marginBottom: 3,
  },
  diamondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  diamondIcon: {
    height: 13,
    width: 13,
  },
  diamondText: {
    fontSize: 13,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 3,
  },
  starIcon: {
    height: 20,
    width: 20,
  },
});
