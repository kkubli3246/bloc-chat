import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import RoomList from './components/RoomList';

// Initialize Firebase
  const config = {
    apiKey: "AIzaSyD4bpzDfvsj6KiP7E7bhzDh_Fq54zRTTTs",
    authDomain: "blocchat-rooms.firebaseapp.com",
    databaseURL: "https://blocchat-rooms.firebaseio.com",
    projectId: "blocchat-rooms",
    storageBucket: "blocchat-rooms.appspot.com",
    messagingSenderId: "389662709234"
  };
  

class App extends Component {
   
  
  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <RoomList firebase ={firebase.initializeApp(config)}/>
      </div>
    );
  }
}

export default App;
