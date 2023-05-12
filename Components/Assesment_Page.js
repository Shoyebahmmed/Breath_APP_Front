import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SelfAssessment({route}) {
    const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const navigation = useNavigation();

    const [Answer1, setAnswer1] = useState('');
    const [Answer2, setAnswer2] = useState('');
    const [Answer3, setAnswer3] = useState('');
    const [Answer4, setAnswer4] = useState('');
    const [Answer5, setAnswer5] = useState('');

    async function addAssessmentToDB(result, condition) { 
        const serverCallResult = await axios.post(`${serverIP}/add_assessment`, { userID, result, condition });
        if(serverCallResult.data === 'successful') 
            return true;
        
        else return false;
    }

    function handleAnswer() {
        if (
            Answer1 === '' || Answer1 === undefined || Answer1.length === 0 || isNaN(parseInt(Answer1, 10)) ||
            Answer2 === '' || Answer2 === undefined || Answer2.length === 0 || isNaN(parseInt(Answer2, 10)) ||
            Answer3 === '' || Answer3 === undefined || Answer3.length === 0 || isNaN(parseInt(Answer3, 10)) ||
            Answer4 === '' || Answer4 === undefined || Answer4.length === 0 || isNaN(parseInt(Answer4, 10)) ||
            Answer5 === '' || Answer5 === undefined || Answer5.length === 0 || isNaN(parseInt(Answer5, 10))
            )
            {
                Alert.alert(
                    'Result',
                    'Please Answer All the Questions.',
                    [
                    {text: 'Done'},
                    ],
                    {cancelable: false},
                )
        }
        else {
            const result = parseInt(Answer1, 10) + parseInt(Answer2, 10) + parseInt(Answer3, 10) + parseInt(Answer4, 10) + parseInt(Answer5, 10);
            let condition = '';
            console.log( Answer1, Answer2, Answer3, Answer4, Answer5, result);

            if (result >= 25){
                console.log(1);
                condition = 'Well-controlled';
            }
            else if (result >= 20 && result <= 24){
                console.log(2);
                condition = 'Not well-controlled';
            }
            
            else if (result >= 16 && result <= 19){
                console.log(3);
                condition = 'Symptoms Get Worse';
            }
            
            else if (result >= 5 && result <= 15){
                console.log(4);
                condition = 'Very poor control';
            }

            const serverCall = addAssessmentToDB(result, condition);
            if(serverCall) {
                Alert.alert(
                    'Result',
                    `Your Assessment result is = ${result} \n${condition}`,
                    [
                    {text: 'Done', onPress: () => navigation.navigate('Self_Assesment', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })},
                    ],
                    {cancelable: false},
                )
            }
            else{
                Alert.alert(
                    'Result',
                    'Please Answer All the Questions.',
                    [
                    {text: 'Done'},
                    ],
                    {cancelable: false},
                )
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity onPress={() => navigation.navigate('Self_Assesment', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}> 
                    <Ionicons name="arrow-back-outline" size={29} color="#03006C" />
                </TouchableOpacity>
                <Text style={{ color: '#03006C', fontSize: 30, fontWeight: "bold" }}> Self </Text>
                <Text style={{ color: '#9CC6FA', fontSize: 30 }}>Assessment</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.body}>
                    <Text style={styles.subtitle}>Question 1</Text>
                    <Text style={styles.question}>In the past 4 weeks, how often did your asthma prevent you from getting as much done at work, school or home? </Text>
                    
                    <RadioButton.Group onValueChange={(value) => setAnswer1(value)} value={Answer1}>
                    <View style={styles.radioOption}>
                        <RadioButton value = "1" />
                        <Text style={styles.radioText}>All of the time</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="2" />
                        <Text style={styles.radioText}>Most of the time</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="3" />
                        <Text style={styles.radioText}>Some of the time</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="4" />
                        <Text style={styles.radioText}>A little of the time</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="5" />
                        <Text style={styles.radioText}>Not at all</Text>
                    </View>
                </RadioButton.Group>

                </View>

                <View style={styles.body}>
                    <Text style={styles.subtitle}>Question 2</Text>
                    <Text style={styles.question}>During the past 4 weeks, how often have you had shortness of breath?</Text>
                     
                    <RadioButton.Group onValueChange={(value) => setAnswer2(value)} value={Answer2}>
                    <View style={styles.radioOption}>
                        <RadioButton value = "1" />
                        <Text style={styles.radioText}>More than once a day</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="2" />
                        <Text style={styles.radioText}>Once a day</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="3" />
                        <Text style={styles.radioText}>3 to 6 times a week</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="4" />
                        <Text style={styles.radioText}>Once or twice a week</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="5" />
                        <Text style={styles.radioText}>Not at all</Text>
                    </View>
                </RadioButton.Group>

                </View>

                <View style={styles.body}>
                    <Text style={styles.subtitle}>Question 3</Text>
                    <Text style={styles.question}>During the past 4 weeks, how often did your asthma symptoms (wheezing, coughing, shortness of breath, chest tightness or pain) wake you up at night or earlier than usual in the morning?</Text>
                     
                    <RadioButton.Group onValueChange={(value) => setAnswer3(value)} value={Answer3}>
                    <View style={styles.radioOption}>
                        <RadioButton value = "1" />
                        <Text style={styles.radioText}>4 or more times a week</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="2" />
                        <Text style={styles.radioText}>2 to 3 nights a week</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="3" />
                        <Text style={styles.radioText}>1 night a week</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="4" />
                        <Text style={styles.radioText}>Less than 1 night a week</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="5" />
                        <Text style={styles.radioText}>Not at all</Text>
                    </View>
                </RadioButton.Group>

                </View>

                <View style={styles.body}>
                    <Text style={styles.subtitle}>Question 4</Text>
                    <Text style={styles.question}>During the past 4 weeks, how often have you used your reliever medication (such as salbutamol)?</Text>
                     
                    <RadioButton.Group onValueChange={(value) => setAnswer4(value)} value={Answer4}>
                    <View style={styles.radioOption}>
                        <RadioButton value = "1" />
                        <Text style={styles.radioText}>3 or more times a day</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="2" />
                        <Text style={styles.radioText}>1 or 2 times per day</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="3" />
                        <Text style={styles.radioText}>2 or 3 times per week</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="4" />
                        <Text style={styles.radioText}>Once a week or less</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="5" />
                        <Text style={styles.radioText}>Not at all</Text>
                    </View>
                </RadioButton.Group>

                </View>

                <View style={styles.body}>
                    <Text style={styles.subtitle}>Question 5</Text>
                    <Text style={styles.question}>How would you rate your asthma control during the past 4 weeks?</Text>

                    <RadioButton.Group onValueChange={(value) => setAnswer5(value)} value={Answer5}>
                    <View style={styles.radioOption}>
                        <RadioButton value = "1" />
                        <Text style={styles.radioText}>Not controlled</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="2" />
                        <Text style={styles.radioText}>Poorly controlled</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="3" />
                        <Text style={styles.radioText}>Somewhat controlled</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="4" />
                        <Text style={styles.radioText}>Well controlled</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="5" />
                        <Text style={styles.radioText}>Completely controlled</Text>
                    </View>
                </RadioButton.Group>
                </View>

                <TouchableOpacity 
                style={styles.buttonDesign}
                onPress={() => handleAnswer()}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
            <Nav_Bottom iconName="Assesment"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/> 
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 32
    },

    title: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },

    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00157B',
        marginBottom: 10,
        marginTop: 20,
    },

    content: {
        flex: 1,
        width: '85%',
    },

    body: {
        
    },
    question: {
        fontSize: 16,
        color: '#00157B',
        marginBottom: 15,
    },

    buttonDesign: {
        marginTop: 30,
        marginBottom: 30,
        width: '30%',
        backgroundColor: '#94C9FF',
        alignSelf: 'center',
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 5,
        paddingVertical: 7,
    },
    radioOption: {
        flexDirection: 'row',
        marginLeft: 40
    },

    radioText: {
        alignSelf: 'center',
        marginLeft: 7,
        fontSize: 15,
        color: '#00157B',
    },

});