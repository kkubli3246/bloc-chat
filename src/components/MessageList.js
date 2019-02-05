import React, {Component} from 'react';

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: this.props.roomMessages
        }    
    }
    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.roomMessages !== this.props.roomMessages){
            this.setState({messages: nextProps.roomMessages})
        }
    }
    displayMessages = () => {
        if(this.state.messages !== undefined){
            return this.state.messages.map((message, i) => 
                <h3>{message.content}</h3>
            );
        }
    }
    render(){   
        console.log(this.props.roomMessages)
        console.log(this.state.messages, "state messsgeas")
        return(
            <div className='messageList'>
                {this.displayMessages()}              
            </div>  
        )
    };
    
}

export default MessageList;