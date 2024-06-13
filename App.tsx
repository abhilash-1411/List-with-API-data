import React ,{useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';



const App=()=> {
  const [data,setData]=useState([])
const getAPIData= async()=>{
const url="http://10.0.2.2:3000/users"
let result=await fetch(url);
result=await result.json();
if(result){
  setData(result);
}
}

  useEffect(()=>{
       getAPIData();
  },[]);

  return (
   <View style={styles.container}>
    <View style={[styles.dataWrapper ,{backgroundColor:'skyblue' }]}>
            <View style={{flex:1.5}}><Text>Name</Text></View>
       <View style={{flex:2}}><Text>Age</Text></View>
       <View style={{flex:2}}><Text>Operations</Text></View> 
       </View>
 
    {
      data.length? 
      data.map((item)=><View style={styles.dataWrapper}>
       <View style={{flex:1}}><Text>{item.name}</Text></View>
       <View style={{flex:1}}><Text>{item.age}</Text></View>
       <View style={{flex:1}}><Button title='Delete'/></View>
       <View style={{flex:1}}><Button title='Update'/></View>
      </View>):null
    }
   </View>
    
  );
}

const styles = StyleSheet.create({
 container:{
   flex:1
 },
 dataWrapper:{
  padding:5,
  flexDirection:'row',
  justifyContent: 'space-around',
  backgroundColor:'orange',
  margin:5
 }
   
});

export default App;
