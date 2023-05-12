import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, ScrollView } from 'react-native';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Diary_Page({route}) {
  const navigation = useNavigation();
  const { user_Name, Prof_Img, userID, serverIP } = route.params;

    const [diartNote, setDiaryNote] = useState([])

    async function reloadDiaryNotes() {
      const serverCallResult = await axios.post(`${serverIP}/get_user_Notes`, { userID});

      if( serverCallResult.data.length > 0) {
        setDiaryNote(serverCallResult.data);
        console.log(serverCallResult.data);
      }
    }

    useEffect(() => {
      reloadDiaryNotes();
    }, [])


    function displayList (item, key) {
      return(
        <TouchableOpacity style={styles.itemCont} key={key} 
        onPress={() =>navigation.navigate('Note_View', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP, item: item })}>
        <Text style={styles.itemTitle}>
          {item.Title}
        </Text>
        <Text style={styles.itemBody} numberOfLines={3} ellipsizeMode="tail">
          {item.Content}
        </Text>

        <View style={styles.dateAndTime}>
        <Text style={styles.itemDate}>
          {item.Date}
        </Text>
        <Text style={styles.itemtime}>
          {item.Time}
        </Text>
        </View>

      </TouchableOpacity>
      )
    }


    return (
        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        <View style={{flex: 1}}>
        <Text style={styles.titleText}>Dia<Text style={{ color: '#94C9FF' }}>ry</Text></Text>
        <ScrollView>
          <View style={styles.body}>
            {diartNote.map((item, key) => (
              displayList(item, key)
            ))}
          </View>
        </ScrollView>
      
      
      <View style={styles.plusIcon}>
        <TouchableOpacity 
        onPress={() =>navigation.navigate('Add_Diary', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
            <Ionicons name="ios-add" size={45} color="#03076F" style= {styles.icon}/> 
        </TouchableOpacity>
        </View>
      </View> 
        <Nav_Bottom iconName="diary" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
  },

  dateAndTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleText: {
    color: '#03076F',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  body: {
    width: '100%',
    height: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  itemBody: {
    
  },

  itemCont: {
    alignSelf: 'center',
    borderRadius: 30,
    padding: 30,
    width: '90%',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
    width: 0, 
    height: 2 
    }, 
    shadowOpacity: 0.05, 
    shadowRadius: 1,
    marginTop: 20,
  },
    
  itemDate: {
    fontSize: 12,
    color: '#AEAEAE',
    marginTop: 20,
    marginLeft: 10,
  },

  itemtime: {
    fontSize: 12,
    color: '#AEAEAE',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 10,
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  icon: {
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
    width: 0, 
    height: 2 
    }, 
    shadowOpacity: 0.05, 
    shadowRadius: 1,
    },

    plusIcon: {
      flex: 0.25, 
      justifyContent: 'flex-end', 
      alignItems: 'flex-end',
      marginRight: 30,
      marginBottom: 30,
  },

});