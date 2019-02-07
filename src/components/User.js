import React, {Component} from 'react';

class User extends Component{
    constructor(props){
        super(props)
        this.state ={
            isSignedIn: false,
            displayName: "Guest"
        }
    }
    componentDidMount = () =>{
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
            if(user !== null){
                this.setState({isSignedIn: true});
                this.setState({displayName: user.displayName});
            };
          });
    }
    handleSignIn = () => {
        this.props.firebase.auth().signInWithPopup( this.props.provider );
        
    }
    handleSignOut = () => {
        this.props.firebase.auth().signOut();
        this.setState({isSignedIn: false});
        this.setState({displayName: "Guest"});
    }
    ClickSignOut = ()=> {
        if(this.state.isSignedIn){
            return <button onClick= {() => this.handleSignOut()}>Sign Out</button>
        }else{
            return
        }
    }
    
    render(){
        return(
            <div>
                <h3>Hello, {this.state.displayName}</h3><br/>
                <button onClick = {() => this.handleSignIn()}>Sign In Here!</button>
                <div>{this.ClickSignOut()}</div>
            </div>
        )
    }
}

export default User;