import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
  let db = firebase.initializeApp(config);
 
class App extends Component {
   
  constructor(props){
    super(props);
    this.state ={
      activeRoom: 1
    }
  }
  setActiveRoom = (room) =>{
    this.setState({activeRoom:room.key})
  }
  
  
  render() {    
    console.log(this.state.activeRoom)
    return (
      <div className="App">
      <h1>Bloc Chat</h1>
      <div className= 'container-fluid'>
      <div className = 'row'>
        
        <div className ="col-sm-3"><RoomList firebase ={db} setActiveRoom = {(e) => this.setActiveRoom(e)} /></div>
        <div className ="col-sm-9"><MessageList firebase ={db} currentActiveRoom = {this.state.activeRoom} /></div>
        
      </div>
      </div>
      </div>
    );
  }
}

export default App;
