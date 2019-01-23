import React, { Component } from 'react';


class RoomList extends Component{
    
constructor(props){
    super(props);
    this.state ={
        rooms: []        
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
    render(){
      return(
          <div className="room-list">
             
             {this.state.rooms.map((room,i) =>
                <h2 key={i}>
                    {room.name}
                </h2>
             )}
          </div>
      );
    }
}

export default RoomList;