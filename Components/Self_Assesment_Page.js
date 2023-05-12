import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import axios from 'axios';

export default function NewAssessment({route}) {
    const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const navigation = useNavigation();
    const isLoaded = useIsFocused();

    const [assessmentData, setAssessmentData] = useState([]);

    async function getAssessmentDetails() {
        try{
            const assessmentDetails = await axios.post(`${serverIP}/get_Assessment_Details`, { userID });
            setAssessmentData(assessmentDetails.data);
            console.log(assessmentData);
        }
        catch(err) {
            console.log(err,'\nError from self Assessment server call-----------------')
        }   
    }


    useEffect(() => {
        if(isLoaded){
            getAssessmentDetails();
        }
    }, [isLoaded]);

    function viewScoreList (item, key) {
        return(
            <View key={key} style={styles.resultsView}> 
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.Assessment_Date}</Text>
            </View>
            <View style={styles.result}>
                <Text style={styles.score}>{item.Assessment_Score}</Text>
                <Text style={styles.condition}>{item.Assessment_Condition}</Text>
            </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
        <View style={{flex: 0.13,  backgroundColor: '#79A9E6',}}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP} />
        </View>
            <View style={styles.blueBox}>

            {
                assessmentData.map((item, key) => (
                    viewScoreList(item, key)
                ))
            }

                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Assesment', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
                        <Entypo name="plus" size={30} color="#2E347E" style={{alignSelf: 'center'}} /> 
                         <Text style={{color: '#2E347E', fontSize:18, textAlign: 'center'}}>New Assessment</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <Nav_Bottom iconName="SelfAsses"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/> 
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    blueBox: {
        flex: 1,
        backgroundColor: "#79A9E6",
        alignItems: 'center'
    },

    buttonStyle: {
        flex: 0.15,
        width: '85%',
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginTop: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultsView: {
        flex: 0.15,
        flexDirection: 'row',
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
        padding: 10,
      },
      dateContainer: {
        flex: 0.5,
        borderRightWidth: 1,
        borderColor: '#00157B',
        alignSelf: 'center',
      },
      date: {
        alignSelf: 'center',
        fontSize: 22,
        color: '#00157B',
      },
      result: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
      },
      score: {
        fontSize: 25,
        color: '#00157B',
        marginRight: 10,
      },
      condition: {
        fontSize: 16,
        color: '#00157B',
      },

});