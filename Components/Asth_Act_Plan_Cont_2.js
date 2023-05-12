import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet, StatusBar, Image, Text, ImageBackground } from 'react-native';
import axios from 'axios';



export default function Asth_Act_Plan_Cont_2({serverIP}) {

  const [AAP_when_Not_Well_Cont, setAAP_when_Not_Well_Cont] = useState([]);

  useEffect(() => {
    const fetchAAP_when_Not_Well_Cont = async () => {
      try {
        const response = await axios.get(`${serverIP}/AAP_when_not_well`);
        setAAP_when_Not_Well_Cont(response.data.AAP_when_not_Well_Cont);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAAP_when_Not_Well_Cont();
  }, []);


  return (
    <ImageBackground
      source={require('./img_and_icon/Screen.png')}
      style={styles.background}
    >

      <Image
        source={require('./img_and_icon/drawable-mdpi/unhealth.png')}
        style={styles.cont_logo}
      />

      <Image
        source={require('./img_and_icon/drawable-mdpi/When_Not_Well.png')}
        style={styles.cont_logo_text}
      />


      <View style={styles.list_cont}>
        {AAP_when_Not_Well_Cont.map((line, index) => (

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
        source={require('./img_and_icon/drawable-mdpi/wnw_Warn.png')}
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
    marginTop: '5%'
  },
  listItem: {
    lineHeight: 24,
    paddingLeft: 24,
    marginBottom: 8,
    flexDirection: 'row',

  },
});