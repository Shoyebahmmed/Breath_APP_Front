import {View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


export default function Menu ({user_Name, Prof_Img, userID, serverIP}) {
    console.log(user_Name, " from Menu");

    const navigation = useNavigation();
    const pressHandler = (id) =>
    {
        console.log(id);
    }
//For each of the touchable opacities, Change the presshandler to the corresponding pages.
//The username part of the navigation can be made so it has a presshandler in later iterations.  breath_logo_menu.png
    return (
        <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home_Page' , { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.page_name}>
            <Image
                    source={require("./img_and_icon/drawable-mdpi/breath_logo_menu.png")}

                />
                </TouchableOpacity>

            <View style={styles.line}></View>
            
            <TouchableOpacity onPress={ () =>navigation.navigate('Inhaler_Monitoring_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.logo}>
            <View style={styles.icon}>
            <MaterialCommunityIcons name="hospital-box-outline" size={27} color="#000874" />
                    <Text style={styles.icon_text}>Inhaler Usage Monitoring</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Weather_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.logo}>
            <View style={styles.icon}>
            <MaterialCommunityIcons name="weather-cloudy-alert" size={27} color="#000874" />
                    <Text style={styles.icon_text}>Environmental Triggers</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Asthma_Action_Plan', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.logo}>
            <View style={styles.icon}>
            <MaterialCommunityIcons name="head-dots-horizontal" size={29} color="#000874" />
                    <Text style={styles.icon_text}>Asthma Action Plan</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Cal_Page' , { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.logo}>
            <View style={styles.icon}>
            <Ionicons name="calendar-sharp" size={25} color="#000874" />
                    <Text style={styles.icon_text}>User Calendar </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Self_Assesment', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.logo}>
            <View style={styles.icon}>
            <MaterialIcons name="assessment" size={27} color="#000874" />
                    <Text style={styles.icon_text}>Self Assessment</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Social_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.logo}>
            <View style={styles.icon}>
            <FontAwesome name="group" size={25} color="#000874" />
                    <Text style={styles.icon_text}>Social Support</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Setting', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.logo}>
            <View style={styles.icon}>
            <Ionicons name="settings" size={25} color="#000874" />
                    <Text style={styles.icon_text}>Settings </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('About', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })} style={styles.logo}>
            <View style={styles.icon}>
            <Entypo name="info-with-circle" size={25} color="#000874" />
                    <Text style={styles.icon_text}>About </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() =>navigation.navigate('Login_Page_New')} style={styles.logo}>
            <View style={styles.icon}>
            <MaterialCommunityIcons name="logout" size={27} color="#000874" />
                    <Text style={styles.icon_text}>Logout</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.footer}>
                <View style={styles.sLine}></View>
                <View style={styles.acc}>
  <View style={styles.profImgContainer}>
    <Image style={styles.profImage} source={{ uri: Prof_Img }} />
  </View>
  <View style={styles.accDetails}>
    <Text style={styles.accName}>{user_Name}</Text>
    <Text style={styles.userID}>User ID: {userID}</Text>
  </View>
</View>
            </View>
        </View>
    );
}


const uName = 'User Name';          
const email = 'username@mail.com';

const styles = StyleSheet.create({
    topBar: {
        flex:1, 
        flexDirection:'column',

        margin: 10,
    },

    icon: {
      flexDirection: 'row',
      alignContent: 'center',
    },

    icon_text: {
      fontSize: 16,
      color: '#000874',
      alignSelf: 'center',
      marginLeft: 14,
    },
    page_name: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
      },

      logo: {
        marginLeft: 10,
        marginTop: 20,
        alignItems: 'flex-start',
      },
      line: {
        borderBottomColor: '#6170CC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
        marginTop: 10,
    },

    sLine: {
        borderBottomColor: '#6170CC',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    
    footer: {
        position:'absolute',
        bottom:0,
        marginBottom:10,
        width: '100%',
    },

    acc: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 10,
      },
      profImgContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 10,
      },
      profImage: {
        width: '100%',
        height: '100%',
      },
      accDetails: {
        marginTop: 5,
        flexDirection: 'column',
      },
      accName: {
        color: '#000874',
        fontSize: 16,
        fontWeight: '300',
      },
      userID: {
        color: '#000874',
        fontSize: 14,
        opacity: 0.6,
        fontWeight: '300',
      }
      
});