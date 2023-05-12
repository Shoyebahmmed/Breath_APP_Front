//onPress={() => navigation.navigate('Inhaler_Details_View', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, item: item })}>
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import Add_Inhaler from './Add_Inhaler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function Inhaler({route}) {
    const navigation = useNavigation();
    const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const [inhalerDetails, setInhalerDetails] = useState([]);
    useEffect(() => {
        async function reloadInhalerData() {
        try {
            const inhalerUpdateDetails = await axios.post(`${serverIP}/inhaler_info_display`, { userID });
            setInhalerDetails(inhalerUpdateDetails.data);
            console.log(inhalerUpdateDetails.data);
        }
        catch(error) {
            console.log(error);
            console.log("Error From get Data")
        }
    }
    reloadInhalerData();
    }, []);



    function inhalerDetailsView() {
        return (
          <ScrollView style={styles.scrollView} >
            {inhalerDetails.map((item, index) => (
              <View key={index} style={styles.details_Cont}>
                <Image
                  source={require("./img_and_icon/in_icon.png")}
                  style={{ height: 40, width: 40, alignSelf: 'center' }}
                />
                <View style={styles.info_cont}>
                  <Text style={styles.name}>{item.Inhaler_Name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Type: </Text>
                    <Text style={styles.result}>{item.Type}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Started: </Text>
                    <Text style={styles.result}>{item.Start_Date}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Expected end: </Text>
                    <Text style={styles.result}>{item.Expected_End_Date}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ alignSelf: 'center' }}
                  onPress={() => navigation.navigate('Inhaler_Details_View', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, item: item, serverIP: serverIP })}
                >
                  <AntDesign name="rightcircle" size={20} color="#03076F" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )
      }
      

    function nothingView() {
        return(
        <View>
        <Text style={styles.nothing}>Please Add Your Inhaler Details by Clicking {"\n\n"}+ Add Inhaler</Text>
        </View>
        )
    }

    return (

        <View style={styles.container}>
        <View style={{flex: 0.135,  backgroundColor: '#3F8AD6',}}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP} />
        </View>
            <View style={styles.blueBox}>
                <View style={{ flex: 0.35}}>
                <Image
                    source={require("./img_and_icon/asthma_inhaler.png")}
                    style={{ height: 150, width: 150, alignSelf: 'center', marginTop: '3%' }}
                />
                <Text style={styles.titleText}> Inhaler<Text style={{ color: '#94C9FF' }}> Information </Text></Text>
                </View>
                <View style={{ flex: 0.55, padding: 20 }}>
                {inhalerDetails.length === 0 ? nothingView() : inhalerDetailsView()}
                </View>
            </View>
                        

                <View style={styles.plusIcon}>
                <TouchableOpacity 
                onPress={() => navigation.navigate('Add_Inhaler', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP : serverIP })}>

                        <Ionicons name="ios-add" size={45} color="#03076F" style= {styles.icon}/>
                        <Text style={styles.bodyText}>Add Inhaler</Text>   
                    </TouchableOpacity>
                </View>

                <Nav_Bottom iconName="IMP"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP} style={{flex: 0.1}}/>
        </View>
        
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
      },

      nothing: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF',
        marginTop: 80,
      },

      details_Cont: {
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        padding: 15,
        borderRadius: 30,

        
      },

      info_cont: {
        borderLeftWidth: 2, 
        borderColor: 'black',
        marginLeft: 20,
        paddingLeft: 20,
        width: '75%',
        alignSelf: 'center',
      },

      name: {
        color: '#00157B',
        fontSize: 18,
      },

      title: {
        color: '#00157B',
        fontSize: 15,
      },

      result: {
        color: '#017FFF',
        fontSize: 15,
        marginLeft: 5,
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

    blueBox: {
        flex: 0.83,
        flexDirection: 'column',
        backgroundColor: '#3F8AD6',
        width: '100%',  
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      },

      scrollView: {
        flex:0.03,
        padding: 20,
        paddingBottom: 100,
      },

    titleText: {
        color: '#03076F',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    plusIcon: {
        flex: 0.17, 
        justifyContent: 'flex-end', 
        alignItems: 'flex-end',
        marginRight: 30,
        marginBottom: 30,
    },

    bodyText: {
        color: '#03076F',
        fontSize: 16,
        paddingTop: 5,
        alignItems: 'center',
    }

});
