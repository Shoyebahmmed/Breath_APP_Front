import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import PaginationDots from 'react-native-pagination-dots';
import Asth_Act_Plan_Cont_1 from './Asth_Act_Plan_Cont_1';
import Asth_Act_Plan_Cont_2 from './Asth_Act_Plan_Cont_2';
import Asth_Act_Plan_Cont_3 from './Asth_Act_Plan_Cont_3';
import Asth_Act_Plan_Cont_4 from './Asth_Act_Plan_Cont_4';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';

export default function AsthmaActionPlan ({route}) {
  const { user_Name, Prof_Img, userID, serverIP } = route.params;

  const items = [
    { id: 1, component: <Asth_Act_Plan_Cont_1 serverIP = {serverIP}/> },
    { id: 2, component: <Asth_Act_Plan_Cont_2 serverIP = {serverIP}/> },
    { id: 3, component: <Asth_Act_Plan_Cont_3 serverIP = {serverIP}/> },
    { id: 4, component: <Asth_Act_Plan_Cont_4 serverIP = {serverIP}/> },
  ];

  function ListItem({ item }) {
    return (
      <View key={item.id} style={styles.slide}>
        {item.component}
        {/* <Text style={styles.text}>{item.name}</Text> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
              <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
      <Swiper paginationStyle={styles.pagination}>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </Swiper>
      <Nav_Bottom iconName="AAP" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  slide: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },

  pagination: {
    
  },
});

