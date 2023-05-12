//rncs
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Home_Page from './Home_Page';
const Buffer = require('buffer').Buffer;


//onPress={() => navigation.navigate('Registration_Page')}

export default function Login_Page_New() {
  const navigation = useNavigation();
  const [data, setData] = useState({ userID: '', password: '' });
  const userIDregex = /^[0-9\b]+$/;
  const [userIdValid, setUserIdValid] = useState(true);
  const [passwordValid, setpasswordValid] = useState(true);
  const [buttonPoss, setButtonPoss] = useState(true);
  const [valueLoaded, setValueLoaded] = useState(false);

  const [userDetails, setUserDetails] = useState({ user_Name: '', Prof_Img: '' });
  const serverIP = 'https://breath-app-server.glitch.me';






  const handleLogin = () => {
    console.log("1");
    if (data.password === '') {
      setpasswordValid(false);
    }
    else {
      setpasswordValid(true);
    }

    if (data.userID == undefined || data.userID == "" || data.userID.length == 0 || !userIDregex.test(data.userID)) {
      setUserIdValid(false);
    }

    else {
      console.log("2");
      axios.post(`${serverIP}/data`, data)
        .then(res => {
          console.log("3");
          console.log(res.data, ' -------------------------------------------');


          setTimeout(async () => {
          if (res.data === "matched") {
            console.log("Done");
            await getUserDetails();



            setUserIdValid(true);
            setpasswordValid(true);
          //   setTimeout(async () => {
          //   if (userName && userProImg){
          //     console.log("***************************");
          //     navigation.navigate('Home_Page', { userName, userProImg });
          //   }
          // }, 1000);
            // navigation.navigate('Home_Page');
          }
          else {
            console.log("Naaa");
          setpasswordValid(false);
          setUserIdValid(false);
          }

        }, 1000);
          
        })
        .catch(err => {
          console.error(err, ' from front');
        });

      //   setTimeout(() => {
      //   let status = checkValue();
      //   if (status === "success") {
      //     setUserIdValid(true);
      //     setpasswordValid(true);
      //   }
      //   else {
      //     setpasswordValid(false);
      //     setUserIdValid(false);
      //   }
      // }, 1000);
    }
    setButtonPoss(false);
  };

  async function getUserDetails() {
    const response = await axios.post(`${serverIP}/userDetailsNameImg`, data);
    const user_ID = data.userID;
    const userDetails = { user_Name: response.data.user_Name, Prof_Img: response.data.Prof_Img };
    setUserDetails(userDetails);
    console.log(userDetails, ' 00000000000000000000000000000000000000000000000000');
    navigation.navigate('Home_Page', { user_Name: userDetails.user_Name, Prof_Img: userDetails.Prof_Img, userID: user_ID, serverIP: serverIP });
  
  }



  return (
    <View style={styles.container}>

    <View style={{alignSelf:'center', marginBottom: 20}}>
      <Image
        source={require("./img_and_icon/drawable-hdpi/Logo.png")}
        style={styles.logo}
      />
      </View>


      {/* input box */}
      <View style={styles.input}>
        <Text
          style={styles.SignText}>
          Sign in
        </Text>

        <TextInput
          style={[styles.inputContainer, !userIdValid ? styles.invalidID : null]}
          placeholder='User ID'
          onChangeText={text => setData({ ...data, userID: text })}
          keyboardType="numeric"
        />

        <Text style={[styles.errorMessage, { display: !userIdValid ? 'flex' : 'none' }]}> Please enter a valid User ID. </Text>

        <TextInput
          secureTextEntry={true}
          style={[styles.inputContainer, !passwordValid ? styles.invalidPass : null]}
          placeholder='Password'
          onChangeText={text => setData({ ...data, password: text })}
        />

        <Text style={[styles.errorMessage, { display: !passwordValid ? 'flex' : 'none' }]}> Please enter a valid Password. </Text>

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button_Area_Before, !buttonPoss ? styles.button_Area_After : styles.button_Area_Before]}
        >
          <Image
            source={require("./img_and_icon/drawable-hdpi/Button.png")}
          />
        </TouchableOpacity>

        <View style={styles.RegLinkBefore}>
          <Text style={{ color: '#5D5D5D' }}>Don't have account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Registration_Page',{serverIP: serverIP})}
            >
            <Text style={{ color: '#5D9AD8', marginLeft: 5 }}>Register</Text>
          </TouchableOpacity>
        </View>

      </View>
      
    </View>

  )
}


const styles = StyleSheet.create({
  SignText: {
    fontSize: 25,
    color: '#000874',
    fontWeight: 'bold',
    marginRight: 190,
    marginTop: 36,
    marginBottom: 10
  },

  logo: {
    marginTop: '12%',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#5D9AD8',
    height: '100%',
  },

  input: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#F0F3F5',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  invalidID: {
    borderColor: 'red',
  },

  invalidPass: {
    borderColor: 'red',
  },

  inputContainer: {
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
    padding: 8,
    width: 331,
    borderRadius: 50,
    marginTop: 18,
  },


  button_Area_Before: {
    top: "3.5%",
  },

  button_Area_After: {
    top: "2%",
  },

  errorMessage: {
    display: 'none',
    fontSize: 12,
    color: 'red',
    paddingTop: 5,
  },

  RegLinkBefore: {
    marginTop: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
  },
})