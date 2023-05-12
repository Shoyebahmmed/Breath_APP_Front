import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RadioButton } from 'react-native-paper';
import TextInputNew from './Coust_Text_Input';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';


export default function AddInhaler({route}) {
    const navigation = useNavigation();
    const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const [Type, setSelectedType] = useState('');
    const [Inhaler_Name, setInhalerName] = useState('');
    const [Expiry_Date, setexpiryDate] = useState('');
    const [Num_of_Puffs, setnumOfPuffs] = useState('');
    const [Puffs_Per_Day, setpuffsDay] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleOptionChange = (value) => {
        setSelectedType(value);
    };

    const showDatePicker = () => {
      setIsVisible(true);
    };
  
    const hideDatePicker = () => {
      setIsVisible(false);
    };
  
    const handleConfirmDate = (selectedDate) => {
      const formattedDate = selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
      setexpiryDate(formattedDate);
      hideDatePicker();
    };

    async function addInhalerByUserID() {
        if ( !Inhaler_Name || !Type || !Expiry_Date || !Num_of_Puffs || !Puffs_Per_Day ) {
            Alert.alert('Error', 
            'Please fill in all the fields',
            [
                {text: 'Done'},
                ],
                {cancelable: false},);
            return;
          }
        try {
            const addInhalerRes = await axios.post(`${serverIP}/add_inhaler`, { userID, Inhaler_Name, Type, Expiry_Date, Num_of_Puffs, Puffs_Per_Day });
            console.log(addInhalerRes.data);

            Alert.alert(
                'Successful...',
                'Your successfully added a new Inhaler',
                [
                  {text: 'OK', onPress:() => navigation.navigate('Inhaler_Monitoring_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })},
                ],
                {cancelable: false},
              );
            
        }
        catch(error) {
            console.log(error);
            console.log("Error From get Data");
            Alert.alert(
                'Unsuccessful!!!',
                'Please Try Again',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity style={{ marginTop: 30 }} onPress={() => navigation.navigate('Inhaler_Monitoring_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
                <Ionicons name="arrow-back" size={30} color="#03076F" />
            </TouchableOpacity>
            <View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./img_and_icon/in_icon.png')} style={styles.icon} />
            </View>
            </View>
            
            

            <Text style={styles.titleText}>Add<Text style={styles.highlightedText}> Inhaler</Text></Text>

            <TextInputNew label='Inhaler Name' value={Inhaler_Name} onChangeText={setInhalerName} secure={false}/>
            <TextInputNew label='Number of Puffs' value={Num_of_Puffs} onChangeText={setnumOfPuffs} secure={false}/>
            <TextInputNew label='Puffs per Day' value={Puffs_Per_Day} onChangeText={setpuffsDay} secure={false}/>


            <TouchableOpacity onPress={showDatePicker} style={styles.dateCont}>
            {Expiry_Date ? (
                <View>
                <Text style={styles.dateInputAfter}>Expiry Date</Text>
                <TextInput
                    style={styles.input}
                    value={Expiry_Date}
                    editable={false}                  
                />
                </View>
            ) : (
                <Text style={styles.dateInputBefore}>Expiry Date</Text>
            )}
                
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />


            <View style={styles.radioContainer}>
            <Text style={styles.bodyText}>Type</Text>
                <RadioButton.Group onValueChange={handleOptionChange} value={Type}>
                    <View style={styles.radioOption}>
                        <RadioButton value="Preventer" />
                        <Text style={styles.radioText}>Preventer</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton value="Reliever" />
                        <Text style={styles.radioText}>Reliever</Text>
                    </View>
                </RadioButton.Group>
            </View>



            <TouchableOpacity style={styles.buttonStyle}
            onPress={() => {addInhalerByUserID()}}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    dateCont: {
        backgroundColor:'#E8F3FF',
        width: '80%',
        padding: 10,
        marginBottom: 20,
    },
    dateInputBefore: {
        fontSize: 18,
        color: '#000000',
        padding: 7,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
      },

    dateInputAfter: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#017FFF',
        backgroundColor: '#F8F8F8',
        padding: 12,
        fontSize: 16,
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 20,
        justifyContent: "center",
        alignSelf: "center",
    },
    titleText: {
        color: '#03076F',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    highlightedText: {
        color: '#94C9FF',
    },

    radioContainer: {
        width: '80%',
        backgroundColor: '#E8F3FF',
        padding: 10
    },

    radioOption: {
        flexDirection: 'row',
        marginLeft: 40
    },

    radioText: {
        alignSelf: 'center',
        marginLeft: 7,
        fontSize: 15,
    },
    
    bodyText: {
        alignSelf: 'flex-start',
        fontSize: 18,
        color: '#000000',
        padding: 7,
        marginLeft: 5,
        marginBottom: 10,
    },
    buttonStyle: {
        backgroundColor: '#94C9FF',
        borderRadius: 25,
        paddingHorizontal: 40,
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
        fontSize: 18,
        textAlign: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
});