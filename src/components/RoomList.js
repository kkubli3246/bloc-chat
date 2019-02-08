import React, {Component} from 'react';


class RoomList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: '',
            isHover: '',
            
        };

        this.roomsRef = this.props.firebase.database().ref('rooms')
        
       
    }

    componentDidMount() {
        this.roomsRef = this.props.firebase.database().ref('rooms')
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({
                rooms: this.state.rooms.concat(room)
            })            
        });

        
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.createRoom();
        this.setState({
            newRoomName: ''
        })
    }
    createRoom = () => {
        if (this.state.newRoomName.replace(/\s/g, '').length > 0) {
            this.roomsRef.push({
                name: this.state.newRoomName
            });
        }
    }
    handleChange = (e) => {
        this.setState({
            newRoomName: e.target.value
        })
    }
    handleClick = (room) =>{       
        this.props.setActiveRoom(room);       
            
    }

    handleMouseEnter = (index) =>{
        this.setState({isHover: index});      
        
    }
    handleMouseLeave = (index) =>{
        this.setState({isHover: ''});
    }
    render(){    
          
      return(
          <div className="room-list">
            <div id="room-lists">             
             {this.state.rooms.map((room,i) =>             
                <h2 key={i}
                    onMouseEnter={() => this.handleMouseEnter(i)}
                    onMouseLeave={() => this.handleMouseLeave(i)}
                    onClick={() => this.handleClick(room,i)}>                    
                    <div className={this.state.isHover === i ? "active hvr-pulse hvr-sweep-to-right":""}>{room.name}</div>
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