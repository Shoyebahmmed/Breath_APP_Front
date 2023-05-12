import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Social_Content_Top from './Social_Content_Top';
import Social_Content_View from './Social_Content_View';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import Social_Page_Comment_Page from './Social_Page_Comment_Page';

export default function Social_Page({route}) {
  const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const [allSocialPost, setAllSocialPost] = useState([]);
    const [myAllSocialPost, setMyAllSocialPost] = useState([]);
    const [inAllPost, setInAllPost] = useState(true);
    const [socialContent, setSocialContent] = useState('');
    const [height, setHeight] = useState(40);
    
    function handleContentSizeChange (event) {
      setHeight(event.nativeEvent.contentSize.height);
    };

    function handelSubmit(){
      if( socialContent == undefined || socialContent == "" || socialContent.length == 0){
        console.log("empty Content");
      }
      else {
        const user_ID = userID;
        const postContent = socialContent;

        axios.post(`${serverIP}/addNewPost`, { user_ID: user_ID, postContent: postContent })
            .then(async res => {
              console.log(res);
              fetchMySocialPosts();
              setSocialContent("");
            })
            .catch((err) => {
                console.error(err);
                setSocialContent("");
              });
      }
      console.log(socialContent);
    }

    useEffect(() => {
      if (inAllPost) {
        fetchSocialPosts();
      } else {
        fetchMySocialPosts();
      }
      }, [inAllPost]);
      

      const fetchSocialPosts = async () => {
        try {
          const response = await axios.get(`${serverIP}/Social_posts`);
          if (response.data.length > 0) {
            setAllSocialPost(response.data);
            console.log(allSocialPost);
          } else {
            console.log('Response data is empty');
          }
        } catch (error) {
          console.error(error);
        }
      };

      const fetchMySocialPosts = async () => {
        try {
          const response = await axios.post(`${serverIP}/myPostList`, {userID: userID});
          if (response.data.length > 0) {
            setMyAllSocialPost(response.data);
            console.log(myAllSocialPost);
          } else {
            console.log('Response data is empty');
          }
        } catch (error) {
          console.error(error);
        }
      };

      function viewAllPost() {
        return (
        <View style={styles.scrollview}>
          <ScrollView  >

              {allSocialPost.map((postList) => (
                <Social_Content_View
                  key={postList.post_id}
                  userID={userID}
                  post_id={postList.post_id}
                  post_user_ID={postList.user_ID}
                  Timestamp={postList.time}
                  post={postList.post}
                  liked={postList.liked}
                  post_userName={postList.User_Name}
                  post_prof_Img={postList.Prof_Img}
                  serverIP={serverIP}
                />
              ))}

          </ScrollView>
          </View>
          )
      }


      function viewMyPost () {
        return(
          <View style={{flex: 1}}>
          <View style={styles.myPostContainer}>
        <Text style={styles.addTitle}>Add Your Post</Text>
        <TextInput
          style={styles.textInput}
          value={socialContent}
          multiline={true}
          numberOfLines={4}
          onChangeText={(newText) => setSocialContent(newText)}
          onContentSizeChange={handleContentSizeChange}
          placeholder="Type something..."
        />
      <TouchableOpacity onPress={handelSubmit} style={styles.subButton}>
        <Text style={{color: '#FFFFFF',}}>Submit</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.scrollview}>
          <ScrollView  >

              {myAllSocialPost.map((postList) => (
                <Social_Content_View
                  key={postList.post_id}
                  userID={userID}
                  post_id={postList.post_id}
                  post_user_ID={userID}
                  Timestamp={postList.time}
                  post={postList.post}
                  liked={postList.liked}
                  post_userName={user_Name}
                  post_prof_Img={Prof_Img}
                  serverIP={serverIP}
                />
              ))}

          </ScrollView>
          </View>

      </View>
        )
       }

    return(
        <View style={styles.container}>
            <Social_Content_Top user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP} setInAllPost={setInAllPost}/>
            {inAllPost ? viewAllPost() : viewMyPost()}
            <Nav_Bottom iconName="Social" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>

        </View>
    )}

    const styles = StyleSheet.create({ 
        container: {
            flex: 1,
            backgroundColor: '#F1F1F1',
          },
          scrollview: {
            flex: 1,
          },
          myPostContainer: {
            flexDirection: 'column',
            padding: 20,
            backgroundColor: '#FFFFFF',
            marginTop: 5,
          },
          addTitle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          textInput: {
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 30,
            marginTop: 10,
            padding: 10,
            width: '100%',
            textAlignVertical: 'top',
            alignSelf: 'center',
          },
          subButton: {
            width: '100%',
            padding: 10,
            marginTop: 10,
            borderRadius: 30,
            backgroundColor: '#017FFF',
            alignItems: 'center',
            alignSelf: 'center',
          },
    })