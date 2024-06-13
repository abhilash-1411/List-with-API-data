import React ,{useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
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
    {
      data.length? 
      data.map((item)=><View style={styles.dataWrapper}>
       <View><Text>{item.name}</Text></View>
       <View><Text>{item.age}</Text></View>
       <View><Text>{item.email}</Text></View>
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
  flex:1,
  flexDirection:'row',
  justifyContent: 'space-around',
  backgroundColor:'orange',
  margin:5
 }
   
});

export default App;
