import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg';

const Home = ({navigation}) => {
  const [state, setState] = useState({
    visible: false,
    friends: [],
    data: '',
    QR: false,
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        console.log('value: ', value);
        setState({
          ...state,
          data: value,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('email');
      navigation.replace('Login');
    } catch (e) {
      console.log('error: ', e);
    }
    console.log('Done.');
  };

  const onSuccess = (e) => {
    // Linking.openURL(e.data).catch((err) =>
    //   console.error('An error occured', err),
    // );
    console.log('QR: ', e.data);
    const data = [];
    data.push(e.data);
    setState({
      ...state,
      friends: data,
      visible: false,
    });
  };

  const showQR = () => {
    if (state.visible !== true) {
      setState({...state, QR: true});
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      {state.visible ? (
        <QRCodeScanner
          onRead={onSuccess}
          containerStyle={{
            backgroundColor: 'green',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}
          cameraStyle={{width: 250, height: 250, alignSelf: 'center'}}
          flashMode={RNCamera.Constants.FlashMode.auto}
          // topContent={
          //   <Text style={styles.centerText}>
          //     Go to{' '}
          //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
          //     your computer and scan the QR code.
          //   </Text>
          // }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      ) : null}
      {state.QR ? <QRCode value={state.data} /> : null}
      {state.friends.map((friend, index) => {
        return (
          <View
            key={index}
            style={{
              width: '100%',
              backgroundColor: '#ddd',
              paddingVertical: 10,
              borderBottomWidth: 1,
            }}>
            <Text>{friend}</Text>
          </View>
        );
      })}
      <Button title="Logout" onPress={removeValue} style={{zIndex: 1}} />
      <Button title="QR" onPress={showQR} style={{zIndex: 1}} />
      <TouchableOpacity
        style={{position: 'absolute', bottom: 20, right: 20}}
        onPress={() => setState({...state, visible: true})}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
