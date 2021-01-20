import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home Desu</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
