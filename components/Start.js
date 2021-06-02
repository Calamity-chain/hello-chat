
import React, { Component } from 'react';
import { 
  ImageBackground, 
  Text, 
  View, 
  TextInput, 
  Button, 
  Alert, 
  ScrollView, 
  StyleSheet ,
  Platform, 
  KeyboardAvoidingView
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const image = require("../assets/Background-Image.png");


export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      color: "",
    };
  }
  // alert the user input
  // alertMyText (input = []) {
  //   Alert.alert(input.name);
  // }


  render() {
    return (
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to the Chat App!</Text>
          </View>
          <View style={styles.box1}>
            <View style={styles.nameBox}>
              <TextInput
                style={styles.yourName}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Enter Your Name"
              />
            </View>
            <View style={styles.backColorTextBox}>
              <Text style={styles.backColorText}>Choose Background Color:</Text>
            </View>
            <View style={styles.backColorContainer}>
              <TouchableOpacity
                style={styles.color1}
                onPress={() => {
                  this.setState({ color: "#090C08" });
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color2}
                onPress={() => {
                  this.setState({ color: "#474056" });
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color3}
                onPress={() => {
                  this.setState({ color: "#8A95A5" });
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color4}
                onPress={() => {
                  this.setState({ color: "#B9C6AE" });
                }}
              ></TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  color: this.state.color,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={{fontSize:110}}>Hey Screen 1, wake up human for food at 4am so sit in box twitch tail in permanent irritation. Scratch me there, elevator butt hate dog, so friends are not food and wack the mini furry mouse for meow meow we are 3 small kittens sleeping most of our time, we are around 15 weeks old i think, i don’t know i can’t count cat sit like bread but cats woo. Catty ipsum stare at the wall, play with food and get confused by dust, then cats take over the world toilet paper attack claws fluff everywhere meow miao french ciao litterbox, find empty spot in cupboard and sleep all day please stop looking at your phone and pet me and that box? i can fit in that box. Run around the house at 4 in the morning stare at the wall, play with food and get confused by dust for find box a little too small and curl up with fur hanging out for my left donut is missing, as is my right, yet jump on fridge. Chew on cable stare out cat door then go back inside for sniff catnip and act crazy yet go into a room to decide you didn't want to be in there anyway then cats take over the world. Give me attention or face the wrath of my claws. Sit as close as possible to warm fire without sitting on cold floor where is it? i saw that bird i need to bring it home to mommy squirrel! yet immediately regret falling into bathtub. Car rides are evil carefully drink from water glass and then spill it everywhere and proceed to lick the puddle, eat all the power cords for ears back wide eyed for burrow under covers. Jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed. Hit you unexpectedly fish i must find my red catnip fishy fish.</Text>  */}
        {/* <Button 
        onPress={() => {
          this.alertMyText({text: this.state.name});
        }}
        title="Press me"
        /> */}
        <KeyboardAvoidingView behavior="height" />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 0.75,
    flexDirection: "column",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  box1: {
    flexDirection: "column",
    position: "relative",
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "88%",
    height: "44%",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  nameBox: {
    flexDirection: "column",
    position: "relative",
    marginTop: 10,
    marginBottom: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "88%",
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "#757083",
  },
  yourName: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 50,
    width: "100%",
    height: 50,
    marginBottom: "auto",
  },
  backColorTextBox: {
    flexDirection: "row",
    position: "relative",
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "88%",
  },
  backColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  backColorContainer: {
    flexDirection: "row",
    position: "relative",
    marginBottom: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "88%",
  },
  color1: {
    backgroundColor: "#090C08",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  color2: {
    backgroundColor: "#474056",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  color3: {
    backgroundColor: "#8A95A5",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  color4: {
    backgroundColor: "#B9C6AE",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#757083",
    flexDirection: "column",
    position: "relative",
    marginRight: "auto",
    marginLeft: "auto",
    width: "88%",
    height: 50,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});




