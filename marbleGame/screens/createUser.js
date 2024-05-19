import { StyleSheet, Text, View, TextInput, Button, Animated, Dimensions, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import * as SQLite from 'expo-sqlite';
import Styles from '../styleSheets/createUserScreen'


export default function CreateUser({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [missingUsername, setMissingUsername] = useState(false)
    const [missingPassword, setMissingPassword] = useState(false)
    const [missingEmail, setMissingEmail] = useState(false)
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

    async function createUser(){
        let emptyCount = 0

        if(username == "")
        {
            setMissingUsername(true) 
            emptyCount++ 
        } 
        else
            setMissingUsername(false)
        if(password == "")
        {
            setMissingPassword(true) 
            emptyCount++ 
        } 
        else
            setMissingPassword(false)
        if(email == "")
        {
            setMissingEmail(true) 
            emptyCount++ 
        } 
        else
            setMissingEmail(false)

        if(emptyCount > 0)
        {
            if(emptyCount == 1)
                Alert.alert("Please fill in the missing field")
            else
                Alert.alert("Please fill in the missing fields")

            return
        }

        console.log("trying to create a new user")
        try {
            //see if that user already exists
            const user = await db.getAllAsync('SELECT * FROM users WHERE users.username = $1', [username]);

            if(user.length === 0)
            {
                //create a new user
                await db.runAsync('INSERT INTO users (email, username, password) VALUES ($1, $3, $4)', [email, username, password])

                //get their id
                const id = await db.getAllAsync('SELECT id FROM users WHERE users.username = $1', [username]);
                globalThis.id = id[0].id
                navigation.navigate("SelectScreen")
            }
            else
                Alert.alert("The username \"" + username + "\" is already in use")
            
        
        } catch(error) {
            console.log("Error logging in: " + error)
        }
    }

    return(
        <SafeAreaView style={{flexDirection:'column', width:'100%', height:'100%', justifyContent:'flex-start', alignItems:'center'}}>
            <View style={{flex:3}}></View>
            <View style={Styles.CreateUserBox}>
                <Text style={Styles.Title}>TILT</Text> 
                <TextInput value={username} onChangeText={setUsername} placeholder='Username' placeholderTextColor="#c9c9c9" style={missingUsername ? Styles.MissingTextInput : Styles.TextInput}></TextInput>
                <TextInput value={password} onChangeText={setPassword} placeholder='Password' placeholderTextColor="#c9c9c9" secureTextEntry={true} style={missingPassword ? Styles.MissingTextInput : Styles.TextInput}></TextInput>
                <TextInput value={email} onChangeText={setEmail} placeholder='Email' placeholderTextColor="#c9c9c9" style={missingEmail ? Styles.MissingTextInput : Styles.TextInput}></TextInput>
                <TouchableOpacity style={Styles.CreateUserButton} onPress={() => {createUser()}}>
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