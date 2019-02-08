import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import 'bootstrap';
import 'hover.css';

// Initialize Firebase
  const config = {
    apiKey: "AIzaSyD4bpzDfvsj6KiP7E7bhzDh_Fq54zRTTTs",
    authDomain: "blocchat-rooms.firebaseapp.com",
    databaseURL: "https://blocchat-rooms.firebaseio.com",
    projectId: "blocchat-rooms",
    storageBucket: "blocchat-rooms.appspot.com",
    messagingSenderId: "389662709234"
  };
  const db = firebase.initializeApp(config);
  const provider = new firebase.auth.GoogleAuthProvider();
 
class App extends Component {
   
  constructor(props){
    super(props);
    this.state ={
      activeRoom: "",
      mesages: [],
      currentUser: "Guest",
      
    }
  };
  setActiveRoom = (room) =>{
    this.setState({activeRoom: room});
    this.setState({messages: this.getRoomMessages(room)})

  }
  messageAdded = () =>{
    this.setState({messages: this.getRoomMessages(this.state.activeRoom)})    
    this.forceUpdate();
  }
  
 
  getRoomMessages = (room) =>{
    let roomMessages = [];
    let currentRoom = Object.values(room.messages);
    for(let i = 0; i < currentRoom.length; i++){
      roomMessages.push(currentRoom[i]);
    }
    
    return roomMessages;
   
  } 
  setUser = (user) => {
    if(user !== null){
      this.setState({currentUser: user.displayName});
    }else if(user === null){
      this.setState({currentUser: "Guest"})
    }
  }
  
  render() {    
   
    
    return (
    
      <div className="App">
      <h1>Bloc Chat</h1><User firebase = {db} provider = {provider} setUser ={(e) => this.setUser(e)}/>
      <div className= 'container-fluid'>
      <div className = 'row'>
        
        <div className ="col-sm-3"><RoomList firebase ={db} setActiveRoom = {(e) => this.setActiveRoom(e)} /></div>
        <div className ="col-sm-9"><MessageList firebase = {db} roomMessages = {this.state.messages} userName ={this.state.currentUser} currentRoom = {this.state.activeRoom.key} addMessage = {() => this.messageAdded()}/></div>

        
      </div>
      </div>

      </div>
    );
  }
}

export default App;
