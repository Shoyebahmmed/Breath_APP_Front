//rncs
//onPress={() => navigation.navigate('Login_Page_New')}
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Alert  } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



export default function Registration_Page({route}) {
  const {serverIP} = route.params;
  const [userData, setData] = useState({
    user_Name: '',
    ph_Num: '',
    email: '',
    dOb: '',
    address: '',
    password: ''
  });

  const navigation = useNavigation();
  const [nameValid, setNameValid] = useState(true);
  const [numberValid, setNumberValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [dobValid, setDOBValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [buttonPoss, setButtonPoss] = useState(true);
  const [signLinkPoss, setSignLinkPoss] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const ph_No_regex = /^[0-9\b]+$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    onChangeText = setData({ ...userData, dOb: formattedDate })
    hideDatePicker();
  };


  function handleReg() {
    let error = 0;
    if (userData.user_Name == undefined || userData.user_Name == "" || userData.user_Name.length == 0) {
      setNameValid(false);
      setIsVisible(!isVisible);
      error = error + 1;
      userData.user_Name = ""
      console.log('Error 1');
    }
    else
    setNameValid(true);

    if (userData.ph_Num == undefined || userData.ph_Num == "" || userData.ph_Num.length == 0 || !ph_No_regex.test(userData.ph_Num)) {
      setNumberValid(false);
      setIsVisible(!isVisible);
      error = error + 1;
      userData.ph_Num = "" 
      console.log('Error 2');
    }
    else
    setNumberValid(true);

    if (userData.email == undefined || userData.email == "" || userData.email.length == 0 || !emailRegex.test(userData.email)) {
      setEmailValid(false);
      setIsVisible(!isVisible);
      error = error + 1;
      userData.email = ""
      console.log('Error 3');
    }
    else
    setEmailValid(true);

    if (userData.dOb == undefined || userData.dOb == "" || userData.dOb.length == 0) {
      setDOBValid(false);
      setIsVisible(!isVisible);
      error = error + 1;
      userData.dOb = ""
      console.log('Error 4');
    }
    else
    setDOBValid(true);

    if (userData.address == undefined || userData.address == "" || userData.address.length == 0) {
      setAddressValid(false);
      setIsVisible(!isVisible);
      error = error + 1;
      userData.address = ""
      console.log('Error 5');
    }
    else
    setAddressValid(true);

    if (userData.password == undefined || userData.password == "" || userData.password.length == 0 || !passwordRegex.test(userData.password)) {
      setPasswordValid(false);
      setIsVisible(!isVisible);
      error = error + 1;
      userData.password = ""
      console.log('Error 6');
    }
    else
    setPasswordValid(true);

    if (error == 0 ) {
      console.log(userData);
      const response = axios.post(`${serverIP}/Registration_User_Data`, userData)
      .then(res => {
        console.log(res.data);
        const res_userID = res.data;
        if (res_userID === 'unsuccessful') {
          console.log('User creation unsuccessful');
          Alert.alert(
            'Unsuccessful!!!',
            'Please Try Again',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        } else {
          console.log(`User created successfully.`);
          console.log('Your user ID = ' + res_userID + '. Please store your user ID for Log in.');
          Alert.alert(
            'Please Store Your User ID',
            'Your user ID = ' + res_userID + '. Please store your user ID for Log in.',
            [
              {text: 'OK', onPress:() => navigation.navigate('Login_Page_New', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })},
            ],
            {cancelable: false},
          );
        }
        
      })
      .catch(err => {
        console.error(err, ' from front');
      });
      console.log('****************************************************');

    }

    else{
      console.log('Nooooooooooo');
      console.log('----------------------------------------------------------');}
    setButtonPoss(false);
    setSignLinkPoss(false);

  };

  return (
    <View style={styles.container}>
        <View style={{alignSelf:'center', marginBottom: 20}}>
      <Image
        source={require("./img_and_icon/drawable-mdpi/Logo.png")}
        style={styles.logo}
      />
      </View>



      {/* input box */}
      <View style={styles.input}>
        <Text
          style={styles.SignText}>
          Registration
        </Text>

        <TextInput
          style={[styles.inputContainer, !nameValid ? styles.inputContainerAfter : styles.inputContainerBefore]}
          placeholder='Name'
          onChangeText={text => setData({ ...userData, user_Name: text })}
        />
        <Text style={[styles.errorMessage, { display: !nameValid ? 'flex' : 'none' }]}> Please enter a valid User Name. </Text>


        <TextInput
          style={[styles.inputContainer, !numberValid ? styles.inputContainerAfter : styles.inputContainerBefore]}
          placeholder='Phone Number'
          keyboardType="numeric"
          onChangeText={text => setData({ ...userData, ph_Num: text })}
        />
        <Text style={[styles.errorMessage, { display: !numberValid ? 'flex' : 'none' }]}> Please enter a valid Phone Number. </Text>

        <TextInput
          style={[styles.inputContainer, !emailValid ? styles.inputContainerAfter : styles.inputContainerBefore]}
          placeholder='Email'
          onChangeText={text => setData({ ...userData, email: text })}
        />
        <Text style={[styles.errorMessage, { display: !emailValid ? 'flex' : 'none' }]}> Please enter a valid Email. </Text>


        <TouchableWithoutFeedback onPress={showDatePicker}>
          <View
            style={[styles.inputContainer, !dobValid ? styles.inputContainerAfter : styles.inputContainerBefore]}>
            <TextInput
              value={userData.dOb}
              style={styles.textInput}
              placeholder="Date of Birth"
              editable={false}
            />
          </View>
        </TouchableWithoutFeedback>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        <Text style={[styles.errorMessage, { display: !dobValid ? 'flex' : 'none' }]}> Please enter a valid Date of Birth. </Text>

        <TextInput
          style={[styles.inputContainer, !addressValid ? styles.inputContainerAfter : styles.inputContainerBefore]}
          placeholder='Address'
          onChangeText={text => setData({ ...userData, address: text })}
        />
        <Text style={[styles.errorMessage, { display: !addressValid ? 'flex' : 'none' }]}> Please enter a valid Address. </Text>

        <TextInput
          secureTextEntry={true}
          style={[styles.inputContainer, !passwordValid ? styles.inputContainerAfter : styles.inputContainerBefore]}
          placeholder='Password'
          onChangeText={text => setData({ ...userData, password: text })}
        />
        <Text style={[styles.errorMessage, { display: !passwordValid ? 'flex' : 'none' }]}> Password should have (1 letter & 1 number) 8 carecter long </Text>


        <TouchableOpacity
          onPress={handleReg}
          style={[styles.button_Area_Before, !buttonPoss ? styles.button_Area_After : styles.button_Area_Before]}
        >
          <Image
            source={require("./img_and_icon/drawable-hdpi/registration_button.png")}
          />
        </TouchableOpacity>
        <View style={[styles.SignLinkBefore, !signLinkPoss ? styles.SignLinkAfter : styles.SignLinkBefore]}>
          <Text style={{ color: '#5D5D5D' }}>Have Account?</Text>
          <TouchableOpacity
          onPress={() => navigation.navigate('Login_Page_New')}
            >
            <Text style={{ color: '#5D9AD8', marginLeft: 5 }}>Sign in</Text>
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
    marginTop: 20,
    marginBottom: 10
  },

  SignLinkBefore: {
    marginTop: 40,
    flexDirection: 'column',
    alignItems: 'center'
  },

  SignLinkAfter: {
    marginTop: 27,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  logo: {
    marginTop: 50,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#5D9AD8',
  },

  input: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#F0F3F5',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  invalidColor: {
    borderColor: 'red',
  },

  inputContainer: {

  },

  inputContainerAfter: {
    borderWidth: 0.5,
    borderColor: 'red',
    padding: 5,
    width: 331,
    borderRadius: 20,
    marginTop: 11,
  },

  inputContainerBefore: {
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
    padding: 8,
    width: 331,
    borderRadius: 25,
    marginTop: 20,
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
})