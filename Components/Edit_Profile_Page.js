import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';



export default function Profile_Page_Edit ({route}) {
  const { user_Name, Prof_Img, userID, serverIP } = route.params;
  const navigation = useNavigation();
  const [userData, setData] = useState({ 
    user_name: '', 
    DOB: '',
    email: '',
    address: '',
    medicalCondition_detail:'' 
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [selectedTriggers, setSelectedTriggers] =useState([]);

  function updateSelectedTriggers (name) {
    setSelectedTriggers((prevCheckboxes) => {
      if (prevCheckboxes.includes(name)) {
        return prevCheckboxes.filter((item) => item !== name);
      } else {
        return [...prevCheckboxes, name];
      }
    });
  }

  async function handleUpdate() {
    if( !userData.user_name || !userData.email || !userData.DOB || !userData.address || !userData.medicalCondition_detail || !selectedTriggers.length) {
      console.log(userData, selectedTriggers);
      Alert.alert('Error', 
      'Please fill in all the fields',
      [
          {text: 'Done'},
          ],
          {cancelable: false},);
      return;
    }


    const updateDetail = await axios.post(`${serverIP}/update_user_details`, {userID, userData, selectedTriggers});
    //() =>navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })
    if( updateDetail.data === 'Done'){
      Alert.alert(
        'Successful...',
        'Your successfully Updated your Details',
        [
          {text: 'OK', onPress:() => navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })},
        ],
        {cancelable: false},
      );
    }
    else{
      Alert.alert('Error', 
      'Some Error....',
      [
          {text: 'Done'},
          ],
          {cancelable: false},);
      return;
    }
  }

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    onChangeText = setData({...userData, DOB: formattedDate});
    hideDatePicker();
  };


  //onPress={() =>navigation.navigate('Inhaler_Monitoring_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}
  return (
    <View style={styles.container}>
    <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>

            <View style={{flex: 0.2, flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 20,}}>
            <TouchableOpacity onPress={() =>navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
            <Ionicons name="arrow-back" size={30} color="#03076F" />
            </TouchableOpacity>
            <View style={{alignSelf: 'center', flex: 1}}>
            <Image 
            source={require("./img_and_icon/drawable-hdpi/user_icon.png")}
            style = {[styles.icon, {justifyContent: "center", alignSelf: "center"}]}
            />
            </View>
            </View>


            

            

        <View style={styles.body}>
        <ScrollView>
        <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Name</Text>

          <TextInput
            style={styles.textBox}
            onChangeText={(inputText) => setData({...userData, user_name: inputText})}
            value={userData.user_name}
            placeholder="Username"
          />
            

        </View>





        <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Date of Birth</Text>
        <TouchableOpacity onPress={() => {showDatePicker()}}>
            <TextInput
              value={userData.DOB}
              style={styles.textBox}
              placeholder="DD/MM/YYYY"
              editable={false}
            />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
          </View>

          <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Email</Text>

        <TextInput
          style={styles.textBox}
          onChangeText={(inputText) => setData({...userData, email: inputText})}
          value={userData.email}
          placeholder="email@gmail.com"
        />

        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Address</Text>

          <TextInput
            style={styles.textBox}
            onChangeText={(inputText) => setData({...userData, address: inputText})}
            value={userData.address}
            placeholder="Street name, Suburb, State"
          />

          </View>

          <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Medical/Condition Details</Text>

          <TextInput
            style={styles.textBox}
            onChangeText={(inputText) => setData({...userData, medicalCondition_detail: inputText})}
            value={userData.medicalCondition_detail}
            placeholder="Details"
          />
          </View>

<View style={styles.checkboxContainer}>
        <Text style={styles.titleText}>Asthama Triggers</Text>

        
      <CheckBox
        title='Mould'
        checked={selectedTriggers.includes('Mold')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Mold')}
      />
      <CheckBox
        title='Hay Fever'
        checked={selectedTriggers.includes('Hay Fever')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Hay Fever')}
      />
      <CheckBox
        title='Air Quality'
        checked={selectedTriggers.includes('Air Quality')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Air Quality')}
      />
      <CheckBox
        title='Extreme Weather'
        checked={selectedTriggers.includes('Extreme Weather')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Extreme Weather')}
      />
      <CheckBox
        title='Colds'
        checked={selectedTriggers.includes('Colds')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Colds')}
      />
      <CheckBox
        title='Cold air'
        checked={selectedTriggers.includes('Cold air')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Cold air')}
      />
      <CheckBox
        title='Cigarette smoke'
        checked={selectedTriggers.includes('Cigarette smoke')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Cigarette smoke')}
      />
      <CheckBox
        title='Viruses'
        checked={selectedTriggers.includes('Viruses')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Viruses')}
      />
      <CheckBox
        title='Gardening'
        checked={selectedTriggers.includes('Gardening')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Gardening')}
      />
      <CheckBox
        title='Animals'
        checked={selectedTriggers.includes('Animals')}
        containerStyle={{ 
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        }}
        onPress={() => updateSelectedTriggers('Animals')}
      />
        
        </View>

        <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleUpdate()}
            >
            <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
</ScrollView>
        </View>
        
        <Nav_Bottom iconName="EditeProfile"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    fontSize: 25, 
    fontWeight: 'bold',  
    alignSelf: 'center',
  },
  icon: {
    marginTop: 10,
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 25,
    flexDirection: 'column',
    width: '70%',
    alignSelf: 'center',
  },

  checkboxContainer: {
    flex: 1,
    marginBottom: 20,
    flexDirection: 'column',
    width: '70%',
    alignSelf: 'center',
  },

  textBox: {
    height: 40,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginTop: 10,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  updateButton: {
    width: 120,
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
    fontSize: 16
  }
});
