/**
 * @Author: Jet
 * @Date: 2022/4/16
 * @Version:1.0.0.0
 */
'use strict';

import React, {useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera/src/hooks/useCameraDevices';
import {Camera} from 'react-native-vision-camera';

const {width, height} = Dimensions.get('window');
const CameraPage = ({navigation}) => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const openCamera = () => {};
  const getCameraPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
  };
  const takePicture = async () => {
    if (camera && camera.current) {
      const photo = await camera.current.takePhoto({
        flash: 'on',
      });
      console.log(photo);
      navigation.navigate('CropperPage');
      // ImagePicker.openCropper({
      //   path: photo.path,
      //   width: 300,
      //   height: 400,
      // }).then(image => {
      //   console.log(image);
      // });
    }
  };
  const onClosePage = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {device && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          photo={true}
          device={device}
          isActive={true}
        />
      )}
      {device && (
        <View style={styles.btnActionAreaWap}>
          <View style={styles.btnActionArea}>
            <TouchableOpacity onPress={onClosePage}>
              <Image
                source={require('../../images/delete_circle_style.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTakePicture}
              onPress={takePicture}>
              <View style={styles.btnTakeBg}>
                <View style={styles.btnTakeBgInner} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 20}}>
              <Image
                source={require('../../images/btn_photo_lib.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverContainer: {
    width: width,
    height: height - 165,
    backgroundColor: '#00000080',
    position: 'absolute',
  },
  btnActionAreaWap: {
    width: width,
    height: 165,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    backgroundColor: '#000000FF',
  },
  btnActionArea: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  btnTakePicture: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTakeBg: {
    width: 52,
    height: 52,
    backgroundColor: 'black',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTakeBgInner: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 22,
  },
});
export default CameraPage;
