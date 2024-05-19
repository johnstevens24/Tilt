import { StyleSheet, Text, View, TextInput, Button, Animated, Dimensions, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import * as SQLite from 'expo-sqlite';
import Styles from '../styleSheets/loginScreen'


export default function Login({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [missingPassword, setMissingPassword] = useState(false)
    const [missingUsername, setMissingUsername] = useState(false)
    const [db, setDB] = useState(null)

    useEffect(() => {
        setUpDB()
    }, [])

    async function setUpDB() {
        try{
            setDB(await SQLite.openDatabaseAsync('tilt.db'))
            if(db)
                {
                    await db.execAsync(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, username TEXT, password TEXT)`)
                }
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    async function login(){
        if(username=="")
            setMissingUsername(true)
        else
            setMissingUsername(false)
        if(password=="")
            setMissingPassword(true)
        else
            setMissingPassword(false)


        if(username=="" || password=="")
        {
            if(username=="" && password=="")
                Alert.alert("Please fill in empty login fields")
            else
                Alert.alert("Please fill in empty login field")     
            
            return
        }

        
        try {
            const user = await db.getAllAsync('SELECT * FROM users WHERE users.username = $1 AND users.password = $2', [username, password]);
            
            if(user.length === 0)
            {
                Alert.alert("Login credentials incorrect.")
            }
            else
            {
                globalThis.id = user[0].id
                navigation.navigate("SelectScreen")
            }
        } catch(error) {
            console.log("Error logging in: " + error)
        }

        // navigation.navigate("SelectScreen")
    }

    const createAccount = () => {
        setPassword("")
        setUsername("")
        setMissingUsername(false)
        setMissingPassword(false)
        navigation.navigate("CreateUserScreen")
    }

    return(
        <SafeAreaView style={{flexDirection:'column', width:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center'}}>
            <View style={{flex:3}}></View>
            <View style={Styles.LoginBox}>
                <Text style={Styles.Title}>TILT</Text>
                <TextInput value={username} onChangeText={setUsername} placeholder='username' placeholderTextColor="#c9c9c9" style={missingUsername ? Styles.MissingTextInput : Styles.TextInput}></TextInput>
                <TextInput value={password} onChangeText={setPassword} placeholder='password' placeholderTextColor="#c9c9c9" secureTextEntry={true} style={missingPassword ? Styles.MissingTextInput : Styles.TextInput}></TextInput>
                <TouchableOpacity style={Styles.LoginButton} onPress={() => {login()}}>
                    <Text style={Styles.LoginButtonText}>Log In</Text>
                </TouchableOpacity>
                <View style={{width:'100%', marginVertical:'10%', borderTopWidth:1}}/>
                <Text style={{fontSize:18}}>or</Text>
                <TouchableOpacity style={Styles.CreateAccount} onPress={() => {createAccount()}}>
                    <Text style={{color:'gray'}}>Create an Account</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{flex:4}}></View>
        </SafeAreaView>
    )
}