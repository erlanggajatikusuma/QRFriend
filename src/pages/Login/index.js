import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        console.log('value: ', value);
        navigation.replace('Home');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('email', value);
      console.log('Set storage succes');
    } catch (e) {
      console.log(e);
    }
  };

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [userA, setUserA] = useState({
    email: 'userA@gmail.com',
    password: 'userA',
  });

  const [userB, setUserB] = useState({
    email: 'userB@gmail.com',
    password: 'userB',
  });

  const handleLogin = () => {
    if (state.email === userA.email && state.password === userA.password) {
      console.log('UserA Login');
      storeData(state.email);
      navigation.replace('Home');
    } else if (
      state.email === userB.email &&
      state.password === userB.password
    ) {
      console.log('UserB login');
      storeData(state.email);
      navigation.replace('Home');
    } else {
      console.log(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{paddingHorizontal: 15, backgroundColor: ' #E5E5E5'}}>
      <ScrollView>
        <View style={{paddingTop: 75, paddingBottom: 35}}>
          <Text style={styles.textLogin}>Login</Text>
        </View>
        <Text>Hi, Welcome back!</Text>
        <View style={{paddingTop: 30}}>
          <Text style={{color: '#848484'}}>Email</Text>
          <TextInput
            onChangeText={(text) => setState({...state, email: text})}
            value={state.email}
            autoCompleteType="email"
            autoCapitalize="none"
            style={styles.inputText}
          />
        </View>
        <View style={{paddingTop: 30, paddingBottom: 30}}>
          <Text style={{color: '#848484'}}>Password</Text>
          <TextInput
            onChangeText={(text) => setState({...state, password: text})}
            value={state.password}
            autoCapitalize="none"
            secureTextEntry={true}
            style={styles.inputText}
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textLogin: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: '#7E98DF',
  },
  inputText: {
    borderRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#232323',
  },
  loginBtn: {
    backgroundColor: '#7E98DF',
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderRadius: 70,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
