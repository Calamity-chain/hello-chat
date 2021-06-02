import React, { Component } from 'react';

//Import the gifted chat library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { View, Text, Button, Platform, KeyboardAvoidingView } from 'react-native';


export default class Chat extends Component {
//state initialization within the constructor
  constructor() {
    super();
    this.state = {
      //A chat app needs to send, receive, and display messages
      messages: [],
    }
  }

 //this function gets called right after the Chat component mounts and sets the state with a static msg
  componentDidMount() {
    this.setState({
      //each message requires an ID, a creation date, and a user object
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          //The user object requires a user ID, name, and avatar. optional: img and video
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        //System message: to display last time a user was active/if someone new joins the chat
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  }

  //this function will be called when a user sends a message
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  //To customize the renderBubble prop
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#000",
          },
          right: {
            backgroundColor: "pink",
          },
        }}/>
    );
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
