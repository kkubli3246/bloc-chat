import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4bpzDfvsj6KiP7E7bhzDh_Fq54zRTTTs",
    authDomain: "blocchat-rooms.firebaseapp.com",
    databaseURL: "https://blocchat-rooms.firebaseio.com",
    projectId: "blocchat-rooms",
    storageBucket: "blocchat-rooms.appspot.com",
    messagingSenderId: "389662709234"
  };
  firebase.initializeApp(config);




class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      rooms: []
    };
  }
  render() {
    return (
      <div className="App">
       <RoomList rooms ="firebase"/>
      </div>
    );
  }
}

export default App;
