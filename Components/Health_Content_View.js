import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ScrollView, Linking  } from 'react-native';
import Nav_Bottom from './Nav_Bottom';
import { Ionicons } from '@expo/vector-icons';

export default function Health_Content_View({ route, navigation }) {
  const { selectedItem, user_Name, Prof_Img, userID, serverIP } = route.params;

  return (
    <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#94C9FF" />
      </TouchableOpacity>
      <View style={styles.topView}>
        <Image source={{ uri: selectedItem.image }} style={styles.image} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.title}>{selectedItem.title}</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.content}>{selectedItem.content}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(selectedItem.link)} style={styles.readLink}>
          <Text style={styles.readLinkText}>Read More</Text>
        </TouchableOpacity>

        </ScrollView>
      </View>
      </View>
      <Nav_Bottom iconName="education" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP} style={styles.navBottom}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollViewContent: {
    padding: 16
  },
  topView: {
    width: '100%',
    height: 397,
    backgroundColor: '#000',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 30,
    zIndex: 1,
  },
  bottomView: {
    width: '100%',

    height: 550,
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 397,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
    marginTop: 30,
  },
  content: {
    fontSize: 16,
    marginHorizontal: 20,
  },

  navBottom: {
    position: 'absolute',
    bottom: 0,
  },

  readLink: {
    padding: 7,
    backgroundColor: '#94C9FF',
    borderRadius: 30,
    width: 150,
    justyfyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  readLinkText: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingLeft: 7,
    paddingRight: 7,
  },
});
