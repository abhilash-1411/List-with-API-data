import React ,{useEffect, useState} from 'react';
import {
  StyleSheet,TextInput,
  Text,
  View,
  Button,
  Modal
} from 'react-native';



const App=()=> {
  const [data,setData]=useState([])
  const [showModal,setShowModal] = useState(false);
  const [selectedUser,setSelectedUser] = useState(undefined)
const getAPIData= async()=>{
const url="http://10.0.2.2:3000/users"
let result=await fetch(url);
result=await result.json();
if(result){
  setData(result);
}
}

const deleteUser= async(id)=>{
  const url="http://10.0.2.2:3000/users"
let result=await fetch(`${url}/${id}`,{
  method: "DELETE" 
});
result=await result.json();
if(result){
  console.warn("User deleted");
  getAPIData();
}

}
const updateUser=(data)=>{
  setShowModal(true);
  setSelectedUser(data);
}

  useEffect(()=>{ getAPIData() },[]);

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
       <View style={{flex:1}}><Button title='Delete' onPress={()=>deleteUser(item.id)}/></View>
       <View style={{flex:1}}><Button title='Update' onPress={()=>updateUser(item)}/></View>
      </View>):null
    }
    <Modal visible={showModal} transparent={true}>
   <UpdateModal setShowModal={setShowModal} selectedUser={selectedUser}/>
    </Modal>
   </View>
    
  );
}
const UpdateModal=(props)=>{
  const [name,setName]=useState(undefined)
  const [age,setAge]=useState(undefined)
  const [email,setEmail]=useState(undefined)

  useEffect(()=>{
    if(props.selectedUser){
      setName(props.selectedUser.name);
      setAge(props.selectedUser.age.toString());
      setEmail(props.selectedUser.email);
    }
  },[props.selectedUser])
  return (
    <View style={styles.centeredview}>
    <View style={styles.modalview}>
      <TextInput style={styles.input} value={name}/>
      <TextInput style={styles.input} value={age}/>
      <TextInput style={styles.input} value={email}/>
      <View style={{marginBottom:15}}>
      <Button title='Update'/>
      </View>
      <Button title='Close' onPress={()=>props.setShowModal(false)} />
      </View>
  </View>
  )
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
 },
 centeredview:{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 modalview:{
   backgroundColor:'#fff',
   padding:20,
   borderRadius:10,
   shadowColor:'#000',
   shadowOpacity:.70,
   elevation:5
 },
 input:{
  borderWidth:1,
  borderColor:'skyblue',
  width:300,
  marginBottom:10,
  fontSize:20
 }
   
});

export default App;
