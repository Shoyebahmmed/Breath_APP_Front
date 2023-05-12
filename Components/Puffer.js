import React, {useState, useEffect} from "react";
import { Image, FlatList, View, StatusBar, Dimensions, StyleSheet, Text, Animated, TouchableOpacity, Alert } from 'react-native';
import { LinearProgress } from '@rneui/base';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';


const {width, height} = Dimensions.get('screen');

const itemWidth = width;
const itemHeight = height * .5;



export default function Puffer({serverIP, userID}) {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const [puffDetails, setPuffDetails] = useState([]);

    async function getInhalerDetails() {
        try{
            const InhalerDetails = await axios.post(`${serverIP}/user_puff_details`, { userID });
            if(InhalerDetails.data.length > 0) {
                setPuffDetails(InhalerDetails.data);
                console.log(InhalerDetails.data);
            }
            else {
                setPuffDetails([
                    {
                    Inhaler_ID: 1,
                    Inhaler_Name: '',
                    Num_of_Puffs_Taken: 0,
                    Num_of_Puffs: 0,
                    }
                ])
            }

        }
        catch(err) {
            console.log(err,'\nError from getInhalerDetails call-----------------')
        }   
    }

    useEffect(() => {
        getInhalerDetails();
    }, []);


    let tempCount = 0;
    
    const remove = async (item) => {
        const Inhaler_ID = item.Inhaler_ID;
        try{
            const InhalerDetails = await axios.post(`${serverIP}/remove_Puff`, { userID, Inhaler_ID });
            if(InhalerDetails.data.length > 0) {
                setPuffDetails(InhalerDetails.data);
                console.log(InhalerDetails.data);
            }
            else {
                Alert.alert(
                    'Error!!!',
                    'Please Try Again.',
                    [
                    {text: 'Done'},
                    ],
                    {cancelable: false},
                )
            }

        }
        catch(err) {
            console.log(err,'\nError from remove call-----------------')
        }   
    };
      
    const add = async (item) => {
        const Inhaler_ID = item.Inhaler_ID;
        try{
            const InhalerDetails = await axios.post(`${serverIP}/add_Puff`, { userID, Inhaler_ID });
            if(InhalerDetails.data.length > 0) {
                setPuffDetails(InhalerDetails.data);
                console.log(InhalerDetails.data);
            }
            else {
                Alert.alert(
                    'Daily Puffer Limit',
                    'Please can not add more then your daily puffer limit. \nPlease check you daily puffer limit',
                    [
                    {text: 'Done'},
                    ],
                    {cancelable: false},
                )
            }

        }
        catch(err) {
            console.log(err,'\nError from add call-----------------')
        }   
    };
    

    return(
        <View style={styles.container}>
                <View style={styles.flatList}>
                    <Animated.FlatList
                    data = {puffDetails}
                    keyExtractor={(item) => item.Inhaler_ID}
                    snapToInterval={itemWidth}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    horizontal
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        { useNativeDriver: true}
                    )}
                    renderItem={({item}) => { return(
                        <View style={styles.list}>

                        <View style={styles.body}>

                        <View style={styles.topBar}>
                            <Image
                                source={require("./img_and_icon/in_icon.png")}
                                style={styles.logo}
                            />
                        <Text style={styles.nameTitle}>{item.Inhaler_Name}</Text>
                        </View>

							<View style={styles.progressBar}>
								<LinearProgress
									value={item.Num_of_Puffs_Taken / item.Num_of_Puffs}
									variant="determinate"
									style={{
										width: "80%",
										height: 20,
										borderRadius: 10,
									}}
									color="#000874"
									trackColor="white"
									animation={5000}
								/>
							</View>


                    <View style={styles.pagination}>
                        {puffDetails.map((_, index) => {
                            return <View 
                                key={index}
                                style={styles.dot}
                            />
                        })}

                        <Animated.View 
                            style={[styles.dotIndicator, {
                                transform: [{
                                    translateX: Animated.divide(scrollX, itemWidth).interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 16]
                                    })
                                }]
                            }]}
                        />
                    </View>
                    </View>
                            <View style={styles.midBar}>
                            <Text style={styles.puffers}>Add<Text style={{ color: '#94C9FF' }}> Puffers</Text></Text>
                            </View>

							<View style={styles.addRemove}>
                            <TouchableOpacity onPress={() => remove(item)} disabled={tempCount === 0 || item.puffUsed === 0} style={styles.rm}>
                            <Entypo name="minus" size={35} color={tempCount === 0 || item.puffUsed === 0 ? '#92C7FE' : '#000874'} />
                            </TouchableOpacity>


								<View style={{alignSelf: 'center'}}>
									<Text style={styles.puffNum}>{item.Num_of_Puffs_Taken}</Text>
								</View>
								<TouchableOpacity onPress={() => add(item)} style={styles.rm}>
                                <Entypo name="plus" size={30} color="#000874" />
								</TouchableOpacity>
							</View>
                        </View>
					)}} />
					
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        overflow: 'hidden',
    },

    progressBar: {
        justifyContent: 'space-evenly', 
        flexDirection: 'row'
    },

    topBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },

    logo: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30,
    },

    nameTitle: {
        fontSize: 30,
        color: '#FFFFFF',
        alignSelf: 'center',
    },



    pagination:{
        alignSelf: 'center',
        flexDirection: 'row',
        paddingTop: 30,
    },

    dot:{
        width:8,
        height:8,
        borderRadius:8,
        backgroundColor:'#333',
        marginRight: 8,
    },

    dotIndicator:{
        width:16,
        height:16,
        borderRadius:16,
        borderWidth:1,
        borderColor:'#333',
        position:'absolute',
        top:26,
        left:-4,
    },

    flatList:
    {
        flex: 1,
        height: '100%',
        width: '100%',
    },

    list: {
        width: itemWidth, 
        flex: 1, 
        height: '100%',
        alignItems: 'center',
    },

    body:{
        width: itemWidth, 
        flex: 0.85, 
        backgroundColor: '#79A9E6',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        alignItems: 'center',
        paddingBottom: 30,
    },

    midBar: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    puffers: 
    {
        fontSize: 35,
        fontWeight: 'bold',
        padding: 30,
    },

    addRemove: 
    {
        flex: 0.2,
        borderRadius: 25,
        borderColor: 'grey',
        borderWidth: StyleSheet.hairlineWidth,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    rm: {
        alignSelf: 'center',
    },

    puffNum: {
        fontSize:50, 
        fontWeight:'bold',  
        color: '#000874'}

});