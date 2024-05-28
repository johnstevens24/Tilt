import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity, Alert, TextInput, ScrollView, SafeAreaView} from 'react-native';
import { useState, useEffect, useRef, Component } from 'react';
import * as SQLite from 'expo-sqlite';
import style from '../styleSheets/scoreScreen'

export default function ScoreScreen({route, navigation}) {
    const {time, personalBest, mapID} = route.params
    const [db, setDB] = useState(null)
    const [list, setList] = useState(null)
    const [enableExit, setEnableExit] = useState(false)
    
    useEffect(() => {
        setUpDB()
        // clearDB()

        //after 5 seconds, make the back button visible
        setTimeout(() => setEnableExit(true), 5000)
    }, [])

    useEffect(() => {
        //once the db is set up, fetch the list from the db
        fetchList()
    }, [db])

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
        } catch (error) {
            console.log("There was an issue accessing the database: " + error)
        }
    }

    async function fetchList() {
        console.log('attempting to fetch list')
        try{
            const list = await db.getAllAsync(`SELECT scores.time, users.username FROM scores JOIN users ON scores.user_id = users.id WHERE scores.map_id = ${mapID} ORDER BY scores.time`)
            setList(list)
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    function getPlaceText(index, name) {
        //cant move the repetitive <View> statement down below to the map loop because you need something to encapsulate all the <Text>s
        switch(index){
            case 0: return(
                <View style={style.LeaderBoardRow}>
                    <View style={style.LeaderBoardRow}>
                       <Text style={style.LeaderBoardText}>1</Text>
                        <Text style={style.LeaderBoardSubText}>st</Text> 
                    </View>
                    <Text style={style.LeaderBoardText}>{name}</Text>
                </View>)
            case 1: return(
                <View style={style.LeaderBoardRow}>
                    <View style={style.LeaderBoardRow}>
                       <Text style={style.LeaderBoardText}>2</Text>
                        <Text style={style.LeaderBoardSubText}>nd</Text> 
                    </View>
                    <Text style={style.LeaderBoardText}>{name}</Text>
                </View>)
            case 2: return(
                <View style={style.LeaderBoardRow}>
                    <View style={style.LeaderBoardRow}>
                       <Text style={style.LeaderBoardText}>3</Text>
                        <Text style={style.LeaderBoardSubText}>rd</Text> 
                    </View>
                    <Text style={style.LeaderBoardText}>{name}</Text>
                </View>)
            default: return(
                <View style={style.LeaderBoardRow}>
                    <View style={style.LeaderBoardRow}>
                       <Text style={style.LeaderBoardText}>{index+1}</Text>
                        <Text style={style.LeaderBoardSubText}>th</Text> 
                    </View>
                    <Text style={style.LeaderBoardText}>{name}</Text>
                </View>)
        }
    }
    
    

    return(
        <SafeAreaView style ={{flexDirection:'column', alignItems:'center', justifyContent:'flex-start', height:'100%'}}>
            {enableExit ? 
                <TouchableOpacity onPress={() => navigation.navigate("SelectScreen")} style={style.backButton}>
                    <Text style={style.backButtonText}>BACK</Text>
                </TouchableOpacity>
                : 
                <View></View>
            }
            <View style={style.Banner}>
                <Text style={style.Title}>Level {mapID} Leaderboard</Text>
            </View>
            
            <View style={style.LeaderBoard}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    {list == null ? <Text style={style.LeaderBoardText}>loading...</Text>: list.map((item, index) => (
                        <View key={index} style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                            {getPlaceText(index, item.username)}
                            <Text style={style.LeaderBoardText}>{item.time}s</Text>
                        </View>
                        
                    ))}
                </ScrollView>
            </View>

            <Text style={style.TimeFinishedText}>Most recent attempt:  {time} seconds</Text>

            <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                {!personalBest ? 
                <Text style={{fontSize:28, fontWeight:'700'}}>THATS A PERSONAL BEST</Text>
                :
                <View></View>
                }
            </View>
            
            
        </SafeAreaView>
    )
}