import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, ScrollView, Alert } from 'react-native';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { Feather, AntDesign } from '@expo/vector-icons';
import axios from 'axios';


export default function Add_Diary({route}) {
  const navigation = useNavigation();
  const { user_Name, Prof_Img, userID, serverIP } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  async function handleSave() {
    if(!title || !content) {
        Alert.alert('Error', 
        'Sorry you have to write something to save it.',
        [
            {text: 'Done'},
            ],
            {cancelable: false},);
        return;
    }

    try {
        const addNoteRes = await axios.post(`${serverIP}/add_user_Notes`, { userID, title, content });
        console.log(addNoteRes.data);
        if(addNoteRes.data === 'Done') {       
            Alert.alert(
            'Successful...',
            'Your successfully added a new Inhaler',
            [
              {text: 'OK', onPress:() => navigation.navigate('Diary_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })},
            ],
            {cancelable: false},
          );
        }
        else{
            Alert.alert(
                'Unsuccessful!!!',
                'Please Try Again...',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
        
    }
    catch(error) {
        console.log(error);
        console.log("Error From get Data");
        Alert.alert(
            'Unsuccessful!!!',
            'Please Try Again',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }   
    
  }


    return (
        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        <View style={{flex: 1}}> 
        <View style={styles.topBar}>
        <TouchableOpacity style={styles.icon} 
        onPress={() =>navigation.navigate('Diary_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
            <AntDesign name="delete" size={24} color="#94C9FF" />
        </TouchableOpacity>
        <View>
            <Text style={styles.titleText}>
            Add<Text style={{ color: '#94C9FF' }}> Note</Text>
            </Text>
        </View>
        <TouchableOpacity style={styles.icon}
        onPress={() => handleSave()}>
            <Feather name="save" size={24} color="#94C9FF" />
        </TouchableOpacity>
        </View>


        <TextInput 
            style={styles.title}
            placeholder='Title'
            onChangeText={text => setTitle(text)}
        />
        <TextInput 
            style={styles.body}
            placeholder='Type your notes here...'
            onChangeText={text => setContent(text)}
            multiline={true}
        />

        </View>
        <Nav_Bottom iconName="diary" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C9CDFF',
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center',
  },

  titleText: {
    color: '#03076F',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },

  title: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C9CDFF',
    fontSize: 16,
  },

  body: {
    padding: 10,

  },

});