import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Images from '../../constants/Images';

interface Props {
  title: string;
}

const StylistSection = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.indicator} /> */}
      <Image
        source={Images.ic_user}
        style={styles.avatar}
        tintColor={'#7C3AED'}
      />

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default React.memo(StylistSection);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop:8,
    marginHorizontal:12,
    borderRadius:12
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
  },
});