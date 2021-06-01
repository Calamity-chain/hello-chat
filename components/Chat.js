import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


export default class Chat extends Component {
  render() {
    let name = this.props.route.params.name;// OR ...
    // let { name } = this.props.route.params;
    let color = this.props.route.params.color;

    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{
        flex: 1,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello Chat !</Text>
        <Button
      title="Go to Start"
      onPress={() => this.props.navigation.navigate('Start')}/>
        </View>
      </View>
    );
  }
}
