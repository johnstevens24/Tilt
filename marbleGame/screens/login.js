import { StyleSheet, Text, View, TextInput, Button, Animated, Dimensions, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import Styles from '../styleSheets/loginScreen'


export default function Login({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const login = () => {
        //login stuff

        navigation.navigate("SelectScreen")
    }

    return(
        <SafeAreaView style={{flexDirection:'column', width:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center'}}>
            <View style={{flex:3}}></View>
            <View style={Styles.LoginBox}>
                <Text style={Styles.Title}>TILT</Text>
                <TextInput value={username} onChangeText={setUsername} placeholder='username' style={Styles.TextInput}></TextInput>
                <TextInput value={password} onChangeText={setPassword} placeholder='password' secureTextEntry={true} style={Styles.TextInput}></TextInput>
                <TouchableOpacity style={Styles.LoginButton} onPress={() => {login()}}>
                    <Text style={Styles.LoginButtonText}>Log In</Text>
                </TouchableOpacity>
                <View style={{width:'100%', marginVertical:'10%', borderTopWidth:1}}/>
                <Text style={{fontSize:18}}>or</Text>
                <TouchableOpacity style={Styles.CreateAccount} onPress={() => {navigation.navigate("CreateUserScreen")}}>
                    <Text style={{color:'gray'}}>Create an Account</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{flex:4}}></View>
        </SafeAreaView>
    )
}