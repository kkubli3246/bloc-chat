import React, {Component} from 'react';

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state = {
        messages: this.props.roomMessages,
        currentRoom: 'rooms/'+this.props.currentRoom+'/messages',
        sendMes: '', 
        canSubmit: false
    }    	            
    this.messagesRef = this.props.firebase.database().ref(this.state.currentRoom);
    }
    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.roomMessages !== this.props.roomMessages){
            this.setState({messages: nextProps.roomMessages})            
        }
        if(nextProps.currentRoom !== this.props.currentRoom){
            this.setState({currentRoom: 'rooms/'+nextProps.currentRoom+'/messages'})
        }
    }
    displayMessages = () => {
        if(this.state.messages !== undefined){
            return this.state.messages.map((message, i) => 
                <div id='messagelist' key ={i}>
                <p ><b>{message.username}</b>: {message.content}</p>                
                </div>
            );            
        }
    }
    checkSubmit = () => {
        if(this.props.currentRoom !== undefined){
            this.setState({canSubmit: true})
        }
        return this.state.canSubmit
    }
    handleSubmit = (e) => {
        e.preventDefault();
        
       
        if (this.state.canSubmit) {
            this.messagesRef = this.props.firebase.database().ref(this.state.currentRoom);
            if (this.state.sendMes.replace(/\s/g, '').length > 0) {
                this.messagesRef.push({
                    content: this.state.sendMes,
                    username: this.props.userName,
                    roomId: this.props.currentRoom,
                    sentAt: Date(Date.now())
                })
            }
            this.props.addMessage();
        }
        this.setState({sendMes: ''});   
    }
    handleChange = (e) => {
        this.setState({sendMes: e.target.value});    
        this.checkSubmit();    
    }
    render(){        
        
        return(
            <div className='messageList'>
                <div key ={'1'}>{this.displayMessages()}</div>
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                    <input type ='text' onChange ={this.handleChange} value ={this.state.sendMes}></input>
                    <input type='submit'></input>   
                </form>        
            </div>  
        )
    };
    
}

export default MessageList;