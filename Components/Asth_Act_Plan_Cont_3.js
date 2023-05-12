import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet, StatusBar, Image, Text, ImageBackground } from 'react-native';
import axios from 'axios';



export default function Asth_Act_Plan_Cont_3({serverIP}) {

  const [AAP_Symptoms_Get_worse_Cont, setAAP_Symptoms_Get_worse_Cont] = useState([]);

  useEffect(() => {
    const fetchAAP_Symptoms_Get_worse_Cont = async () => {
      try {
        const response = await axios.get(`${serverIP}/AAP_Symptoms_Get_Worse`);
        setAAP_Symptoms_Get_worse_Cont(response.data.AAP_Symptoms_Get_Worse_Cont);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAAP_Symptoms_Get_worse_Cont();
  }, []);


  return (
    <ImageBackground
      source={require('./img_and_icon/Screen.png')}
      style={styles.background}
    >

      <Image
        source={require('./img_and_icon/drawable-mdpi/b_health.png')}
        style={styles.cont_logo}
      />

      <Image
        source={require('./img_and_icon/drawable-mdpi/Symptoms_Get_Worse.png')}
        style={styles.cont_logo_text}
      />


      <View style={styles.list_cont}>
        {AAP_Symptoms_Get_worse_Cont.map((line, index) => (

          <View
            key={index}
            style={styles.listItem}
          >
            <View style={styles.bullet_col}>
              <Text style={styles.bullet_out}>{'\u2022'}</Text>
            </View>
            <View style={styles.text_col}>
              <Text style={styles.output}>{line}</Text>
            </View>
          </View>

        ))}
      </View>

      <Image
        source={require('./img_and_icon/drawable-mdpi/Get_Worse.png')}
        style={styles.bottom_warn_text}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  cont_logo: {
    marginTop: '20%',
  },

  cont_logo_text: {
    marginTop: '10%',
  },

  list_cont: {
    marginTop: '8%',
    width: '90%',
  },

  bullet_col: {
    marginRight: 10,
  },
  bullet_out: {
    fontSize: 25,
    color: '#000874',
  },
  text_col: {
    flex: 1,
  },
  output: {
    fontSize: 16,
    color: '#000874',
  },
  bottom_warn_text: {
    marginTop: '10%'
  },
  listItem: {
    lineHeight: 24,
    paddingLeft: 24,
    marginBottom: 8,
    flexDirection: 'row',

  },
});