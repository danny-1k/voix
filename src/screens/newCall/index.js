import React, { useRef, useState, useContext} from 'react';
import {View,Text, Image} from 'react-native';
import styles from './styles';

import CustomBtn from '../../components/buttons';

import { AuthContext } from '../../contexts/auth';

import { Info } from '../../components/custom_alert';

import database from '@react-native-firebase/database';



const NewCall = ({navigation, joinCode, setJoinCode})=>{

    const {authData} = useContext(AuthContext);

    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const dbRef = database().ref();


    const createRoom = ()=>{

        const roomRef = dbRef.push();
        roomRef.push({'author':authData.email});

        setJoinCode(roomRef.key); // the join code in this case is the unique timestap generated by firebase
        setIsInfoVisible(true);

    };

    return (

        <View style={styles.container}>
            <Text style={styles.header}>Generate Call ID</Text>

            <CustomBtn onPress={()=>{createRoom()}}
                    btnStyle={styles.generateCodeBtn}
                    text={"Generate"}
                    textStyle={styles.generateCodeText}></CustomBtn>

            <Info isVisible={isInfoVisible} setIsVisible={setIsInfoVisible} message={"Your Call ID is "} onClose={()=>{navigation.navigate('Call')}}>
                <Text selectable={true}>Your Call ID  is {joinCode} </Text>

            </Info>

        </View>

    );

};

export default NewCall;