import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login_Page_New from './Components/Login_Page_New';
import Registration_Page from './Components/Registration_Page';
import Test from './Components/Test';
import Social_Top from './Components/Social_Content_Top';
import Social_Page from './Components/Social_Page';
import Nav_Bottom from './Components/Nav_Bottom';
import Menu from './Components/Menu';
import Home_Page from './Components/Home_Page';
import Diary_Page from './Components/Diary_Page';
import Social_Page_Comment_Page from './Components/Social_Page_Comment_Page';
import Social_Cont_View from './Components/Social_Content_View';
import Asth_Act_Plan_Cont_1 from './Components/Asth_Act_Plan_Cont_1';
import Asth_Act_Plan_Cont_2 from './Components/Asth_Act_Plan_Cont_2';
import Asth_Act_Plan_Cont_3 from './Components/Asth_Act_Plan_Cont_3';
import Asth_Act_Plan_Cont_4 from './Components/Asth_Act_Plan_Cont_4';
import Asthma_Action_Plan from './Components/Asthma_Action_Plan';
import Health_Education_Page from './Components/Health_Education_Page';
import Health_Content_View from './Components/Health_Content_View';
import Weather_Page from './Components/Weather_Page';
import Header from './Components/Header';
import Inhaler_Monitoring_Page from './Components/Inhaler_Monitoring_Page';
import Inhaler_Details_View from './Components/Inhaler_Details_View';
import Add_Inhaler from './Components/Add_Inhaler';
import Profile_Page from './Components/Profile_Page';
import Setting from './Components/Setting';
import Edit_Profile_Page from './Components/Edit_Profile_Page';
import Change_Password from './Components/Change_Password_Page';
import About from './Components/About';
import Referance from './Components/Reference';
import Notification from './Components/Notification';
import Notification_Setting from './Components/Notification_Setting';
import Puffer from './Components/Puffer';
import Self_Assesment from './Components/Self_Assesment_Page';
import Assesment from './Components/Assesment_Page';
import Add_Diary from './Components/Add_Diary';
import Note_View from './Components/Note_View';
import Cal_Page from './Components/Cal_Page';

const Stack = createNativeStackNavigator();
const bgTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    //backgroundImage: require('./Components/img_and_icon/Screen.png'),
    //background: 'rgb(93, 154, 216)',
  },
};



export default function App() {


  return (
    // <View style = {styles.container}>
    //   <Cal_Page />
    // </View>

    <View style = {styles.container}>
    <ImageBackground source={require('./Components/img_and_icon/Screen.png')} style={styles.image}>
    <NavigationContainer theme={bgTheme}>

      <Stack.Navigator
        screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Login_Page_New" component={Login_Page_New} />
        <Stack.Screen name="Registration_Page" component={Registration_Page} />
        <Stack.Screen name="Home_Page" component={Home_Page} />
        <Stack.Screen name="Diary_Page" component={Diary_Page} />
        <Stack.Screen name="Nav_Bottom" component={Nav_Bottom} />
        <Stack.Screen name="Health_Education_Page" component={Health_Education_Page} />
        <Stack.Screen name="Asthma_Action_Plan" component={Asthma_Action_Plan} />
        <Stack.Screen name="Social_Page" component={Social_Page} />
        <Stack.Screen name="Health_Content_View" component={Health_Content_View} />
        <Stack.Screen name="Weather_Page" component={Weather_Page} />
        <Stack.Screen name="Inhaler_Monitoring_Page" component={Inhaler_Monitoring_Page} />
        <Stack.Screen name="Inhaler_Details_View" component={Inhaler_Details_View} />
        <Stack.Screen name="Add_Inhaler" component={Add_Inhaler} />
        <Stack.Screen name="Profile_Page" component={Profile_Page} />
        <Stack.Screen name="Edit_Profile_Page" component={Edit_Profile_Page} />
        <Stack.Screen name="Change_Password" component={Change_Password} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Referance" component={Referance} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Notification_Setting" component={Notification_Setting} />
        <Stack.Screen name="Self_Assesment" component={Self_Assesment} />
        <Stack.Screen name="Assesment" component={Assesment} />
        <Stack.Screen name="Add_Diary" component={Add_Diary} />
        <Stack.Screen name="Note_View" component={Note_View} />
        <Stack.Screen name="Cal_Page" component={Cal_Page} />
    
      </Stack.Navigator>
    </NavigationContainer>
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
