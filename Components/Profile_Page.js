import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, FlatList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Profile_Page ({route}) {
    const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setData] = useState([]);
    const [asthamaTriggers, setAsthamaTriggers] = useState([]);
    
  
    async function getAllDetails() {
      console.log('---------------------------------------------------------------');
      const serverCallResult = await axios.post(`${serverIP}/get_User_All_Details`, { userID});

      if( serverCallResult.data.length > 0) {
        setData(serverCallResult.data);
        console.log(serverCallResult.data);
      }
      else{
        setData([{  
          DOB: 'None',
          Email: 'None',
          Address: 'None',
          Assessment_Condition: 'None',
          Medical_Condition:'None' 
        }])
      }

      const serverCallResult2 = await axios.post(`${serverIP}/get_User_All_Triggers_Details`, { userID});
      if( serverCallResult2.data.length > 0) {
        console.log(serverCallResult2.data);
        setAsthamaTriggers(serverCallResult2.data, ' ____________________');
      }
      else{
        setAsthamaTriggers([{ 
          Trigger_ID: '1', 
          Triggers_Name: 'None'
        }])
        console.log( asthamaTriggers, ' ***********************************')
      }


      setIsLoading(false);
    }

    useEffect(() => {
      getAllDetails();
    }, [])

  
    return (
      <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
        <ScrollView style={{flex:1}}>
          <View style={styles.profImgContainer}>
            <Image source={require('./img_and_icon/profile_Img.png')} style={styles.profImage} />
          </View>
          <Text style={styles.username}>{user_Name}</Text>
          <View style={styles.button}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() =>navigation.navigate('Edit_Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={[styles.buttonStyle, {marginLeft: 30}]}
            onPress={() =>navigation.navigate('Change_Password', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>        
        

        <View style={{ marginLeft: '10%', marginTop: 30, flex: 1}}>
          <View style={styles.UserDetailsBox}>
          <MaterialCommunityIcons name="calendar" size={25} color="#000874" />
              <Text style={styles.UserDetailsText}>{userData[0].DOB}</Text>
          </View>
          <View style={styles.UserDetailsBox}>
          <MaterialCommunityIcons name="email" size={25} color="#000874" />
            <Text style={styles.UserDetailsText}>{userData[0].Email}</Text>
          </View>
          <View style={styles.UserDetailsBox}>
          <MaterialCommunityIcons name="home" size={25} color="#000874" />
            <Text style={styles.UserDetailsText}>{userData[0].Address}</Text>
          </View>
          <View style={[styles.UserDetailsBox, {marginLeft: 3}]}>
          <MaterialCommunityIcons name="lungs" size={24} color="#000874" />
            <Text style={[styles.UserDetailsText, {fontWeight: 'bold'}]}>Asthma Condition</Text>
          </View>
          <View style={styles.UserDetailsCont}>
            <Text style={styles.UserDetailsBoxData}>
                {userData[0].Assessment_Condition}
            </Text>
          </View>
          <View style={[styles.UserDetailsBox, {marginLeft: 6}]}>
          <FontAwesome5 name="file-medical" size={20} color="#000874" />
            <Text style={[styles.UserDetailsText, {fontWeight: 'bold', marginLeft: 15}]}>Details</Text>
          </View>
          <View style={styles.UserDetailsCont}>
            <Text style={styles.UserDetailsBoxData}>
                {userData[0].Medical_Condition}
            </Text>
          </View>
          <View style={styles.UserDetailsBox}>
          <FontAwesome5 name="power-off" size={18} color="#000874" style={{alignSelf:'center'}}/>
            <Text style={[styles.UserDetailsText, {fontWeight: 'bold'}]}>Asthma Triggers</Text>
          </View>

          <View style={styles.asthmaListContainer}>
            {asthamaTriggers.map((trigger) => (
              <View key={trigger.Trigger_ID} style={styles.item}>
                <View style={styles.bullet} />
                <Text style={styles.itemText}>{trigger.Triggers_Name}</Text>
              </View>
            ))}
          </View>
          </View> 
          </ScrollView>

        )}
          <Nav_Bottom iconName="Profile"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    profImgContainer: {
        width: 140,
        height: 140,
        borderRadius: 50,
        overflow: 'hidden',
        marginTop: 15,
        alignSelf: 'center',
      },
      profImage: {
        width: '100%',
        height: '100%',
      },
      
    BackBtn: {
      marginHorizontal: 50,
      // height: 40,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    username: {
      alignSelf: 'center',
      fontSize: 24,
      color: '#000874',
    },
    UserDetailsText: {
      fontSize: 18,
      color: '#000874',
      marginLeft: 10,
      alignSelf: 'center',
    },
    UserDetailsBox: {
      flexDirection:'row',
      marginTop: 10,
      width: '80%',
    },
    UserDetailsCont: {
        marginTop: 5,
        marginLeft: 10,
        color: "#72759A",
        width: '80%', 
    },
    UserDetailsBoxData: {
      color: "#72759A",
      marginLeft: 25,
    },
    UserAsthamaTriggers: {
      fontSize: 20,
      color: '#000874',
    },

    item: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 100,
    },
    itemText: {
      fontSize: 16,
      marginLeft: 10,
      color: "#72759A",
    },
    buttonStyle: {
        backgroundColor: '#94C9FF',
        borderRadius: 25,
        paddingHorizontal: 30,
        paddingVertical: 8,
        marginTop: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.84,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
    },
    asthmaListContainer: {
      marginTop: 10,
      marginLeft: 30,
      marginBottom: 20,
    },
    bullet: {
      width: 5,
      height: 5,
      borderRadius: 4,
      backgroundColor: '#000',
      marginRight: 10,
    },
  })

