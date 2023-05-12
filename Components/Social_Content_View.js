import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Social_Content_Bottom_View from './Social_Content_Bottom_View';
import axios from 'axios';
import Social_Page_Comment_Page from './Social_Page_Comment_Page';


export default function Social_Cont_View({userID, post_id, post_user_ID, Timestamp, post, liked, post_userName, post_prof_Img, serverIP}) {
    const [userLikedList, setUserLikedList] = useState([]);
    useEffect(() => {
        const fetchLikedList = async (userID) => {
          try {
            const response = await axios.post(`${serverIP}/postLikedList`, { userID });
            setUserLikedList(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchLikedList(userID);
      }, [userID]);


    console.log(Timestamp);
    console.log('1: ', post_id);
    return(
        <View style={styles.container}>
            <View style={styles.userInfo}>
            <View style={styles.profImgContainer}>
                <Image source={{ uri: post_prof_Img }} style={styles.profImage} />
                </View>
                <Text style={styles.userID}>{post_userName}</Text>
                <Text style={styles.postTime}>{Timestamp}</Text>
            </View>
            
            <Text style={styles.postText}>{post}</Text>
            <View style={styles.interactions}>
                <Social_Content_Bottom_View 
                likes={liked} 
                postID ={post_id} 
                userID = {userID} 
                likedList = {userLikedList}
                serverIP = {serverIP}   
                  
                />
            </View>
        </View>
    )}

    const styles = StyleSheet.create({ 
        container: {
            backgroundColor: '#ffffff',
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
            marginHorizontal: 20,
          },
          userInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 10,
            width: '100%',
          },

          profImgContainer: {
            alignSelf: 'flex-start',
            marginRight: 10,
            width: 38,
            height: 38,
            borderRadius: 50,
            overflow: 'hidden',
          },
          profImage: {
            width: '100%',
            height: '100%',
          },
          userID: {
            fontWeight: 'bold',
            flex: 1,
          },
          postTime: {
            color: '#666666',
          },
          postText: {
            fontSize: 16,
            marginBottom: 10,
          },
          interactions: {
            borderTopColor: '#cccccc',
            borderTopWidth: 1,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          likedText: {
            color: '#666666',
          },
    })