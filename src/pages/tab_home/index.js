/**
 * @Author: Jet
 * @Date: 2022/4/16
 * @Version:1.0.0.0
 */

import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TabHome = ({}) => {
  const {navigate} = useNavigation();
  return (
    <SafeAreaView>
      <Text
        style={{color: 'red', marginTop: 25}}
        onPress={() => {
          // navigate('Login');
        }}>
        navigate camera
      </Text>

      <Text
        style={{color: 'red', marginTop: 25}}
        onPress={() => {
          // navigate('Exercise');
        }}>
        navigate
      </Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default TabHome;
