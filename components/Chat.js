import React, { Component } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
//Import storage system
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { View, Text, Button, Platform, KeyboardAvoidingView } from 'react-native';

//import Firestore database
const firebase = require('firebase');
require('firebase/firestore');

//connect the database
const firebaseConfig = {
  apiKey: "AIzaSyB8cwR6WQ19QIQlA0sSALFSJSNTh56ywBg",
    authDomain: "hello-chat-app-cf.firebaseapp.com",
    projectId: "hello-chat-app-cf",
    storageBucket: "hello-chat-app-cf.appspot.com",
    messagingSenderId: "736902282961",
} 
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//create a reference to the “messages” collection
this.referenceChatMessages = firebase.firestore().collection("messages");
// to create a more specific reference
// firebase.firestore().collection('messages/user/Steve');
// OR
// firebase.firestore().collection('messages').doc('user/Steve');


export default class Chat extends Component {
//state initialization within the constructor
  constructor() {
    super();
    this.state = {
      //initiate state to send, receive, and display messages
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
    }}
  }

  //Whenever sth changes retrieves the current data in "messages" collection and store it in state lists, allowing it to be rendered in the view
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    //Go through each document
    querySnapshot.forEach((doc) => {
      //get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  }

  //Get messages
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

 // Adds messages to cloud storage
 addMessage() {
  const message = this.state.messages[0];
  this.referenceChatMessages.add({
    _id: message._id,
    text: message.text,
    createdAt: message.createdAt,
    user: message.user,
    image: message.image || null,
    location: message.location || null,
  });
}  

async saveMessages() {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}

async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}



 //this function gets called right after the Chat component mounts and sets the state with a static msg
  componentDidMount() {
    // Check user connection
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
    // authenticates user with firebase
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
    });
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
    console.log("online");
      }else{
    this.setState({
      isConnected: false,
    });
    this.getMessage();
    Alert.alert("No internet connection, unable to send messages");
    console.log("offline");
      }
    });
  }
  
  // unsubscribes from user authentication and DB updates
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
 }


  //this function will be called when a user sends a message
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.saveMessages();
      this.addMessage();
    }
    );
  }


  //To customize the renderBubble prop
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "pink",
          },
        }}/>
    );
  }

  //Renders message input when online, removes when offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }
  

//code for rendering the chat interface
  render() {
    let name = this.props.route.params.name;// OR ...
    // let { name } = this.props.route.params;
    let color = this.props.route.params.color;
    //puts the name on navigation bar
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{
        flex: 1,
        backgroundColor: color,
      }}>
        {/* <Text>Hello Chat !</Text>
        <Button
      title="Go to Start"
      onPress={() => this.props.navigation.navigate('Start')}/> */}
      <GiftedChat
        isConnected={this.state.isConnected}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}
