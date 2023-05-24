import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Coust_Button from './coust_Button';
import { useNavigation } from '@react-navigation/native';

export default function Social_Content_Top({user_Name, Prof_Img, userID, setInAllPost, serverIP}) {
  const navigation = useNavigation();

    const [selectedButton, setSelectedButton] = useState('All Post');

    const handleButtonPress = (text) => {
        setSelectedButton(text);

        if (text === 'All Post') {
          setInAllPost(true);
        } else if (text === 'My Post') {
          setInAllPost(false);
        }

      };


    return(
        <View style={styles.container}>
            <View style={styles.content}>
            <View style={styles.profImgContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
                <Image source={{ uri: Prof_Img }} style={styles.profImage} />
                </TouchableOpacity>
                </View>

                <Image
                    source={require("./img_and_icon/drawable-mdpi/social.png")}
                    style={styles.page_name}
                />

                <Image
                    source={require("./img_and_icon/drawable-ldpi/chat.png")}
                    style={styles.chat}
                />
            </View>


            <View style={styles.buttonContainer}>
    <Coust_Button
      text="All Post"
      isSelected={selectedButton === 'All Post'}
      onPress={() => handleButtonPress('All Post')}
    />
    <Coust_Button
      text="My Post"
      isSelected={selectedButton === 'My Post'}
      onPress={() => handleButtonPress('My Post')}
    />
  </View>


        </View>
    )}

    const styles = StyleSheet.create({ 
        container: {
            width: '100%',
            paddingTop: StatusBar.currentHeight,
            backgroundColor: '#FFFFFF',
          },
          content: {
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'space-between',
            paddingHorizontal: 16,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#e6e6e6',
          },
          profImgContainer: {
          alignSelf: 'flex-start',
          width: 42,
          height: 42,
          borderRadius: 50,
          overflow: 'hidden',
        },
        profImage: {
          width: '100%',
          height: '100%',
        },
          page_name: {
            alignSelf: 'center',
            justifyContent: 'center',
          },
          
          buttonContainer: {
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 15,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E8F3FF',
            borderRadius: 30,
          },
          
    })