import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity   } from 'react-native';
import Health_Cont_Container from './Health_Cont_Container';
import { useNavigation } from '@react-navigation/native';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import Health_Content_View from './Health_Content_View';

export default function Health_Education_Page({route}) {
  const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${serverIP}/education_cont`)
          .then(res => res.json())
          .then(data => setData(data));
      }, []);


      const handleContainerPress = (item) => {
        navigation.navigate('Health_Content_View', { selectedItem: item, user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP });
      };

  return (
    <View style={styles.container}>
    <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
      <ImageBackground source={require('./img_and_icon/Screen.png')} style={styles.imageBackground}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {data.map((item, index) => (
            <Health_Cont_Container key={index} image={item.image} title={item.title} description={item.description} date={item.date} time={item.time} content={item.content} onPress={() => handleContainerPress(item)}/>
          ))}
        </ScrollView>
      </ImageBackground>
      <Nav_Bottom iconName="education" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  scrollViewContent: {
    padding: 16,
    alignItems: 'center',
  }
  });
