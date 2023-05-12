import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import axios from 'axios';
import Social_Page_Comment_Page from './Social_Page_Comment_Page';


export default function Social_Content_Bottom_View({likes, postID, userID, likedList, onPressOpen, serverIP}) {
    const [liked, setLiked] = useState(false);
    const [tempLikes, setTempLikes] = useState(likes);
    const [isCommentPageVisible, setIsCommentPageVisible] = useState(false);
    const [data, setData] = useState({ postID: '', liked: '' , user_ID: ''});


    console.log('------------------------------------------------');
    console.log('2: ', postID);
    console.log('33333 ', likedList);


    useEffect(() => {
        if (likedList.find(item => item.post_id === postID)) {
          console.log(true, '------------');
          setLiked(true);
        } else {
          setLiked(false);
        }
      }, [likedList, postID]);
      

    async function handleLike () {
        try{
            console.log(1);
            data.postID = postID;
            data.liked = !liked;
            data.user_ID = userID;
            const response = await axios.post(`${serverIP}/postLike`, data);
            console.log(2);
            setLiked(!liked);
            console.log(3);
            setTempLikes(response.data.likes);
            console.log(4);
        }
        catch(error){
            console.log(error, ' from here');
        }

      };

    function handleComment () {
        setIsCommentPageVisible(true);
      };
      function handleCommentPageClose () {
        setIsCommentPageVisible(false);
      };

    function handleShare () {
      };

    return(
<View style={styles.container}>
  <View style={styles.content}>



    <TouchableOpacity onPress={handleLike} style={styles.likebutton}>
    <View style={styles.likeCont}>
      <Image
        source={liked ? require('./img_and_icon/drawable-mdpi/like_after.png') : require('./img_and_icon/drawable-mdpi/like_beofre.png')}
        style={styles.image}
      />
          <Text style={liked ? styles.likesAfter : styles.likesBefore}>{tempLikes} likes</Text>
      </View>
    </TouchableOpacity>




    <Modal visible={isCommentPageVisible} animationType="slide">
        <Social_Page_Comment_Page post_ID={postID} userID ={userID} onClose={handleCommentPageClose} />
      </Modal>


    <TouchableOpacity onPress={handleComment} style={styles.commentbutton}>
    <View style={styles.commentCont}>
      <Image
        source={require('./img_and_icon/drawable-ldpi/comment_before.png')}
        style={styles.image}
      />
       <Text style={styles.commentBefore}>Comment</Text>
    </View>
    </TouchableOpacity>



    <TouchableOpacity onPress={handleShare} style={styles.sharebutton}>
    <View style={styles.shareCont}>
      <Image
        source={require('./img_and_icon/drawable-ldpi/share.png')}
        style={styles.image}
      />
       <Text style={styles.share}>Share</Text>
          </View>
    </TouchableOpacity>
  </View>
</View>
    )}

    const styles = StyleSheet.create({ 
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
          },
          likebutton: {
            alignSelf: 'flex-start',
          },
          commentbutton: {
            alignSelf: 'center',
          },
          sharebutton: {
            alignSelf: 'flex-end',
          },
          likeCont:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          likesBefore: {
            color: 'black',
            marginLeft: 6,
            alignSelf: 'center',
          }, 
          likesAfter: {
            color: '#94C9FF',
            marginLeft: 6,
            alignSelf: 'center',
          },
          shareCont:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          share: {
            color: 'black',
            marginLeft: 8,
            alignSelf: 'center',
          }, 
          commentCont:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          commentBefore: {
            color: 'black',
            marginLeft: 6,
            alignSelf: 'center',
          }, 
          commentAfter: {
            color: '#94C9FF',
            marginLeft: 6,
            alignSelf: 'center',
          },
    })