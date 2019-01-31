import React, {Component} from 'react';

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            
        }
        this.messageRef = this.props.firebase.database().ref('rooms/'+this.props.currentActiveRoom+'/messages');
    }

    componentDidMount(){
        this.messageRef.on('child_added', snap => {
            const messages = snap.val();
            messages.key = snap.key;
            this.setState({
                messages: this.state.messages.concat(messages)                
            })           
        });      
    }
    handleChange = () =>{
        this.setState({currentRoom: this.props.currentActiveRoom + 1})
        
    }    
    render(){
        return(
            <div className='messageList'>
                
                 {this.state.messages.map((message,i) =>
                    <h3 key={i}>{message.content}</h3>
                    )}
                 
                          
            </div>
        )
    };
    
}

export default MessageList;