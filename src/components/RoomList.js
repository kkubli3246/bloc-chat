import React, { Component } from 'react';


class RoomList extends Component{
    
constructor(props){
    super(props);
    this.state ={
        rooms: [],   
        newRoomName:''     
    };
    
     this.roomsRef = this.props.firebase.database().ref('rooms');
}

componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;       
       this.setState({ rooms: this.state.rooms.concat( room ) })
    });
}

handleSubmit = (e) =>{
    e.preventDefault();
    this.createRoom();
    this.setState({newRoomName: ''})
}
createRoom = () =>{
    if(this.state.newRoomName.replace(/\s/g, '').length > 0 )
    {this.roomsRef.push({
        name: this.state.newRoomName
    });}
}
handleChange =(e) =>{
    this.setState({newRoomName: e.target.value})
}
    render(){
      return(
          <div className="room-list">
            <div id="room-lists">             
             {this.state.rooms.map((room,i) =>
                <h2 key={i}>
                    {room.name}
                </h2>
             )}
             <form onSubmit ={(e) => this.handleSubmit(e)}>
                 <input 
                    type="text" 
                    value={this.state.newRoomName}
                    onChange ={this.handleChange}
                 ></input>
                 <input type="submit"></input>
             </form>
             </div>
          </div>
      );
    }
}

export default RoomList;