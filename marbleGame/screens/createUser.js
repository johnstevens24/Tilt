import { StyleSheet, Text, View, TextInput, Button, Animated, Dimensions, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import Styles from '../styleSheets/createUserScreen'


export default function CreateUser({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")


    const login = () => {
        //login stuff

        navigation.navigate("SelectScreen")
    }

    return(
        <SafeAreaView style={{flexDirection:'column', width:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center'}}>
            <View style={{flex:3}}></View>
            <View style={Styles.CreateUserBox}>
                <Text style={Styles.Title}>TILT</Text>
                <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={Styles.TextInput}></TextInput>
                <TextInput value={name} onChangeText={setName} placeholder='Full Name' style={Styles.TextInput}></TextInput>
                <TextInput value={username} onChangeText={setUsername} placeholder='Username' style={Styles.TextInput}></TextInput>
                <TextInput value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry={true} style={Styles.TextInput}></TextInput>
                <TouchableOpacity style={Styles.CreateUserButton} onPress={() => {login()}}>
                    <Text style={Styles.CreateUserButtonText}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.Cancel} onPress={() => {navigation.navigate("LoginScreen")}}>
                    <Text style={{color:'gray'}}>Cancel</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{flex:4}}></View>
        </SafeAreaView>
    )
}