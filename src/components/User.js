import React, {Component} from 'react';




class User extends Component{

    handleClick = () => {
        this.props.firebase.auth().signInWithPopup( this.props.provider )
    }
   
    
    render(){
        return(
            <div>
                <button id="sign-in" onClick ={this.handleClick()}>Sign-In Here!</button>
            </div>
        )
    };
}

export default User;