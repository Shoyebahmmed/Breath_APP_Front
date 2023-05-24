import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Calendar, LocaleConfig  } from 'react-native-calendars';
import { RadioButton } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import { Overlay } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';




    export default function CalPage ({route})  {
          const { user_Name, Prof_Img, userID, serverIP } = route.params;

      const [visible, setVisible] = useState(false);
      const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
      const [Type, setSelectedType] = useState('');
      const [isLoading, setIsLoading] = useState(true);
      const [userSelectedDate, setUserSelectedDate] = useState('');
      const [title, setTitle] = useState('');
      const [location, setLocation] = useState('');
      const [notes, setNotes] = useState('');
      const [time, setTime] = useState('');
      const [items, setItems] = useState([]);

      async function reloadCalenderList() {
          const serverCallResult = await axios.post(`${serverIP}/get_user_Calender_list`, {userID});

          if( serverCallResult.data.length > 0) {
          setItems(serverCallResult.data);
          console.log(serverCallResult.data);
          }
          setIsLoading(false);
          setUserSelectedDate(currentDate);
      }


      useEffect(() => {
          setUserSelectedDate(currentDate);
          reloadCalenderList();
      }, []);

      const handleOptionChange = (value) => {
          setSelectedType(value);
      };

      const handleTitleChange = (newTitle) => {
          setTitle(newTitle);
      };

      const handleTimeChange = (newTime) => {
          setTime(newTime);
      };

      const handleLocationChange = (newLocation) => {
          setLocation(newLocation);
      };

      const handleNotesChange = (newNotes) => {
          setNotes(newNotes);
      };

      const toggleOverlay = () => {
          setVisible(!visible);
      };


      function handleSelectedDate(day) {
          const selectedDate = day.dateString;
          setUserSelectedDate(selectedDate);
        
      }

      async function handleSave() {
          console.log(title, location, notes, time, Type, userSelectedDate);

          if(!title || !notes || !time || !Type || !userSelectedDate) {
              
              Alert.alert('Error', 
              'Sorry you have to write something to save it.',
              [
                  {text: 'Done'},
                  ],
                  {cancelable: false},);
              return;
          }
      
          try {
              const addNoteRes = await axios.post(`${serverIP}/add_new_Calender_Item`, { userID, title, location, notes, time, Type, userSelectedDate });
              console.log(addNoteRes.data);
              if(addNoteRes.data === 'Done') {  
                  reloadCalenderList();  
                  
                  setTitle('');
                  setLocation('');
                  setNotes('');
                  setTime('');
                  setSelectedType('');
                  setUserSelectedDate('');

                  Alert.alert(
                  'Successful...',
                  'Your successfully added a new Event',
                  [
                    {text: 'OK', onPress: () => {toggleOverlay()}},
                  ],
                  {cancelable: false},
                );
              }
              else{
                  Alert.alert(
                      'Unsuccessful!!!',
                      'Please Try Again...',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      {cancelable: false},
                    );
              }
              
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

      function markDates (items) {
          console.log(items, " ________________________");
          const markDate = {};
          items.forEach((item) => {
              const {Date, Type} = item;
        
              if (!markDate[Date]) {
                  markDate[Date] = { dots: [] };
              }
        
              if (Type === "Appointment") {
                  markDate[Date].dots.push({ key: "Appointment", color: "#CA8EFE" });
              } else if (Type === "Medication") {
                  markDate[Date].dots.push({ key: "Medication", color: "#FF7700" });
              }
          })
        
          return markDate;
        }
      
      function handleLongPress(item){
        console.log(item, "*******************");
        Alert.alert(
          'Delete Inhaler',
          'Press \'Delete\' to delete this item from the list.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              onPress: () => {handleDelete(item);},
            },
          ],
          { cancelable: false }
        );
      }


      async function handleDelete(item) {
        let details_ID = item.Details_ID;
        const itemDeleteRes = await axios.post(`${serverIP}/delete_item_from_calender`, { userID, details_ID });
        if(itemDeleteRes){
          reloadCalenderList();
        }
      }

      function renderView() {
          const matchingItems = items.filter((item) => item.Date === userSelectedDate);
        
          if (matchingItems.length > 0) {
            return (
              <ScrollView>
                {matchingItems.map((item, index) => (
                  <View key={index}>
                    {item.Type === 'Appointment' ? (
                      <TouchableOpacity style={styles.infoCont} onLongPress={() => handleLongPress(item)}>
                        <MaterialCommunityIcons name="calendar-clock" size={35} color="#CA8EFE" style={styles.icon}/>
                        <View style={styles.details}>
                          <Text style={styles.name}>{item.Title}</Text>
                          <Text style={styles.location}>{item.Location}</Text>
                          <Text style={styles.location}>{item.Note}</Text>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                              <Text style={styles.time}>{item.Date}</Text>
                              <Text style={styles.time}>{item.Time}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.infoCont} onLongPress={() => handleLongPress(item)}>
                        <MaterialCommunityIcons name="medical-bag" size={35} color="#FFAC63" style={styles.icon}/>
                        <View style={styles.details}>
                          <Text style={styles.name}>{item.Title}</Text>
                          <Text style={styles.location}>{item.Note}</Text>
                          <Text style={styles.time}>{item.Time}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </ScrollView>
            );
          } else {
            return <Text style={styles.noItem}>No items for this date</Text>;
          }
        }
        


      return (
          <View style={{ flex: 1 }}>
          <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP} />
          {isLoading ? (
            <Text style={{flex: 1}}>Loading...</Text>
          ) : (
          <View style={{flex: 1}}>

              <Calendar
              onDayPress={day => handleSelectedDate(day)}
              style={{paddingBottom: 10, borderBottomWidth: 0.3, marginBottom: 20, borderColor: '#DEDEDE'}}
              markingType={'multi-dot'}
              markedDates={markDates(items)}
              />
              {renderView()}

              <TouchableOpacity style={styles.plus} onPress={toggleOverlay}>
                  <Icon name='add' color='#000874' />
              </TouchableOpacity>

              <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>

                      <View style={styles.radioContainer}>
                      <Text style={{fontSize: 18}}>Type</Text>
                          <RadioButton.Group onValueChange={handleOptionChange} value={Type}>
                              <View style={styles.radioOption}>
                                  <RadioButton value="Medication" />
                                  <Text style={styles.radioText}>Medication</Text>
                              </View>
                              <View style={styles.radioOption}>
                                  <RadioButton value="Appointment" />
                                  <Text style={styles.radioText}>Appointment</Text>
                              </View>
                          </RadioButton.Group>
                      </View>

                      <TextInput
                          style={styles.input}
                          onChangeText={handleTitleChange}
                          value={title}
                          placeholder="Title..."
                      />
                      <Text style={{marginTop: 5, marginBottom: 5}}>
                          <Text>Selected date: {userSelectedDate}</Text>
                      </Text>
                      <TextInput
                          style={styles.input}
                          onChangeText={handleTimeChange}
                          value={time}
                          placeholder="Time"
                      />
                      <TextInput
                          style={styles.input}
                          onChangeText={handleNotesChange}
                          value={notes}
                          placeholder="Notes"
                      />

                      {Type === "Appointment" 
                      ? (
                          <View>
                              
                              <TextInput
                                  style={styles.input}
                                  onChangeText={handleLocationChange}
                                  value={location}
                                  placeholder="Location"
                              />

                          </View>
                      ) : null}

                      <TouchableOpacity style={styles.confirm} onPress={() => handleSave()}>
                          <Text style={{color: '#FFFFFF', textAlign: 'center'}}>Save</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={() => newItem(title, location, notes, selectedDate)}>
                          <Text>Save</Text>
                      </TouchableOpacity> */}

              </Overlay>
              </View>
              )}
              <Nav_Bottom iconName="calender"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
          </View>
      );
  };


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 8,
        marginTop: 5,
        marginBottom: 5,
    },
    overlay: {
        width: "90%",
        height: "70%",
        backgroundColor: '#E8F3FF',
        borderRadius: 20,
        padding: 30
    },
    noItemsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 17,
      },
    plus: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#94C9FF',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirm: {
        alignSelf: 'center',
        width: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: '#94C9FF',
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
    infoCont: {
        flexDirection: 'row',
        paddingLeft: 40,
        borderWidth: 0.3,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingRight: 30
      },
      name: {
        fontSize: 18,
        marginBottom: 2,
        color: '#000874'
      },
      location: {
        fontSize: 14,
      },
      time: {
        fontSize: 14,
        color: '#888',
      },
      icon: {
        alignSelf: 'center',
        marginRight: 30,
      },
      details: {
        flex: 1,
        flexDirection: 'column',
      },
      noItem: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center'
      },
});