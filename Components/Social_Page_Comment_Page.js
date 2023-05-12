import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Social_Page_Comment_View from './Social_Page_Comment_View';
import axios from 'axios';

export default function Social_Page_Comment_Page({post_ID, userID, onClose, serverIP }) {

    const [comm_cont, setCommCont] = useState('');
    const [allSocialPostComment, setAllSocialPostComment] = useState([]);
    const [noCommentState, setNoCommentState] = useState(false);

    const clikedPostID = post_ID;

    const [userComment, setUserComment] = useState({
        userID: '',
        comm_cont: '',
        post_ID: '',
      });


    useEffect(() => {
        async function fetchSocialPostsComment() {
            try {
                console.log(clikedPostID, ' ______________________-----------------------------------')
              const response = await axios.post(`${serverIP}/Social_post_Comment`, {postID: clikedPostID});
              if (response.data.length > 0) {
                console.log(response.data);
                setAllSocialPostComment(response.data);
                setNoCommentState(false);
                console.log(allSocialPostComment, ' **********');
              } else {
                setNoCommentState(true);
                console.log('Response data is empty');
              }
            } catch (error) {
              console.error(error, ' from post Comment');
              console.log(error.response.data);
            }
          }
          
        fetchSocialPostsComment();
      }, []);


    function noComment () {
        return(
        <View style={styles.notComment}>
        <Image source={require('./img_and_icon/noComments.png')} style={styles.image} />
        <Text style={styles.text1}>No Comment yet...</Text>
        <Text style={styles.text2}>Be the first one to leave a comment on this post!</Text>
        </View>
        );
    }


    function haveComment () {
        console.log(allSocialPostComment, '---------');
        return(
        <ScrollView style={{marginTop: 10}}>
                {allSocialPostComment.map((comment, index) => (
      <Social_Page_Comment_View
        key={index}
        Prof_Img={comment.Prof_Img}
        Com_User_Name={comment.User_Name}
        Comm_Content={comment.comment_Content}
        Comm_Time={comment.comm_Time}
        serverIP = {serverIP}
      />
    ))}  
        </ScrollView> 
        );
    }



    function handleSubmitComment() {
        if (comm_cont == undefined || comm_cont == "" || comm_cont.length == 0) {
            console.log("empty Comment");
        }
        else{
            const tempUserID = userID;
            const tempPostID = post_ID;
            const tempComment = comm_cont;
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@----------------------- ', tempUserID, tempPostID, tempComment);
            setUserComment({userID: tempUserID, comm_cont: comm_cont, post_ID: tempPostID});
            axios.post(`${serverIP}/userComment`, { userID: tempUserID, postID: tempPostID, comment: tempComment, serverIP: serverIP })
            .then(async res => {
                console.log(res);
                try {
                    const response = await axios.post(`${serverIP}/Social_post_Comment`, {postID: tempPostID});
                    if (response.data.length > 0) {
                      setAllSocialPostComment(response.data);
                      setNoCommentState(false);
                      console.log(allSocialPostComment);
                    } else {
                      setNoCommentState(true);
                      console.log('Response data is empty');
                    }
                  } catch (error) {
                    console.error(error, ' from post Comment');
                    console.log(error.response.data);
                  }
            })
            .catch((err) => {
                console.error(err);
              });
        }
    }

    return(
        <View style={styles.container}>
        <View style={styles.comm_top}>
        <Text style={styles.comm_title}>Comments</Text>
        <TouchableOpacity onPress={onClose} style={styles.com_top}>
        <Image
            source={require("./img_and_icon/drawable-hdpi/close.png")}
          />
      </TouchableOpacity>
      </View>
        {noCommentState ? noComment() : haveComment()}
        <View style={styles.addComment}>
        <TextInput
          style={styles.inputContainer}
          placeholder='Write a public comment...'
          onChangeText={text => setCommCont( text )}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSubmitComment}>
        <Image
            source={require("./img_and_icon/drawable-ldpi/send.png")}
          />
          </TouchableOpacity>
        </View>

        </View>
    )}

    const styles = StyleSheet.create({ 
        container: {
            flex: 1,
        },
        addComment: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            width: '100%',
            backgroundColor: '#E8F3FF',
            flexDirection: 'row',
            borderTopWidth: 2,
            borderColor: '#017FFF',
        },
        inputContainer: {
            height: 40,
            backgroundColor: '#FFFFFF',
            padding: 4,
            paddingLeft: 12,
            width: '87%',
            borderRadius: 50,
            marginTop: 18,
            marginLeft: 10,
          },
          sendButton: {
            marginTop: 28,
            marginLeft: 10,
          },
          image: {
            height: 100,
            width: 100,
            tintColor: '#E1E1E1',
          },
          comm_top: {
            borderBottomWidth: 2, 
            borderBottomColor: '#515151',
            width: '100%',  
            height: 40, 
            marginTop: 10, 
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 10,
            marginBottom: 10,
            paddingBottom: 10,
          },
          comm_title: {
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            paddingLeft: 10
          },
          com_top: {
            alignSelf: 'center',
            marginRight: 10,
          },
          notComment: {
            top: '30%',
            height: '60%',
            width: '100%',
            alignItems: 'center',
          },
          text1: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 15,
            color: '#595C80',
          },
          text2: {
            fontSize: 16,
            textAlign: 'center',
            marginTop: 5,
            color: '#595C80',
          },
    })