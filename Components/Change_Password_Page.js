import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, Alert } from 'react-native';
import TextInputNew from './Coust_Text_Input';
import { Ionicons } from '@expo/vector-icons';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

export default function Change_Password ({route}) {
    const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const navigation = useNavigation();
    const [current, setCurrent] = useState();
    const [newPassword, setnewPassword] = useState();
    const [confirm, setconfirm] = useState();
    const [buttonPoss, setButtonPoss] = useState(true);

    async function handlePasswordChange () {
        if(!current || !newPassword || !confirm) {
            Alert.alert('Error', 
            'Please fill in all the fields',
            [
                {text: 'Done'},
                ],
                {cancelable: false},);
            return;
        }
        const updateDetail = await axios.post(`${serverIP}/update_new_password`, {userID, current, newPassword});
        //() =>navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })
        if( updateDetail.data === 'Done'){
          Alert.alert(
            'Successful...',
            'Your successfully Updated your Password',
            [
              {text: 'OK', onPress:() => navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })},
            ],
            {cancelable: false},
          );
        }
        else{
          Alert.alert('Error', 
          'Please Insert your current valid Password',
          [
              {text: 'Done'},
              ],
              {cancelable: false},);
          return;
        }
    }

    return (
        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>

            <View style={{flex: 0.2, flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 20,}}>
            <TouchableOpacity onPress={() =>navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
            <Ionicons name="arrow-back" size={30} color="#03076F" />
            </TouchableOpacity>
            <View style={{alignSelf: 'center', flex: 1}}>
            <Image 
            source={require('./img_and_icon/ChangePassword.png')}
            style = {[styles.icon, {justifyContent: "center", alignSelf: "center"}]}
            />
            </View>
            </View>


            <View style={styles.body}>
                
            <TextInputNew label='Current Password' value={current} onChangeText={setCurrent} secure={true}/>
            <TextInputNew label='New Password' value={newPassword} onChangeText={setnewPassword} secure={true}/>
            <TextInputNew label='Confirm Password' value={confirm} onChangeText={setconfirm} secure={true}/>

                <View style={styles.updateButton}>
                    <TouchableOpacity onPress={() => handlePasswordChange()}>
                        <Text style={styles.updateButtonText}>Change Password</Text>
                    </TouchableOpacity>

                </View>
    
            </View>
            <Nav_Bottom iconName="ChangePass"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },

    header: {
        height: 100,
        fontSize: 24,
        marginTop: 90,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    
    body: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    updateButton: {
        width: 200,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: '#94C9FF',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
      },
      updateButtonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18
      }
  });
