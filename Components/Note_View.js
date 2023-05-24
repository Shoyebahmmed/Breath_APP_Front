import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, ScrollView } from 'react-native';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';


export default function Note_View({route}) {
  const navigation = useNavigation();
  const { user_Name, Prof_Img, userID, serverIP, item } = route.params;
  const [allowEdit, setAllowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.Title);
  const [newContent, setNewContent] = useState(item.Content);

  async function handleSave() {
    console.log(newTitle, '\n', newContent);
    const diary_ID = item.Diary_ID;
    const title = newTitle;
    const content = newContent;
    try {
      const updateNoteRes = await axios.post(`${serverIP}/update_Diary_Item`, { userID, diary_ID, title, content });
      console.log(updateNoteRes.data);
      if(updateNoteRes.data === 'Done') {       
        navigation.navigate('Diary_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })
      }
      else{
        console.log("Sorry its not done");
      }
      
    }
    catch(error) {
        console.log(error);
        console.log("Error From get Data");
    }   
  }


  async function deleteContent (){
    const diary_ID = item.Diary_ID;
    try {
      const deleteNoteRes = await axios.post(`${serverIP}/delete_Diary_Item`, { userID, diary_ID});
      console.log(deleteNoteRes.data);
      if(deleteNoteRes.data === 'Done') {       
        navigation.navigate('Diary_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })
      }
      else{
        console.log("Sorry its not done");
      }
      
    }
    catch(error) {
        console.log(error);
        console.log("Error From get Data");
    }   
  }

    return (
        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        <View style={{flex: 1}}> 
            <View style={styles.header}>
            <TouchableOpacity 
            onPress={() =>navigation.navigate('Diary_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
                <Ionicons name="arrow-back" size={30} color="#03076F" />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.titleText}>Refer<Text style={{ color: '#94C9FF' }}>ence</Text></Text>
            </View>
            </View>
            
            {allowEdit ? (
              <View style={{flex:1}}>
                <TextInput 
                  style={styles.inputTitle}
                  value={newTitle}
                  onChangeText={setNewTitle}
                />
                <TextInput 
                  style={styles.inputContent}
                  value={newContent}
                  onChangeText={setNewContent}
                  multiline={true}
                />
              </View>
            ) : (
              <ScrollView>
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.body}>{item.Content}</Text>
            </ScrollView>
            )}



            {allowEdit ? (
              <View style={styles.optionRow}>
                <TouchableOpacity style={styles.option} onPress={() => setAllowEdit(false)}><Text style={styles.optionText}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => handleSave()}><Text style={styles.optionText}>Save</Text></TouchableOpacity>
              </View>
            ) : (
              <View style={styles.optionRow}>
                <TouchableOpacity style={styles.option} onPress={() => setAllowEdit(true)}><Text style={styles.optionText}>Edit</Text></TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => deleteContent()}><Text style={styles.optionText}>Delete</Text></TouchableOpacity>
              </View>
            )}



        </View>
        <Nav_Bottom iconName="diary" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
  },
  optionRow: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },

  inputTitle: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C9CDFF',
    fontSize: 16,
  },

  inputContent: {
    padding: 10,
  },

  option: {
    flex: 1,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000874',
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000874',
  },

  titleText: {
    color: '#03076F',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },   
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C9CDFF',
  },  

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },

  body:{
    paddingHorizontal: 10,
    marginBottom: 20,
  },

});