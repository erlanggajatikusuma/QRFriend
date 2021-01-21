import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
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

  const [modalVisible, setModalVisible] = useState(false);
  const [showScan, setShowScan] = useState(true);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
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
    if (state.data !== e.data) {
      console.log('QR: ', e.data);
      const data = [];
      data.push(e.data);
      setState({
        ...state,
        friends: data,
        visible: false,
      });
      setShowScan(true);
    } else {
      alert('You can not add yourself');
    }
  };

  const showQR = () => {
    if (state.visible !== true) {
      setModalVisible(true);
      setState({...state, QR: true});
    }
  };

  const scanner = () => {
    setShowScan(false);
    setState({...state, visible: true});
  };

  const closeScanner = () => {
    setState({...state, visible: false});
    setShowScan(true);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      {state.visible ? (
        <Modal>
          <QRCodeScanner
            onRead={onSuccess}
            cameraStyle={{width: 250, height: 250, alignSelf: 'center'}}
            flashMode={RNCamera.Constants.FlashMode.auto}
            bottomContent={
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={closeScanner}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
        </Modal>
      ) : null}
      <TouchableOpacity onPress={showQR}>
        <Text style={styles.dot}>...</Text>
      </TouchableOpacity>
      {state.friends.map((friend, index) => {
        return (
          <View key={index} style={styles.list}>
            <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 15}}>
              Your New Friend
            </Text>
            <Text>{friend}</Text>
          </View>
        );
      })}
      {state.QR ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <QRCode value={state.data} />
            </View>
          </View>
        </Modal>
      ) : null}
      <View style={styles.bottom}>
        <Button title="Logout" onPress={removeValue} />
      </View>
      {showScan ? (
        <TouchableOpacity onPress={scanner} style={styles.addBtn}>
          <Text style={{fontWeight: 'bold', fontSize: 24}}>+</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 21,
    color: '#335751',
  },
  buttonTouchable: {
    padding: 16,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 35,
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addBtn: {
    position: 'absolute',
    bottom: 85,
    right: 10,
    elevation: 2,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
  },
  dot: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 24,
    paddingRight: 10,
  },
});
