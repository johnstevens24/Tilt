import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert, TextInput, ScrollView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import * as SQLite from 'expo-sqlite';
import style from '../styleSheets/scoreScreen'

export default function ScoreScreen({route, navigation}) {
    const {time, personalBest} = route.params
    const [name, setName] = useState("")
    const [db, setDB] = useState(null)
    const [list, setList] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    
    useEffect(() => {
        setUpDB()
        // clearDB()
    }, [])

    //for development purposes only
    async function clearDB() {
        try{
            await db.runAsync(`DELETE FROM scores`)
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    async function setUpDB() {
        try{
            setDB(await SQLite.openDatabaseAsync('tilt.db'))
            if(db)
            {
                await fetchList()
            }      
        } catch (error) {
            console.log("There was an issue accessing the database: " + error)
        }
    }

    async function fetchList() {
        try{
            const list = await db.getAllAsync(`SELECT scores.time, users.username FROM scores JOIN users ON scores.user_id = users.id ORDER BY scores.time`)
            console.log(list)
            setList(list)
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    
    

    return(
        <View style ={{flexDirection:'column', alignItems:'center', justifyContent:'flex-start', height:'100%'}}>
            <TouchableOpacity onPress={() => navigation.navigate("SelectScreen")} style={style.backButton}>
                <Text style={style.backButtonText}>BACK</Text>
            </TouchableOpacity>
            
            <Text style={{fontSize:30}}>Level 1 Leaderboard</Text>
            <View style={{flexDirection:'column', width:'96%', height:'50%', backgroundColor:'#c9c9c9', borderColor:'gray', borderWidth:'5px', borderRadius:15, margin:'2%', padding:'3%'}}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    {list == null ? <Text>loading...</Text>: list.map((item, index) => (
                        <View key={index} style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Text style={{fontSize:20}}>{item.username}</Text>
                            <Text style={{fontSize:20}}>{item.time}s</Text>
                        </View>
                        
                    ))}
                </ScrollView>
            </View>

            <Text style={{fontSize:20}}>You finished the level in {time} seconds {personalBest ? <Text>THATS A PERSONAL BEST!!</Text>: <Text>... eh</Text>}</Text>
            
            
        </View>
    )
}