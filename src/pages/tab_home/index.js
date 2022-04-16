/**
 * @Author: Jet
 * @Date: 2022/4/16
 * @Version:1.0.0.0
 */

import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Camera} from 'react-native-vision-camera';

const TabHome = ({}) => {
  const {navigate} = useNavigation();
  const openCamera = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    if (cameraPermission === 'authorized') {
      navigate('CameraPage');
    } else {
      const permission = await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    }
  };
  const getMircoPermission = async () => {
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
  }
  return (
    <SafeAreaView>
      <Text style={{color: 'red', padding: 25}} onPress={openCamera}>
        openCamera
      </Text>

      <Text
        style={{color: 'red', marginTop: 25}}
        onPress={getMircoPermission}>
        get mircrophone permission
      </Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default TabHome;
