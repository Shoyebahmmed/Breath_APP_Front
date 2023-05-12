import { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import axios from 'axios';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { Ionicons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

export default function Weather_Page({route}) {
  const { user_Name, Prof_Img, userID, serverIP } = route.params;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState({ 
    weather_Text: '', 
    temp_deg: '', 
    humidity: '', 
    wind_speed: '', 
    at_Pressure: '', 
    min_temp: '', 
    max_temp: '', 
    feels_like: '', 
    suggestion : '', 
    location: '',
    weather_icon: ''
  });


  const [weather_forecast_details, setForecast] = useState({
    day1_date: '',
    day1_temp: '',
    day1_humidity: '',
    day2_date: '',
    day2_temp: '',
    day2_humidity: '',
    day3_date: '',
    day3_temp: '',
    day3_humidity: '',
  });


  useEffect(() => { 
    LoadData();
  }, []);

  async function LoadData () {
    await axios.post(`${serverIP}/get_weather_details_from_database`, {userID: userID})
    .then((weather_details_response) => {
     console.log(weather_details_response.data);
     setWeatherDetails({
       weather_Text: weather_details_response.data[0].weather_Text,
       temp_deg: weather_details_response.data[0].temp_deg,
       humidity: weather_details_response.data[0].humidity,
       wind_speed: weather_details_response.data[0].wind_speed,
       at_Pressure: weather_details_response.data[0].CO_pollution,
       min_temp: weather_details_response.data[0].min_temp,
       max_temp: weather_details_response.data[0].max_temp,
       feels_like: weather_details_response.data[0].feels_like,
       suggestion: weather_details_response.data[0].suggestion,
       location: weather_details_response.data[0].location,
       weather_icon: weather_details_response.data[0].weather_icon,
     });
    })

    axios.post(`${serverIP}/get_weather_forecast_details_from_database`, {userID: userID})
    .then((weather_forecast_details_response) => {
     console.log(weather_forecast_details_response.data, ' _______________________________');

     setForecast({
       day1_date: weather_forecast_details_response.data[0].day1_date,
       day1_temp: weather_forecast_details_response.data[0].day1_temp,
       day1_humidity: weather_forecast_details_response.data[0].day1_humidity,
       day2_date: weather_forecast_details_response.data[0].day2_date,
       day2_temp: weather_forecast_details_response.data[0].day2_temp,
       day2_humidity: weather_forecast_details_response.data[0].day2_humidity,
       day3_date: weather_forecast_details_response.data[0].day3_date,
       day3_temp: weather_forecast_details_response.data[0].day3_temp,
       day3_humidity: weather_forecast_details_response.data[0].day3_humidity,
     });
    })



  }


  async function callLoadButton () {


      const { status } = await requestForegroundPermissionsAsync();
      console.log(2);
      if (status === 'granted') {
        console.log(3);
        try{
          const location  = await getCurrentPositionAsync();

          if (location) {
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);


            await axios.post(`${serverIP}/get_API_call_count`, {userID: userID})
            .then(async (countCall) => {
             console.log(countCall.data, ' __________________-');
        
        
             const num_of_api_call = parseInt(countCall.data[0]?.call_count ?? 0, 10); 
        
             if (num_of_api_call < 25) {
                await axios.post(`${serverIP}/weather_details_update`, {latitude: location.coords.latitude, longitude: location.coords.longitude, userID: userID})
                .then((weather_details_update_response) => {
                console.log(weather_details_update_response.data);
                })
          
                await axios.post(`${serverIP}/weather_forecast_details_update`, {latitude: location.coords.latitude, longitude: location.coords.longitude, userID: userID})
                .then((weather_forecast_details_update_response) => {
                console.log(weather_forecast_details_update_response.data);
                })
        
                await axios.post(`${serverIP}/add_API_call`, {userID: userID})
                .then((addCallRes) => {
                console.log(addCallRes.data);
                })
          
                LoadData();
             }
             else {
              Alert.alert(
                'Unsuccessful!!!',
                'You have reach your maximum load. \nPlease try next day. \n Thank You.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
             }
        
        
            })
        

            console.log(location);
          } else {
            console.log("Error: location is null or undefined");
            Alert.alert(
              'Error!!!',
              'location is null or undefined',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
        }
        catch(err){
          console.log("Error: ", err);
        }
        console.log(7);
      }




  }


  return (
    <View style={styles.container}>
    <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>

<ScrollView>
<View style={styles.tempBox1}>
  <View style={styles.locationContainer}>
    <Image source={require("./img_and_icon/drawable-hdpi/location.png")}/>
    <Text style={styles.locationText}>
      {weatherDetails.location}
    </Text>
  </View>
  <TouchableOpacity style={styles.loadingContainer} onPress={() => callLoadButton()}>
    <Image source={require("./img_and_icon/drawable-hdpi/load.png")}/>
  </TouchableOpacity>
</View>

      <Text style={styles.title}> 
        Today's Weather
      </Text>
    <View style={styles.tempBox}>
      <View style={styles.weather}>
      <Image source={{ uri: `openweathermap.org/img/wn/${weatherDetails.weather_icon}@2x.png` }}  style={{ height: 130, width: 130, marginTop: -20,}} />
        <Text style={styles.weather_Text}>{weatherDetails.weather_Text}</Text>
      </View>
      <Text style={styles.temp_deg}>
        {weatherDetails.temp_deg}
      </Text>
    </View>

    <Text style={styles.title}> 
        Today's Temperature
      </Text>

    <View style={styles.tempBox2}>
      <View style={styles.three_in_1}>
        <View style={styles.th1_title}>
        <MaterialCommunityIcons name="sun-thermometer-outline" size={35} color="#000874" />
          <Text style={styles.th1_text}>Minimum</Text>
        </View>
        <Text style={styles.th1_text_val}>{weatherDetails.min_temp}</Text>
        </View>

        <View style={styles.three_in_2}>
        <View style={styles.th2_title}>
        <MaterialCommunityIcons name="sun-thermometer-outline" size={35} color="#000874" />
          <Text style={styles.th2_Text}>Maximum</Text>
        </View>
        <Text style={styles.th2_Text_val}>{weatherDetails.max_temp}</Text>
      </View>

      <View style={styles.three_in_3}>
        <View style={styles.th2_title}>
        <MaterialCommunityIcons name="sun-thermometer-outline" size={35} color="#000874" />
          <Text style={styles.th2_Text}>Feels like</Text>
        </View>
        <Text style={styles.th2_Text_val}>{weatherDetails.feels_like}</Text>
      </View>
    </View>


    <View style={styles.tempBox3}>
      <View style={styles.three_in_1}>
        <View style={styles.th1_title}>
        <MaterialCommunityIcons name="water-percent" size={35} color="#000874" />
          <Text style={styles.th1_text}>Humidity</Text>
        </View>
        <Text style={styles.th1_text_val}>{weatherDetails.humidity}</Text>
        </View>

        <View style={styles.three_in_2}>
        <View style={styles.th2_title}>
        <Fontisto name="cloudy-gusts" size={24} color="#000874" />
          <Text style={styles.th2_Text}>Wind Speed</Text>
        </View>
        <Text style={styles.th2_Text_val}>{weatherDetails.wind_speed}</Text>
      </View>

      <View style={styles.three_in_3}>
        <View style={styles.th2_title}>
        <Ionicons name="md-cloudy-sharp" size={30} color="#000874" />
          <Text style={styles.th2_Text}>CO Level</Text>
        </View>
        <Text style={styles.th2_Text_val}>{weatherDetails.at_Pressure}</Text>
      </View>
    </View>

    <Text style={styles.title}> 
    Weather Suggestion
      </Text>


    <View style={styles.tempBox4}>
      <Text style={styles.suggestion}>{weatherDetails.suggestion}</Text>
    </View>




    <View style={styles.forecast}>

    <View style={styles.tempBox5}>

      <Text style={styles.forecast_date}>
        {weather_forecast_details.day1_date}
      </Text>

      <Text style={styles.forecast_temp}>
        {weather_forecast_details.day1_temp}
      </Text>

      <MaterialCommunityIcons name="water-percent" size={35} color="#000874" />

      <Text style={styles.forecast_hum_title}>
        Humidity:
      </Text>

      <Text style={styles.forecast_hum}>
        {weather_forecast_details.day1_humidity}
      </Text>
      {
        parseInt(weather_forecast_details.day1_humidity.replace('%', '')) > 65 ?
        (
          <Ionicons name="md-cloud-offline-sharp" size={30} color="red" style={{marginTop: 10}}/>
        ) : (
          <Ionicons name="cloud-done-sharp" size={35} color="green" style={{marginTop: 10}}/>
        )
      }
      
    </View>

    <View style={styles.tempBox5}>

      <Text style={styles.forecast_date}>
        {weather_forecast_details.day2_date}
      </Text>

      <Text style={styles.forecast_temp}>
        {weather_forecast_details.day2_temp}
      </Text>

      <MaterialCommunityIcons name="water-percent" size={35} color="#000874" />

      <Text style={styles.forecast_hum_title}>
        Humidity:
      </Text>

      <Text style={styles.forecast_hum}>
        {weather_forecast_details.day2_humidity}
      </Text>
      {
        parseInt(weather_forecast_details.day2_humidity.replace('%', '')) > 65 ?
        (
          <Ionicons name="md-cloud-offline-sharp" size={30} color="red" style={{marginTop: 10}}/>
        ) : (
          <Ionicons name="cloud-done-sharp" size={35} color="green" style={{marginTop: 10}}/>
        )
      }
    </View>

    <View style={styles.tempBox5}>

      <Text style={styles.forecast_date}>
        {weather_forecast_details.day3_date}
      </Text>

      <Text style={styles.forecast_temp}>
        {weather_forecast_details.day3_temp}
      </Text>

      <MaterialCommunityIcons name="water-percent" size={35} color="#000874" />

      <Text style={styles.forecast_hum_title}>
        Humidity:
      </Text>

      <Text style={styles.forecast_hum}>
        {weather_forecast_details.day3_humidity}
      </Text>
      {
        parseInt(weather_forecast_details.day3_humidity.replace('%', '')) > 65 ?
        (
          <Ionicons name="md-cloud-offline-sharp" size={30} color="red" style={{marginTop: 10}}/>
        ) : (
          <Ionicons name="cloud-done-sharp" size={35} color="green" style={{marginTop: 10}}/>
        )
      }
    </View>
    </View>

</ScrollView>
    <Nav_Bottom iconName="Social" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000874',
    marginTop: 10,
  },

  tempBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    width: '90%',
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 3 
    }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },



  weather: {
    flexDirection: 'column',
    alignContent: 'center',
    borderEndWidth: 2,
    borderEndColor: '#000874',
    paddingRight: 10,
  },

  weather_Text: {
    alignSelf: 'center',
    color: '#000874',
    fontSize: 17,
    marginTop: -20,
  },

  temp_deg: {
    fontSize: 80,
    color: '#000874',
    alignSelf: 'center',
    marginLeft: 10,
  },

  tempBox2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    width: '90%',
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 3 
    }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2,
    alignSelf: 'center',
    marginTop: 15,
  },

  tempBox3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '90%',
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 3 
    }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2,
    alignSelf: 'center',
    marginTop: 15,
  },

  three_in_1: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    borderEndWidth: 2,
    borderEndColor: '#000874',
  },
  th1_title: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  th1_text: {
    fontSize: 16,
  },
  th1_text_val: {
    fontSize: 16,
  },
  three_in_2: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    borderEndWidth: 2,
    borderEndColor: '#000874',
  },
  th2_title: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  th2_Text: {
    fontSize: 16,
  },
  th2_Text_val: {
    fontSize: 16,
  },

  three_in_3: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },

  tempBox1: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '90%',
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 3 
    }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 10,
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  tempBox4: {
    padding: 15,
    width: '90%',
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 7,
    shadowColor: 'red',
    shadowOffset: { 
      width: 0, 
      height: 3 
    }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },

  suggestion: {
    fontSize: 16,
    color: '#000874',
    textAlign: 'center',
    alignSelf: 'center',
    
  },

  tempBox5: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    width: '30%',
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 3 
    }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  forecast: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '90%', 
    alignContent: 'center', 
    alignSelf: 'center',
    marginBottom: 10,
  },

  forecast_date: {
    fontSize: 16,
    color: '#000874',
  },

  forecast_temp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000874',
  },

  forecast_hum_title: {
    fontSize: 16,
    color: '#000874',
    fontWeight: 'bold',
  },

  forecast_hum: {
    fontSize: 18,
    color: '#000874',
  },
});




  // useEffect(() => {
  //   if (userLocation) {
  //       console.log('error line 7 ---------------------------');
  //     const response = axios.post(
  //       'http://192.168.8.104:8888/weather_details',
  //       userLocation,
  //     );
  //     console.log(response);
  //   }
  // }, [userLocation]);



