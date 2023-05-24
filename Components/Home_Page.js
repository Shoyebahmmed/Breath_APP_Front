import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Button, Image } from 'react-native';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import Puffer_Page from './Puffer';
import { useNavigation } from '@react-navigation/native';

export default function Home_Page({route}) {
  const { user_Name, Prof_Img, userID, serverIP } = route.params;

    return (
        <View style={styles.container}>
                <View style={{flex: 0.16,  backgroundColor: '#79A9E6',}}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP} />
        </View>
        <Puffer_Page serverIP = {serverIP} userID = {userID}/>




        <Nav_Bottom iconName="home"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
      },


      // importent user Profile Image Style ---------------------------------------------------------------
      // profImgContainer: {
      //   margin: '20%',
      //   width: 42,
      //   height: 42,
      //   borderRadius: 50,
      //   overflow: 'hidden',
      // },
      // profImage: {
      //   width: '100%',
      //   height: '100%',
      // },

});